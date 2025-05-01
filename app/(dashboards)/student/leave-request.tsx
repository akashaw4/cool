import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Calendar, FileUp, Send } from 'lucide-react-native';
import * as DocumentPicker from 'expo-document-picker';

interface LeaveRequest {
  id: string;
  studentName: string;
  studentId: string;
  class: string;
  rollNumber: string;
  fromDate: string;
  toDate: string;
  category: string;
  reason: string;
  attachments: { name: string; uri: string }[];
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  classTeacher: string;
}

const LEAVE_CATEGORIES = [
  'Medical Leave',
  'Family Emergency',
  'Religious/Festival',
  'Sports/Competition',
  'Personal Reasons',
];

export default function LeaveRequestScreen() {
  const { isDark } = useTheme();
  const [leaveRequest, setLeaveRequest] = useState<Partial<LeaveRequest>>({
    studentName: 'John Doe',
    studentId: 'ST2024001',
    class: 'Computer Science - Year 3',
    rollNumber: 'CS2021001',
    fromDate: '',
    toDate: '',
    category: '',
    reason: '',
    attachments: [],
    classTeacher: 'Dr. Michael Chen', // This should be dynamically set based on student's class
  });

  const handleAttachDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: false,
        multiple: true,
      });

      if (result.assets) {
        const newAttachments = result.assets.map(asset => ({
          name: asset.name,
          uri: asset.uri,
        }));
        setLeaveRequest(prev => ({
          ...prev,
          attachments: [...(prev.attachments || []), ...newAttachments],
        }));
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  const handleSubmit = () => {
    const newLeaveRequest: LeaveRequest = {
      id: Math.random().toString(36).substr(2, 9),
      ...leaveRequest as Required<Omit<LeaveRequest, 'id' | 'status' | 'submittedAt'>>,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };

    // Add to global leave requests state (this should be handled by a proper state management system)
    if (typeof window !== 'undefined') {
      const existingRequests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
      localStorage.setItem('leaveRequests', JSON.stringify([...existingRequests, newLeaveRequest]));
    }

    // Reset form
    setLeaveRequest({
      ...leaveRequest,
      fromDate: '',
      toDate: '',
      category: '',
      reason: '',
      attachments: [],
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F2F2F7' }]}>
      <View style={[styles.card, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
            Leave Application
          </Text>
          <Text style={[styles.headerDate, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
            {new Date().toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
            Student Details
          </Text>
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text style={[styles.label, { color: isDark ? '#8E8E93' : '#6B7280' }]}>Name</Text>
              <Text style={[styles.value, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                {leaveRequest.studentName}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={[styles.label, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                Student ID
              </Text>
              <Text style={[styles.value, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                {leaveRequest.studentId}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={[styles.label, { color: isDark ? '#8E8E93' : '#6B7280' }]}>Class</Text>
              <Text style={[styles.value, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                {leaveRequest.class}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={[styles.label, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                Roll Number
              </Text>
              <Text style={[styles.value, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                {leaveRequest.rollNumber}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={[styles.label, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                Class Teacher
              </Text>
              <Text style={[styles.value, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                {leaveRequest.classTeacher}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
            Leave Details
          </Text>
          
          <View style={styles.dateContainer}>
            <View style={styles.dateInput}>
              <Calendar size={20} color={isDark ? '#8E8E93' : '#6B7280'} />
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' },
                ]}
                placeholder="From Date (YYYY-MM-DD)"
                placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
                value={leaveRequest.fromDate}
                onChangeText={(text) => setLeaveRequest({ ...leaveRequest, fromDate: text })}
              />
            </View>
            <View style={styles.dateInput}>
              <Calendar size={20} color={isDark ? '#8E8E93' : '#6B7280'} />
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' },
                ]}
                placeholder="To Date (YYYY-MM-DD)"
                placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
                value={leaveRequest.toDate}
                onChangeText={(text) => setLeaveRequest({ ...leaveRequest, toDate: text })}
              />
            </View>
          </View>

          <View style={styles.categories}>
            {LEAVE_CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor:
                      leaveRequest.category === category
                        ? isDark
                          ? '#0A84FF'
                          : '#007AFF'
                        : isDark
                        ? '#2C2C2E'
                        : '#F2F2F7',
                  },
                ]}
                onPress={() => setLeaveRequest({ ...leaveRequest, category })}>
                <Text
                  style={[
                    styles.categoryText,
                    {
                      color:
                        leaveRequest.category === category
                          ? '#FFFFFF'
                          : isDark
                          ? '#FFFFFF'
                          : '#000000',
                    },
                  ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={[
              styles.input,
              styles.textArea,
              { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' },
            ]}
            placeholder="Detailed Reason for Leave"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={leaveRequest.reason}
            onChangeText={(text) => setLeaveRequest({ ...leaveRequest, reason: text })}
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity
            style={[
              styles.attachButton,
              { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7' },
            ]}
            onPress={handleAttachDocument}>
            <FileUp size={24} color={isDark ? '#0A84FF' : '#007AFF'} />
            <Text style={[styles.attachButtonText, { color: isDark ? '#0A84FF' : '#007AFF' }]}>
              Attach Supporting Documents
            </Text>
          </TouchableOpacity>

          {leaveRequest.attachments && leaveRequest.attachments.length > 0 && (
            <View style={styles.attachments}>
              <Text style={[styles.attachmentsTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                Attached Documents:
              </Text>
              {leaveRequest.attachments.map((file, index) => (
                <Text
                  key={index}
                  style={[styles.attachmentName, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                  {file.name}
                </Text>
              ))}
            </View>
          )}
        </View>

        <View style={styles.termsSection}>
          <Text style={[styles.termsText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
            By submitting this application, I confirm that all the information provided is accurate and
            true to the best of my knowledge.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: isDark ? '#0A84FF' : '#007AFF' }]}
          onPress={handleSubmit}>
          <Send size={20} color="#FFFFFF" />
          <Text style={styles.submitButtonText}>Submit Leave Request</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 20,
    padding: 20,
    borderRadius: 12,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
  },
  headerDate: {
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
    marginBottom: 16,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  detailItem: {
    flex: 1,
    minWidth: '45%',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  dateInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontFamily: 'Inter_400Regular',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  attachButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  attachButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  attachments: {
    marginTop: 16,
  },
  attachmentsTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 8,
  },
  attachmentName: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 4,
  },
  termsSection: {
    marginBottom: 24,
  },
  termsText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});