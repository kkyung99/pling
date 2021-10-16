import React, { createContext, useState } from 'react';
import * as firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import 'firebase/firestore';
import { androidId, iosId, facebookId } from '@env';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState([]);

  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        user,
        setUser,
        check,
        setCheck,
        login: async (email, password) => {
          try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        googleLogin: async () => {
          setLoading(true);
          await Google.logInAsync({
            iosClientId: iosId,
            androidClientId: androidId,
            scopes: ['email'],
          }).then((result) => {
            if (result.type === 'success') {
              const { idToken, accessToken } = result;
              const credential = firebase.auth.GoogleAuthProvider.credential(
                idToken,
                accessToken
              );

              return firebase.auth().signInWithCredential(credential);
            }
            return null;
          });

          setLoading(false);
        },
        facebookLogin: async () => {
          setLoading(true);

          try {
            await Facebook.initializeAsync(facebookId);
            const { type, token } =
              await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile', 'email'],
              });
            console.log(type, token);
            if (type === 'success') {
              const credential =
                firebase.auth.FacebookAuthProvider.credential(token);
              console.log(credential);
              firebase
                .auth()
                .signInWithCredential(credential)
                .catch((error) => {
                  console.log(error);
                });
            } else {
              // alert(type);
            }
          } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
          }
          setLoading(false);
        },
        register: async (email, password) => {
          try {
            await firebase
              .auth()
              .createUserWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await firebase.auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
