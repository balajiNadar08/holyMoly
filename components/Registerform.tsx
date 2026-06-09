import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const themes = {
  dark: {
    background: '#05071A',
    card: 'rgba(255,255,255,0.05)',
    textPrimary: '#EAE6FF',
    textSecondary: '#9EA3C5',
    accent: '#C8B6FF',
    borderSecondary: 'rgba(255,255,255,0.1)',
  },
  light: {
    background: '#FFF8F2',
    card: '#F4EDE4',
    textPrimary: '#1E1B16',
    textSecondary: '#4C4638',
    accent: '#F2D17F',
    borderSecondary: '#CFC5B3',
  },
} as const;

type Theme = typeof themes.dark;

interface RegisterProps {
  isDark?: boolean;
  onRegister?: (email: string, password: string) => void;
}

export default function Register({ isDark = false, onRegister }: RegisterProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleRegister = () => {
    if (password !== confirm) {
      console.warn('Passwords do not match');
      return;
    }
    onRegister?.(email, password);
    console.log('Register:', email, password);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: (isDark ? themes.dark : themes.light).background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.card, { backgroundColor: (isDark ? themes.dark : themes.light).card }]}>
        <Text style={[styles.title, { color: (isDark ? themes.dark : themes.light).textPrimary }]}>Create Account</Text>

        <Text style={[styles.label, { color: (isDark ? themes.dark : themes.light).textSecondary }]}>Email</Text>
        <TextInput
          style={[styles.input, { borderColor: (isDark ? themes.dark : themes.light).borderSecondary, color: (isDark ? themes.dark : themes.light).textPrimary }]}
          placeholder="you@example.com"
          placeholderTextColor={(isDark ? themes.dark : themes.light).textSecondary}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={[styles.label, { color: (isDark ? themes.dark : themes.light).textSecondary }]}>Password</Text>
        <TextInput
          style={[styles.input, { borderColor: (isDark ? themes.dark : themes.light).borderSecondary, color: (isDark ? themes.dark : themes.light).textPrimary }]}
          placeholder="••••••••"
          placeholderTextColor={(isDark ? themes.dark : themes.light).textSecondary}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={[styles.label, { color: (isDark ? themes.dark : themes.light).textSecondary }]}>Confirm Password</Text>
        <TextInput
          style={[styles.input, { borderColor: (isDark ? themes.dark : themes.light).borderSecondary, color: (isDark ? themes.dark : themes.light).textPrimary }]}
          placeholder="••••••••"
          placeholderTextColor={(isDark ? themes.dark : themes.light).textSecondary}
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: (isDark ? themes.dark : themes.light).accent }]}
          onPress={handleRegister}
        >
          <Text style={[styles.buttonText, { color: (isDark ? themes.dark : themes.light).background }]}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  }
});