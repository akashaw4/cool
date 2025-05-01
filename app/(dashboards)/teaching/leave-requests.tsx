import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Search, Calendar, CircleCheck as CheckCircle, Circle as XCircle } from 'lucide-react-native';

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

export default function LeaveRequestsScreen() {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [requests, setRequests] = useState<LeaveRequest[]>([]);

  // Load leave requests from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRequests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
      setRequests(storedRequests);
    }
  }, []);

  const handleApprove = (requestId: string) => {
    const updatedRequests = requests.map(request =>
      request.id === requestId ? { ...request, status: 'approved' } : request
    );
    setRequests(updatedRequests);
    if (typeof window !== 'undefined') {
      localStorage.setItem('leaveRequests', JSON.stringify(updatedRequests));
    }
  };

  const handleReject = (requestId: string) => {
    const updatedRequests = requests.map(request =>
      request.id === requestId ? { ...request, status: 'rejected' } : request
    );
    setRequests(updatedRequests);
    if (typeof window !== 'undefined') {
      localStorage.setItem('leaveRequests', JSON.stringify(updatedRequests));
    }
  };

  const filteredRequests = requests.filter(
    (request) =>
      request.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F2F2F7' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          Student Leave Requests
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
          placeholder="Search requests..."
          placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.requestsList}>
        {filteredRequests.map((request) => (
          <View
            key={request.id}
            style={[
              styles.requestCard,
              { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' },
            ]}>
            <View style={styles.requestHeader}>
              <Text style={[styles.studentName, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                {request.studentName}
              </Text>
              <Text style={[styles.studentId, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                ID: {request.studentId}
              </Text>
            </View>

            <View style={styles.requestDetails}>
              <Text style={[styles.detailLabel, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                Class: {request.class}
              </Text>
              <Text style={[styles.detailLabel, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                Roll Number: {request.rollNumber}
              </Text>
              <Text style={[styles.detailLabel, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                Category: {request.category}
              </Text>
            </View>

            <View style={styles.dateContainer}>
              <Calendar size={16} color={isDark ? '#8E8E93' : '#6B7280'} />
              <Text style={[styles.dateText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                {request.fromDate} to {request.toDate}
              </Text>
            </View>

            <Text style={[styles.reasonTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
              Reason:
            </Text>
            <Text style={[styles.reason, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
              {request.reason}
            </Text>

            {request.attachments && request.attachments.length > 0 && (
              <View style={styles.attachments}>
                <Text style={[styles.attachmentsTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                  Attachments:
                </Text>
                {request.attachments.map((file, index) => (
                  <Text
                    key={index}
                    style={[styles.attachmentName, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                    {file.name}
                  </Text>
                ))}
              </View>
            )}

            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    request.status === 'approved'
                      ? isDark
                        ? '#30D158'
                        : '#34C759'
                      : request.status === 'rejected'
                      ? isDark
                        ? '#FF453A'
                        : '#FF3B30'
                      : isDark
                      ? '#FF9F0A'
                      : '#FF9500',
                },
              ]}>
              <Text style={styles.statusText}>{request.status}</Text>
            </View>

            {request.status === 'pending' && (
              <View style={styles.actions}>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: isDark ? '#30D158' : '#34C759' }]}
                  onPress={() => handleApprove(request.id)}>
                  <CheckCircle size={20} color="#FFFFFF" />
                  <Text style={styles.actionButtonText}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: isDark ? '#FF453A' : '#FF3B30' }]}
                  onPress={() => handleReject(request.id)}>
                  <XCircle size={20} color="#FFFFFF" />
                  <Text style={styles.actionButtonText}>Reject</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}

        {filteredRequests.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyStateText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
              No leave requests found
            </Text>
          </View>
        )}
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
  requestsList: {
    padding: 20,
  },
  requestCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  requestHeader: {
    marginBottom: 12,
  },
  studentName: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
  },
  studentId: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  requestDetails: {
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  reasonTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
  },
  reason: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 12,
  },
  attachments: {
    marginBottom: 12,
  },
  attachmentsTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
  },
  attachmentName: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 2,
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
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
});