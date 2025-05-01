import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { Lock, Mail } from 'lucide-react-native';

export default function LoginScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // For demo purposes, using hardcoded credentials
    if (email === 'admin@college.edu' && password === 'admin123') {
      router.replace('/(dashboards)/admin');
    } else if (email === 'student@college.edu' && password === 'student123') {
      router.replace('/(dashboards)/student');
    } else if (email === 'teacher@college.edu' && password === 'teacher123') {
      router.replace('/(dashboards)/teaching');
    } else if (email === 'staff@college.edu' && password === 'staff123') {
      router.replace('/(dashboards)/non-teaching');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F2F2F7' }]}>
      <View style={[styles.card, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800' }}
          style={styles.logo}
        />
        <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          College Management System
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
          Sign in to your account
        </Text>

        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : null}

        <View style={styles.inputContainer}>
          <Mail size={20} color={isDark ? '#8E8E93' : '#6B7280'} />
          <TextInput
            style={[
              styles.input,
              { color: isDark ? '#FFFFFF' : '#000000', borderColor: isDark ? '#38383A' : '#E5E5EA' },
            ]}
            placeholder="Email"
            placeholderTextColor={isDark ? '#8E8E93' : '#6B7280'}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Lock size={20} color={isDark ? '#8E8E93' : '#6B7280'} />
          <TextInput
            style={[
              styles.input,
              { color: isDark ? '#FFFFFF' : '#000000', borderColor: isDark ? '#38383A' : '#E5E5EA' },
            ]}
            placeholder="Password"
            placeholderTextColor={isDark ? '#8E8E93' : '#6B7280'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: isDark ? '#0A84FF' : '#007AFF' }]}
          onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={[styles.hint, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
          Demo Credentials:{'\n'}
          admin@college.edu / admin123{'\n'}
          student@college.edu / student123{'\n'}
          teacher@college.edu / teacher123{'\n'}
          staff@college.edu / staff123
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginLeft: 12,
    fontFamily: 'Inter_400Regular',
  },
  button: {
    width: '100%',
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  error: {
    color: '#FF453A',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 16,
    textAlign: 'center',
  },
  hint: {
    marginTop: 24,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
});