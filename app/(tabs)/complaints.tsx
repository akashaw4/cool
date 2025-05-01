import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useComplaints } from '@/context/ComplaintContext';
import { Send, CircleAlert as AlertCircle, ThumbsUp, MessageCircle } from 'lucide-react-native';

export default function ComplaintsScreen() {
  const { isDark } = useTheme();
  const { complaints, addComplaint, getAllComplaints } = useComplaints();
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [complaintTitle, setComplaintTitle] = useState('');
  const [complaintDescription, setComplaintDescription] = useState('');

  const handleSubmit = () => {
    addComplaint({
      title: complaintTitle,
      description: complaintDescription,
      submittedBy: isAnonymous ? 'Anonymous' : 'John Doe', // Replace with actual user name
      isAnonymous,
      studentId: 'student123', // Replace with actual student ID
    });
    setComplaintTitle('');
    setComplaintDescription('');
    setIsAnonymous(false);
  };

  // Get all complaints for admin/teacher view, or filter for student view
  const displayedComplaints = getAllComplaints();

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F2F2F7' }]}>
      <View style={[styles.section, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          Submit a Complaint
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7',
              color: isDark ? '#FFFFFF' : '#000000',
            },
          ]}
          placeholder="Title"
          placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
          value={complaintTitle}
          onChangeText={setComplaintTitle}
        />
        <TextInput
          style={[
            styles.input,
            styles.textArea,
            {
              backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7',
              color: isDark ? '#FFFFFF' : '#000000',
            },
          ]}
          placeholder="Description"
          placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
          multiline
          numberOfLines={4}
          value={complaintDescription}
          onChangeText={setComplaintDescription}
        />
        <View style={styles.anonymousToggle}>
          <Text style={[styles.toggleText, { color: isDark ? '#FFFFFF' : '#000000' }]}>
            Submit Anonymously
          </Text>
          <Switch value={isAnonymous} onValueChange={setIsAnonymous} />
        </View>
        <TouchableOpacity
          style={[
            styles.submitButton,
            { backgroundColor: isDark ? '#0A84FF' : '#007AFF' },
          ]}
          onPress={handleSubmit}>
          <Send size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.submitButtonText}>Submit Complaint</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.section, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          All Complaints
        </Text>
        {displayedComplaints.map((complaint) => (
          <View
            key={complaint.id}
            style={[
              styles.complaintCard,
              { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7' },
            ]}>
            <View style={styles.complaintHeader}>
              <Text style={[styles.complaintTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                {complaint.title}
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      complaint.status === 'resolved'
                        ? isDark
                          ? '#30D158'
                          : '#34C759'
                        : complaint.status === 'rejected'
                        ? isDark
                          ? '#FF453A'
                          : '#FF3B30'
                        : isDark
                        ? '#FF9F0A'
                        : '#FF9500',
                  },
                ]}>
                <Text style={styles.statusText}>{complaint.status}</Text>
              </View>
            </View>
            <Text style={[styles.complaintDescription, { color: isDark ? '#8E8E93' : '#8E8E93' }]}>
              {complaint.description}
            </Text>
            {complaint.response && (
              <View style={styles.responseContainer}>
                <Text style={[styles.responseTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                  Response:
                </Text>
                <Text style={[styles.responseText, { color: isDark ? '#8E8E93' : '#8E8E93' }]}>
                  {complaint.response}
                </Text>
              </View>
            )}
            <View style={styles.complaintFooter}>
              {complaint.isAnonymous && (
                <View style={styles.footerItem}>
                  <AlertCircle size={16} color={isDark ? '#8E8E93' : '#8E8E93'} />
                  <Text style={[styles.footerText, { color: isDark ? '#8E8E93' : '#8E8E93' }]}>
                    Anonymous
                  </Text>
                </View>
              )}
              <Text style={[styles.dateText, { color: isDark ? '#8E8E93' : '#8E8E93' }]}>
                {new Date(complaint.submittedAt).toLocaleDateString()}
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
  section: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 16,
  },
  input: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontFamily: 'Inter_400Regular',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  anonymousToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  toggleText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  complaintCard: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  complaintHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  complaintTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    flex: 1,
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
  complaintDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 12,
  },
  responseContainer: {
    marginTop: 8,
    marginBottom: 12,
  },
  responseTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
  },
  responseText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  complaintFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  footerText: {
    marginLeft: 4,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  dateText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
});