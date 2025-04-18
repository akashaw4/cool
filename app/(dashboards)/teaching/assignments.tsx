import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { FileText, Plus, Search, Trash2, SquarePen as PenSquare, Upload } from 'lucide-react-native';
import * as DocumentPicker from 'expo-document-picker';

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

export default function TeacherAssignmentsScreen() {
  const { isDark } = useTheme();
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    dueDate: '',
    course: '',
  });

  const handleUploadAssignment = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: false,
      });

      if (result.assets && result.assets[0]) {
        const asset = result.assets[0];
        const assignment: Assignment = {
          id: Math.random().toString(36).substr(2, 9),
          ...newAssignment,
          fileUrl: asset.uri,
          uploadedBy: 'Dr. Michael Chen',
          uploadedAt: new Date().toISOString(),
        };

        setAssignments([...assignments, assignment]);
        setNewAssignment({
          title: '',
          description: '',
          dueDate: '',
          course: '',
        });
        setShowAddForm(false);
      }
    } catch (error) {
      console.error('Error uploading assignment:', error);
    }
  };

  const filteredAssignments = assignments.filter(
    (assignment) =>
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F2F2F7' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          Assignments
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}
          onPress={() => setShowAddForm(true)}>
          <Plus size={20} color={isDark ? '#0A84FF' : '#007AFF'} />
          <Text style={[styles.buttonText, { color: isDark ? '#0A84FF' : '#007AFF' }]}>
            Create Assignment
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.searchContainer,
          { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' },
        ]}>
        <Search size={20} color={isDark ? '#8E8E93' : '#8E8E93'} />
        <TextInput
          style={[styles.searchInput, { color: isDark ? '#FFFFFF' : '#000000' }]}
          placeholder="Search assignments..."
          placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {showAddForm && (
        <View style={[styles.formContainer, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}>
          <Text style={[styles.formTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
            Create New Assignment
          </Text>
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Assignment Title"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newAssignment.title}
            onChangeText={(text) => setNewAssignment({ ...newAssignment, title: text })}
          />
          <TextInput
            style={[styles.input, styles.textArea, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Description"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newAssignment.description}
            onChangeText={(text) => setNewAssignment({ ...newAssignment, description: text })}
            multiline
            numberOfLines={4}
          />
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Due Date (YYYY-MM-DD)"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newAssignment.dueDate}
            onChangeText={(text) => setNewAssignment({ ...newAssignment, dueDate: text })}
          />
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Course"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newAssignment.course}
            onChangeText={(text) => setNewAssignment({ ...newAssignment, course: text })}
          />
          <TouchableOpacity
            style={[
              styles.uploadButton,
              { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7' },
            ]}
            onPress={handleUploadAssignment}>
            <Upload size={24} color={isDark ? '#0A84FF' : '#007AFF'} />
            <Text style={[styles.uploadText, { color: isDark ? '#0A84FF' : '#007AFF' }]}>
              Upload Assignment File
            </Text>
          </TouchableOpacity>
          <View style={styles.formActions}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: isDark ? '#FF453A' : '#FF3B30' }]}
              onPress={() => setShowAddForm(false)}>
              <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: isDark ? '#30D158' : '#34C759' }]}
              onPress={handleUploadAssignment}>
              <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.assignmentsList}>
        {filteredAssignments.map((assignment) => (
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
            <View style={styles.assignmentActions}>
              <TouchableOpacity style={styles.actionButton}>
                <PenSquare size={20} color={isDark ? '#0A84FF' : '#007AFF'} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Trash2 size={20} color={isDark ? '#FF453A' : '#FF3B30'} />
              </TouchableOpacity>
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
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    padding: 12,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  formContainer: {
    margin: 20,
    padding: 16,
    borderRadius: 12,
  },
  formTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 16,
  },
  input: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  uploadButton: {
    height: 120,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    marginTop: 8,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 16,
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
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  assignmentActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 16,
  },
  actionButton: {
    padding: 8,
  },
});