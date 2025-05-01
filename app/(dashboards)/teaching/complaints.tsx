import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useComplaints } from '@/context/ComplaintContext';
import { Search, MessageCircle, CircleCheck as CheckCircle2, Circle as XCircle } from 'lucide-react-native';

export default function TeacherComplaintsScreen() {
  const { isDark } = useTheme();
  const { complaints, updateComplaintStatus } = useComplaints();
  const [searchQuery, setSearchQuery] = useState('');
  const [response, setResponse] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState<string | null>(null);

  // Filter complaints for teacher's department (this should be based on actual teacher's department)
  const teacherDepartment = 'Computer Science'; // This should come from teacher's profile
  const departmentComplaints = complaints.filter(
    complaint => complaint.department === teacherDepartment
  );

  const filteredComplaints = departmentComplaints.filter(
    (complaint) =>
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleResolve = (complaintId: string) => {
    updateComplaintStatus(complaintId, 'resolved', response);
    setResponse('');
    setSelectedComplaint(null);
  };

  const handleReject = (complaintId: string) => {
    updateComplaintStatus(complaintId, 'rejected', response);
    setResponse('');
    setSelectedComplaint(null);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F2F2F7' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          Department Complaints
        </Text>
      </View>

      <View
        style={[
          styles.searchContainer,
          { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' },
        ]}>
        <Search size={20} color={isDark ? '#8E8E93' : '#8E8E93'} />
        <TextInput
          style={[styles.searchInput, { color: isDark ? '#FFFFFF' : '#000000' }]}
          placeholder="Search complaints..."
          placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.complaintsList}>
        {filteredComplaints.map((complaint) => (
          <View
            key={complaint.id}
            style={[
              styles.complaintCard,
              { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' },
            ]}>
            <View style={styles.complaintHeader}>
              <MessageCircle size={20} color={isDark ? '#0A84FF' : '#007AFF'} />
              <Text style={[styles.complaintTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                {complaint.title}
              </Text>
            </View>

            <Text style={[styles.complaintDescription, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
              {complaint.description}
            </Text>

            <View style={styles.complaintDetails}>
              <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                Submitted by: {complaint.submittedBy}
              </Text>
              <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                Date: {new Date(complaint.submittedAt).toLocaleDateString()}
              </Text>
            </View>

            {complaint.response && (
              <View style={[styles.responseContainer, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7' }]}>
                <Text style={[styles.responseTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                  Response:
                </Text>
                <Text style={[styles.responseText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                  {complaint.response}
                </Text>
              </View>
            )}

            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(complaint.status, isDark) },
              ]}>
              <Text style={styles.statusText}>{complaint.status}</Text>
            </View>

            {complaint.status === 'pending' && (
              <>
                {selectedComplaint === complaint.id ? (
                  <View style={styles.responseForm}>
                    <TextInput
                      style={[
                        styles.responseInput,
                        { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' },
                      ]}
                      placeholder="Enter your response..."
                      placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
                      value={response}
                      onChangeText={setResponse}
                      multiline
                      numberOfLines={3}
                    />
                    <View style={styles.actions}>
                      <TouchableOpacity
                        style={[styles.actionButton, { backgroundColor: isDark ? '#30D158' : '#34C759' }]}
                        onPress={() => handleResolve(complaint.id)}>
                        <CheckCircle2 size={20} color="#FFFFFF" />
                        <Text style={styles.actionButtonText}>Resolve</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.actionButton, { backgroundColor: isDark ? '#FF453A' : '#FF3B30' }]}
                        onPress={() => handleReject(complaint.id)}>
                        <XCircle size={20} color="#FFFFFF" />
                        <Text style={styles.actionButtonText}>Reject</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={[styles.respondButton, { backgroundColor: isDark ? '#0A84FF' : '#007AFF' }]}
                    onPress={() => setSelectedComplaint(complaint.id)}>
                    <Text style={styles.respondButtonText}>Respond</Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function getStatusColor(status: string, isDark: boolean) {
  switch (status) {
    case 'resolved':
      return isDark ? '#30D158' : '#34C759';
    case 'rejected':
      return isDark ? '#FF453A' : '#FF3B30';
    default:
      return isDark ? '#FF9F0A' : '#FF9500';
  }
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
  complaintsList: {
    padding: 20,
  },
  complaintCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  complaintHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  complaintTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    flex: 1,
  },
  complaintDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 12,
  },
  complaintDetails: {
    gap: 4,
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  responseContainer: {
    padding: 12,
    borderRadius: 8,
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
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    textTransform: 'capitalize',
  },
  responseForm: {
    marginTop: 12,
  },
  responseInput: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  respondButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  respondButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
});