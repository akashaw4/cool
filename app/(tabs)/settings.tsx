import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun, User, Bell, Shield, LogOut, CircleHelp as HelpCircle, Info, Languages, Mail } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const { theme, toggleTheme, isDark } = useTheme();
  const router = useRouter();

  const settingsOptions = [
    {
      title: 'Account',
      icon: User,
      items: [
        { title: 'Profile Information', onPress: () => {} },
        { title: 'Change Password', onPress: () => {} },
        { title: 'Email Settings', onPress: () => {} },
      ],
    },
    {
      title: 'Preferences',
      icon: Bell,
      items: [
        { title: 'Notifications', onPress: () => {} },
        { title: 'Language', onPress: () => {} },
        { title: 'Accessibility', onPress: () => {} },
      ],
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      items: [
        { title: 'Privacy Settings', onPress: () => {} },
        { title: 'Two-Factor Authentication', onPress: () => {} },
        { title: 'Login History', onPress: () => {} },
      ],
    },
    {
      title: 'Help & Support',
      icon: HelpCircle,
      items: [
        { title: 'FAQ', onPress: () => {} },
        { title: 'Contact Support', onPress: () => {} },
        { title: 'Report a Problem', onPress: () => {} },
      ],
    },
  ];

  const handleLogout = () => {
    router.replace('/');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F2F2F7' }]}>
      <View style={[styles.section, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}>
        <View style={styles.themeToggle}>
          <View style={styles.themeTextContainer}>
            {isDark ? <Moon size={24} color="#FFFFFF" /> : <Sun size={24} color="#000000" />}
            <Text style={[styles.themeText, { color: isDark ? '#FFFFFF' : '#000000' }]}>
              Dark Mode
            </Text>
          </View>
          <Switch value={isDark} onValueChange={toggleTheme} />
        </View>
      </View>

      {settingsOptions.map((section, sectionIndex) => (
        <View
          key={sectionIndex}
          style={[
            styles.section,
            { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF', marginTop: 20 },
          ]}>
          <View style={styles.sectionHeader}>
            <section.icon size={20} color={isDark ? '#FFFFFF' : '#000000'} />
            <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
              {section.title}
            </Text>
          </View>
          {section.items.map((item, itemIndex) => (
            <TouchableOpacity
              key={itemIndex}
              style={[
                styles.settingItem,
                itemIndex < section.items.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: isDark ? '#38383A' : '#E5E5EA',
                },
              ]}
              onPress={item.onPress}>
              <Text style={[styles.settingText, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}
        onPress={handleLogout}>
        <LogOut size={24} color="#FF453A" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <Text style={[styles.version, { color: isDark ? '#8E8E93' : '#8E8E93' }]}>
        Version 1.0.0
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#38383A',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginLeft: 12,
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  themeTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeText: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  settingItem: {
    padding: 16,
  },
  settingText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  logoutButton: {
    marginTop: 20,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#FF453A',
  },
  version: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
});