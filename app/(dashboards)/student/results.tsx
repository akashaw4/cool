import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { GraduationCap } from 'lucide-react-native';

interface Result {
  id: string;
  course: string;
  marks: number;
  grade: string;
  semester: string;
  uploadedBy: string;
  uploadedAt: string;
}

const RESULTS: Result[] = [
  {
    id: '1',
    course: 'Data Structures',
    marks: 85,
    grade: 'A',
    semester: 'Fall 2023',
    uploadedBy: 'Dr. Michael Chen',
    uploadedAt: '2024-03-10T10:00:00Z',
  },
  {
    id: '2',
    course: 'Database Management',
    marks: 78,
    grade: 'B+',
    semester: 'Fall 2023',
    uploadedBy: 'Prof. Sarah Johnson',
    uploadedAt: '2024-03-12T14:30:00Z',
  },
];

export default function StudentResultsScreen() {
  const { isDark } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F2F2F7' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          My Results
        </Text>
      </View>

      <View style={styles.resultsList}>
        {RESULTS.map((result) => (
          <View
            key={result.id}
            style={[
              styles.resultCard,
              { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' },
            ]}>
            <View style={styles.resultHeader}>
              <GraduationCap size={20} color={isDark ? '#0A84FF' : '#007AFF'} />
              <Text style={[styles.courseTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                {result.course}
              </Text>
            </View>
            <View style={styles.resultDetails}>
              <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                Semester: {result.semester}
              </Text>
              <View style={styles.marksContainer}>
                <Text style={[styles.marks, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                  Marks: {result.marks}
                </Text>
                <Text style={[styles.grade, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                  Grade: {result.grade}
                </Text>
              </View>
              <Text style={[styles.uploadInfo, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                Updated by {result.uploadedBy}
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
  resultsList: {
    padding: 20,
  },
  resultCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  courseTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    flex: 1,
  },
  resultDetails: {
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  marksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  marks: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  grade: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  uploadInfo: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
  },
});