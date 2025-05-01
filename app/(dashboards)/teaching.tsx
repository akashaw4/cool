import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { BookOpen, Calendar, FileText, Clock, SquareCheck as CheckSquare, LogOut, FileCheck, Flag, Activity, MessageCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function TeachingDashboard() {
  const { isDark } = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/');
  };

  const quickActions = [
    {
      icon: FileCheck,
      title: 'Leave Notice',
      count: '5 Pending',
      onPress: () => router.push('/teaching/leave-requests'),
    },
    {
      icon: BookOpen,
      title: 'Course Management',
      count: '4 Courses',
      onPress: () => router.push('/teaching/course-management'),
    },
    {
      icon: Calendar,
      title: 'Attendance',
      count: 'Mark Today',
      onPress: () => router.push('/teaching/attendance'),
    },
    {
      icon: FileText,
      title: 'Results',
      count: 'Upload Now',
      onPress: () => router.push('/teaching/results'),
    },
    {
      icon: Calendar,
      title: 'Events',
      count: 'View All',
      onPress: () => router.push('/teaching/events'),
    },
    {
      icon: Flag,
      title: 'Clubs',
      count: 'View All',
      onPress: () => router.push('/teaching/clubs'),
    },
    {
      icon: Activity,
      title: 'Other Activities',
      count: 'View All',
      onPress: () => router.push('/teaching/activities'),
    },
    {
      icon: MessageCircle,
      title: 'Complaints',
      count: 'View All',
      onPress: () => router.push('/complaints'),
    },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F2F2F7' }]}
      contentContainerStyle={styles.content}>
      <View style={[styles.profileCard, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' }}
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <Text style={[styles.name, { color: isDark ? '#FFFFFF' : '#000000' }]}>Dr. Michael Chen</Text>
          <Text style={[styles.details, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
            Professor - Computer Science{'\n'}
            Department of Engineering
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          Today's Classes
        </Text>
        <View style={[styles.scheduleCard, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}>
          <View style={styles.classItem}>
            <Clock size={20} color={isDark ? '#0A84FF' : '#007AFF'} />
            <View style={styles.classInfo}>
              <Text style={[styles.className, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                Advanced Programming
              </Text>
              <Text style={[styles.classDetails, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                9:00 AM - 10:30 AM • Room 301
              </Text>
              <Text style={[styles.studentCount, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                35 Students
              </Text>
            </View>
          </View>
          <View style={styles.classItem}>
            <Clock size={20} color={isDark ? '#0A84FF' : '#007AFF'} />
            <View style={styles.classInfo}>
              <Text style={[styles.className, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                Software Engineering
              </Text>
              <Text style={[styles.classDetails, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                11:00 AM - 12:30 PM • Room 405
              </Text>
              <Text style={[styles.studentCount, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                42 Students
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
    flexDirection: 'row',
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
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    marginLeft: 16,
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
  classItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  classInfo: {
    marginLeft: 12,
    flex: 1,
  },
  className: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  classDetails: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  studentCount: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
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