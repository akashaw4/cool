import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Calendar, Clock, Users, CircleCheck as CheckCircle2, Circle as XCircle } from 'lucide-react-native';

interface Attendance {
  id: string;
  type: 'class' | 'event' | 'activity';
  title: string;
  date: string;
  time: string;
  subject?: string;
  event?: string;
  activity?: string;
  status: 'present' | 'absent';
  markedBy: string;
}

const ATTENDANCE_DATA: Attendance[] = [
  {
    id: '1',
    type: 'class',
    title: 'Data Structures Lecture',
    date: '2024-03-15',
    time: '09:00 AM',
    subject: 'Data Structures',
    status: 'present',
    markedBy: 'Dr. Michael Chen',
  },
  {
    id: '2',
    type: 'event',
    title: 'Annual Tech Symposium',
    date: '2024-03-16',
    time: '10:30 AM',
    event: 'Tech Symposium 2024',
    status: 'present',
    markedBy: 'Event Coordinator',
  },
  {
    id: '3',
    type: 'activity',
    title: 'Coding Club Meeting',
    date: '2024-03-17',
    time: '02:00 PM',
    activity: 'Coding Club',
    status: 'absent',
    markedBy: 'Club Mentor',
  },
];

export default function AttendanceScreen() {
  const { isDark } = useTheme();
  const [selectedType, setSelectedType] = useState<'all' | 'class' | 'event' | 'activity'>('all');

  const filteredAttendance = selectedType === 'all' 
    ? ATTENDANCE_DATA 
    : ATTENDANCE_DATA.filter(a => a.type === selectedType);

  const calculateAttendancePercentage = (type: 'all' | 'class' | 'event' | 'activity') => {
    const relevantAttendance = type === 'all' 
      ? ATTENDANCE_DATA 
      : ATTENDANCE_DATA.filter(a => a.type === type);
    
    const present = relevantAttendance.filter(a => a.status === 'present').length;
    const total = relevantAttendance.length;
    return total > 0 ? Math.round((present / total) * 100) : 0;
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F2F2F7' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          My Attendance
        </Text>
      </View>

      <View style={[styles.statsCard, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}>
        <Text style={[styles.statsTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          Overall Attendance
        </Text>
        <Text style={[styles.statsPercentage, { color: isDark ? '#30D158' : '#34C759' }]}>
          {calculateAttendancePercentage('all')}%
        </Text>
      </View>

      <View style={styles.filterButtons}>
        {(['all', 'class', 'event', 'activity'] as const).map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.filterButton,
              {
                backgroundColor:
                  selectedType === type
                    ? isDark
                      ? '#0A84FF'
                      : '#007AFF'
                    : isDark
                    ? '#1C1C1E'
                    : '#FFFFFF',
              },
            ]}
            onPress={() => setSelectedType(type)}>
            <Text
              style={[
                styles.filterButtonText,
                {
                  color:
                    selectedType === type
                      ? '#FFFFFF'
                      : isDark
                      ? '#FFFFFF'
                      : '#000000',
                },
              ]}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.attendanceList}>
        {filteredAttendance.map((attendance) => (
          <View
            key={attendance.id}
            style={[
              styles.attendanceCard,
              { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' },
            ]}>
            <View style={styles.attendanceHeader}>
              <Text style={[styles.attendanceTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                {attendance.title}
              </Text>
              {attendance.status === 'present' ? (
                <CheckCircle2 size={20} color={isDark ? '#30D158' : '#34C759'} />
              ) : (
                <XCircle size={20} color={isDark ? '#FF453A' : '#FF3B30'} />
              )}
            </View>

            <View style={styles.attendanceDetails}>
              <View style={styles.detailItem}>
                <Calendar size={16} color={isDark ? '#8E8E93' : '#6B7280'} />
                <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                  {attendance.date}
                </Text>
              </View>
              
              <View style={styles.detailItem}>
                <Clock size={16} color={isDark ? '#8E8E93' : '#6B7280'} />
                <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                  {attendance.time}
                </Text>
              </View>

              <View style={styles.detailItem}>
                <Users size={16} color={isDark ? '#8E8E93' : '#6B7280'} />
                <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                  Marked by: {attendance.markedBy}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.typeBadge,
                {
                  backgroundColor:
                    attendance.type === 'class'
                      ? isDark
                        ? '#FF9F0A'
                        : '#FF9500'
                      : attendance.type === 'event'
                      ? isDark
                        ? '#30D158'
                        : '#34C759'
                      : isDark
                      ? '#0A84FF'
                      : '#007AFF',
                },
              ]}>
              <Text style={styles.typeBadgeText}>
                {attendance.type.charAt(0).toUpperCase() + attendance.type.slice(1)}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    marginBottom: 16,
  },
  statsCard: {
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statsTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 8,
  },
  statsPercentage: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
  },
  filterButtons: {
    flexDirection: 'row',
    padding: 20,
    gap: 8,
  },
  filterButton: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  filterButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  attendanceList: {
    padding: 20,
  },
  attendanceCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  attendanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  attendanceTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    flex: 1,
  },
  attendanceDetails: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 12,
  },
  typeBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
});