import { Stack } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

export default function DashboardLayout() {
  const { isDark } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF',
        },
        headerTintColor: isDark ? '#FFFFFF' : '#000000',
        headerTitleStyle: {
          fontFamily: 'Inter_600SemiBold',
        },
      }}>
      <Stack.Screen
        name="admin"
        options={{
          title: 'Admin Dashboard',
        }}
      />
      <Stack.Screen
        name="student"
        options={{
          title: 'Student Dashboard',
        }}
      />
      <Stack.Screen
        name="teaching"
        options={{
          title: 'Teaching Staff Dashboard',
        }}
      />
      <Stack.Screen
        name="non-teaching"
        options={{
          title: 'Non-Teaching Staff Dashboard',
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: 'Settings',
        }}
      />
    </Stack>
  );
}