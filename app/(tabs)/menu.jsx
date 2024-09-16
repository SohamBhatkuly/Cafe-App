import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzjPaZvok641LqNm6BGGkeKXX4L3erhRE",
  authDomain: "kafe-d5023.firebaseapp.com",
  projectId: "kafe-d5023",
  storageBucket: "kafe-d5023.appspot.com",
  messagingSenderId: "895272566374",
  appId: "1:895272566374:web:d4576abdd902732ce377a7",
  measurementId: "G-JJ14JEM3MM"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence using AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Sign up new user
  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setMessage(`Signed up successfully! User ID: ${user.uid}`);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  // Sign in existing user
  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setMessage(`Signed in successfully! User ID: ${user.uid}`);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 5 }}
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Text>Password:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 5 }}
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Sign In" onPress={handleSignIn} />

      {message ? <Text>{message}</Text> : null}
    </View>
  );
}
