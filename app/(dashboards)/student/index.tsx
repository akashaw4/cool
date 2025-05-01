import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { BookOpen, Calendar, Clock, FileText, GraduationCap, LogOut, Trophy, Settings, MessageSquare, Building2, Flag, Activity, CalendarCheck, File as FileEdit } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function StudentDashboard() {
  const { isDark } = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/');
  };

  const handleSettings = () => {
    router.push('/settings');
  };

  const quickActions = [
    {
      icon: BookOpen,
      title: 'Course Materials',
      count: '24 Files',
      onPress: () => router.push('/student/materials'),
    },
    {
      icon: CalendarCheck,
      title: 'Attendance',
      count: '85%',
      onPress: () => router.push('/student/attendance'),
    },
    {
      icon: FileText,
      title: 'Assignments',
      count: '3 Pending',
      onPress: () => router.push('/student/assignments'),
    },
    {
      icon: Trophy,
      title: 'Results',
      count: 'View Grades',
      onPress: () => router.push('/student/results'),
    },
    {
      icon: Calendar,
      title: 'Events',
      count: '2 Upcoming',
      onPress: () => router.push('/student/events'),
    },
    {
      icon: MessageSquare,
      title: 'Complaints',
      count: 'Submit',
      onPress: () => router.push('/complaints'),
    },
    {
      icon: Building2,
      title: 'Facilities',
      count: 'Book Now',
      onPress: () => router.push('/facilities'),
    },
    {
      icon: Flag,
      title: 'Clubs',
      count: '5 Active',
      onPress: () => router.push('/student/clubs'),
    },
    {
      icon: Activity,
      title: 'Other Activities',
      count: 'View All',
      onPress: () => router.push('/student/activities'),
    },
    {
      icon: FileEdit,
      title: 'Request Leave',
      count: 'Apply Now',
      onPress: () => router.push('/student/leave-request'),
    },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F2F2F7' }]}
      contentContainerStyle={styles.content}>
      <View style={[styles.profileCard, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400' }}
            style={styles.avatar}
          />
          <TouchableOpacity onPress={handleSettings}>
            <Settings size={24} color={isDark ? '#FFFFFF' : '#000000'} />
          </TouchableOpacity>
        </View>
        <View style={styles.profileInfo}>
          <Text style={[styles.name, { color: isDark ? '#FFFFFF' : '#000000' }]}>John Doe</Text>
          <Text style={[styles.details, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
            Student ID: ST2024001{'\n'}
            Computer Science - Year 3
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          Today's Schedule
        </Text>
        <View style={[styles.scheduleCard, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}>
          <View style={styles.scheduleItem}>
            <Clock size={20} color={isDark ? '#0A84FF' : '#007AFF'} />
            <View style={styles.scheduleInfo}>
              <Text style={[styles.courseTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                Data Structures
              </Text>
              <Text style={[styles.courseTime, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                9:00 AM - 10:30 AM • Room 301
              </Text>
            </View>
          </View>
          <View style={styles.scheduleItem}>
            <Clock size={20} color={isDark ? '#0A84FF' : '#007AFF'} />
            <View style={styles.scheduleInfo}>
              <Text style={[styles.courseTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                Database Management
              </Text>
              <Text style={[styles.courseTime, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                11:00 AM - 12:30 PM • Room 405
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.quickActions}>
        {quickActions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.actionCard, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}
            onPress={action.onPress}>
            <action.icon size={24} color={isDark ? '#0A84FF' : '#007AFF'} />
            <Text style={[styles.actionText, { color: isDark ? '#FFFFFF' : '#000000' }]}>
              {action.title}
            </Text>
            <Text style={[styles.actionCount, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
              {action.count}
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
  profileCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
  },
  details: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 12,
  },
  scheduleCard: {
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  scheduleInfo: {
    marginLeft: 12,
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  courseTime: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    marginTop: 8,
    textAlign: 'center',
  },
  actionCount: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
    textAlign: 'center',
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