import React, { createContext, useState } from 'react';
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
