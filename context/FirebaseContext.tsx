import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCs1SK_rf0PoQxW6xMNb8zzVOLZk56L7sA",
  authDomain: "college-automation-1cba6.firebaseapp.com",
  projectId: "college-automation-1cba6",
  storageBucket: "college-automation-1cba6.firebasestorage.app",
  messagingSenderId: "1084018884071",
  appId: "1:1084018884071:web:9ef95569f32d3b366b5142",
  measurementId: "G-QGHK8VMRX0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface FirebaseContextType {
  user: User | null;
  loading: boolean;
  createUser: (email: string, role: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const createUser = async (email: string, role: string) => {
    try {
      // Generate a temporary password
      const tempPassword = Math.random().toString(36).slice(-8);
      
      // Create user with temporary password
      const userCredential = await createUserWithEmailAndPassword(auth, email, tempPassword);
      
      // Send email verification
      await sendEmailVerification(userCredential.user, {
        url: window.location.origin,
        handleCodeInApp: true,
      });

      // Here you would typically store additional user data in your database
      // including the role and any other relevant information
      
      console.log(`Temporary password for ${email}: ${tempPassword}`);
      // In production, you would send this password securely to the user's email
      
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <FirebaseContext.Provider value={{ user, loading, createUser, signIn, signOut }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}