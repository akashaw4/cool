import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { FileText, Download } from 'lucide-react-native';

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  course: string;
  fileUrl?: string;
  uploadedBy: string;
  uploadedAt: string;
}

const ASSIGNMENTS: Assignment[] = [
  {
    id: '1',
    title: 'Data Structures Assignment 1',
    description: 'Implement a binary search tree with basic operations',
    dueDate: '2024-03-20',
    course: 'Data Structures',
    fileUrl: 'https://example.com/assignment1.pdf',
    uploadedBy: 'Dr. Michael Chen',
    uploadedAt: '2024-03-10T10:00:00Z',
  },
  {
    id: '2',
    title: 'Database Design Project',
    description: 'Design and implement a database schema for a library management system',
    dueDate: '2024-03-25',
    course: 'Database Management',
    fileUrl: 'https://example.com/assignment2.pdf',
    uploadedBy: 'Prof. Sarah Johnson',
    uploadedAt: '2024-03-12T14:30:00Z',
  },
];

export default function StudentAssignmentsScreen() {
  const { isDark } = useTheme();

  const handleDownload = (fileUrl: string) => {
    // Implement file download logic
    console.log('Downloading:', fileUrl);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F2F2F7' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          My Assignments
        </Text>
      </View>

      <View style={styles.assignmentsList}>
        {ASSIGNMENTS.map((assignment) => (
          <View
            key={assignment.id}
            style={[
              styles.assignmentCard,
              { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' },
            ]}>
            <View style={styles.assignmentHeader}>
              <FileText size={20} color={isDark ? '#0A84FF' : '#007AFF'} />
              <Text style={[styles.assignmentTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                {assignment.title}
              </Text>
            </View>
            <Text style={[styles.assignmentDescription, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
              {assignment.description}
            </Text>
            <View style={styles.assignmentDetails}>
              <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                Course: {assignment.course}
              </Text>
              <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                Due Date: {assignment.dueDate}
              </Text>
              <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                Uploaded by: {assignment.uploadedBy}
              </Text>
            </View>
            {assignment.fileUrl && (
              <TouchableOpacity
                style={[
                  styles.downloadButton,
                  { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7' },
                ]}
                onPress={() => handleDownload(assignment.fileUrl!)}>
                <Download size={20} color={isDark ? '#0A84FF' : '#007AFF'} />
                <Text style={[styles.downloadText, { color: isDark ? '#0A84FF' : '#007AFF' }]}>
                  Download Assignment
                </Text>
              </TouchableOpacity>
            )}
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
  assignmentsList: {
    padding: 20,
  },
  assignmentCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  assignmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  assignmentTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    flex: 1,
  },
  assignmentDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 12,
  },
  assignmentDetails: {
    gap: 4,
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  downloadText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
});