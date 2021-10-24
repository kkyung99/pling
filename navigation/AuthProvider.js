import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';
import * as firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
import 'firebase/firestore';
import { androidId, iosId } from '@env';

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
            Alert.alert('오류', e.message);
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
        register: async (email, password) => {
          try {
            await firebase
              .auth()
              .createUserWithEmailAndPassword(email, password);
          } catch (e) {
            Alert.alert('오류', e.message);
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
