import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Building2, Calendar, ClipboardList, Clock, FileText, Settings, PenTool as Tool, LogOut, MessageCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function NonTeachingDashboard() {
  const { isDark } = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/');
  };

  const quickActions = [
    {
      icon: Building2,
      title: 'Facility Status',
      count: '12 Buildings',
      onPress: () => {},
    },
    {
      icon: Tool,
      title: 'Maintenance',
      count: '5 Requests',
      onPress: () => {},
    },
    {
      icon: Calendar,
      title: 'Schedule',
      count: 'View Calendar',
      onPress: () => {},
    },
    {
      icon: FileText,
      title: 'Reports',
      count: 'Generate',
      onPress: () => {},
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
          source={{ uri: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400' }}
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <Text style={[styles.name, { color: isDark ? '#FFFFFF' : '#000000' }]}>Robert Wilson</Text>
          <Text style={[styles.details, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
            Facility Manager{'\n'}
            Maintenance Department
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          Today's Tasks
        </Text>
        <View style={[styles.tasksCard, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}>
          <View style={styles.taskItem}>
            <Clock size={20} color={isDark ? '#0A84FF' : '#007AFF'} />
            <View style={styles.taskInfo}>
              <Text style={[styles.taskTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                HVAC Maintenance Check
              </Text>
              <Text style={[styles.taskTime, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                9:00 AM - Building A
              </Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: isDark ? '#30D158' : '#34C759' },
              ]}>
              <Text style={styles.statusText}>In Progress</Text>
            </View>
          </View>

          <View style={styles.taskItem}>
            <Clock size={20} color={isDark ? '#0A84FF' : '#007AFF'} />
            <View style={styles.taskInfo}>
              <Text style={[styles.taskTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                Classroom Equipment Check
              </Text>
              <Text style={[styles.taskTime, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                11:00 AM - Building B
              </Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: isDark ? '#FF9F0A' : '#FF9500' },
              ]}>
              <Text style={styles.statusText}>Pending</Text>
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
  tasksCard: {
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
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  taskInfo: {
    flex: 1,
    marginLeft: 12,
  },
  taskTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  taskTime: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
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