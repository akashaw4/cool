import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Users, GraduationCap, Building2, Calendar, FileText, Settings, LogOut, Flag, MessageSquare, Users as Users2, Activity, Vote, BookOpen, MessageCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function AdminDashboard() {
  const { isDark } = useTheme();
  const router = useRouter();

  const menuItems = [
    { 
      icon: Users, 
      title: 'Teaching Staff', 
      count: '25 Staff',
      onPress: () => router.push('/admin/teaching-staff')
    },
    { 
      icon: Users2, 
      title: 'Non-Teaching Staff', 
      count: '20 Staff',
      onPress: () => router.push('/admin/non-teaching-staff')
    },
    { 
      icon: GraduationCap, 
      title: 'Student Management', 
      count: '1200 Students',
      onPress: () => router.push('/admin/student-management')
    },
    { 
      icon: Building2, 
      title: 'Facility Management', 
      count: '12 Facilities',
      onPress: () => router.push('/admin/facility-management')
    },
    { 
      icon: Calendar, 
      title: 'Events', 
      count: '5 Upcoming',
      onPress: () => router.push('/admin/events')
    },
    { 
      icon: Vote, 
      title: 'Elections', 
      count: '1 Active',
      onPress: () => router.push('/admin/election-management')
    },
    { 
      icon: Flag, 
      title: 'Clubs', 
      count: '8 Active',
      onPress: () => router.push('/admin/clubs')
    },
    { 
      icon: Activity, 
      title: 'Other Activities', 
      count: '4 Ongoing',
      onPress: () => router.push('/admin/activities')
    },
    { 
      icon: BookOpen, 
      title: 'Course Management', 
      count: '15 Courses',
      onPress: () => router.push('/admin/course-management')
    },
    { 
      icon: Building2, 
      title: 'Facility Bookings', 
      count: '3 Pending',
      onPress: () => router.push('/admin/facility-bookings')
    },
    { 
      icon: MessageCircle, 
      title: 'Complaints', 
      count: '5 New',
      onPress: () => router.push('/admin/complaints')
    },
  ];

  const handleLogout = () => {
    router.replace('/');
  };

  const handleSettings = () => {
    router.push('/settings');
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F2F2F7' }]}
      contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: isDark ? '#FFFFFF' : '#000000' }]}>
            Welcome back,
          </Text>
          <Text style={[styles.name, { color: isDark ? '#FFFFFF' : '#000000' }]}>Admin</Text>
        </View>
        <TouchableOpacity onPress={handleSettings}>
          <Settings size={24} color={isDark ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}
            onPress={item.onPress}>
            <item.icon size={24} color={isDark ? '#0A84FF' : '#007AFF'} />
            <Text style={[styles.cardTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
              {item.title}
            </Text>
            <Text style={[styles.cardCount, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
              {item.count}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut size={20} color="#FF453A" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    marginTop: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginTop: 12,
  },
  cardCount: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    padding: 12,
  },
  logoutText: {
    marginLeft: 8,
    color: '#FF453A',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});