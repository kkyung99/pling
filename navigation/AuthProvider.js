import React, { createContext, useState } from "react";
import * as firebase from "firebase";
import * as Google from "expo-google-app-auth";

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
          let user = null,
            loginSuccess = true;
          try {
            const result = await Google.logInAsync({
              androidClientId: `31112638099-fdnr48eh0pcnftt5ljiog642tt2di9ee.apps.googleusercontent.com`,
              scopes: ["email"],
            });
            if (result.type === "success") {
              /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
              user = result.user;
              await firebase
                .auth()
                .createUserWithEmailAndPassword(user.email, user.id);
            }
            // ca:3b:d2:f7:04:70:25:c0:5a:39:24:1a:14:fb:ec:6a:d3:a2:43:52
          } catch (e) {
            loginSuccess = false;
            console.log(e, e.code);
          }

          if (!loginSuccess && user != null) {
            try {
              await firebase
                .auth()
                .signInWithEmailAndPassword(user.email, user.id);
            } catch (e) {
              console.log(e, e.code);
            }
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
