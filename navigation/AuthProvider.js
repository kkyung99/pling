import React, { createContext, useState } from "react";
import * as firebase from "firebase";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        user,
        setUser,
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
            androidClientId: ``,
            scopes: ["email"],
          })
            .then((result) => {
              if (result.type === "success") {
                const { idToken, accessToken } = result;
                const credential = firebase.auth.GoogleAuthProvider.credential(
                  idToken,
                  accessToken
                );

                return firebase.auth().signInWithCredential(credential);
              }
              return Promise.reject();
            })
            .catch((error) => {
              // ...
            });

          setLoading(false);
        },
        facebookLogin: async () => {
          setLoading(true);
          try {
            await Facebook.initializeAsync("");
            const { type, token } =
              await Facebook.logInWithReadPermissionsAsync({
                permissions: ["public_profile", "email"],
              });

            if (type === "success") {
              const credential =
                firebase.auth.FacebookAuthProvider.credential(token);
              firebase
                .auth()
                .signInWithCredential(credential)
                .catch((error) => {
                  console.log(error);
                });
            } else {
              alert(type);
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
