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
import { Search, MessageCircle, CircleCheck as CheckCircle, Circle as XCircle } from 'lucide-react-native';

interface Complaint {
  id: string;
  title: string;
  description: string;
  submittedBy: string;
  submittedAt: string;
  status: 'pending' | 'resolved' | 'rejected';
  response?: string;
  isAnonymous: boolean;
}

export default function AdminComplaintsScreen() {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      id: '1',
      title: 'Cafeteria Food Quality',
      description: 'The food quality in the cafeteria has deteriorated over the past week.',
      submittedBy: 'Anonymous',
      submittedAt: '2024-03-15',
      status: 'pending',
      isAnonymous: true,
    },
    {
      id: '2',
      title: 'Library Hours Extension',
      description: 'Request to extend library hours during exam period.',
      submittedBy: 'John Doe',
      submittedAt: '2024-03-14',
      status: 'resolved',
      response: 'Library hours will be extended by 2 hours during exam weeks.',
      isAnonymous: false,
    },
  ]);

  const handleResolve = (complaintId: string) => {
    setComplaints(complaints.map(complaint =>
      complaint.id === complaintId
        ? { ...complaint, status: 'resolved' }
        : complaint
    ));
  };

  const handleReject = (complaintId: string) => {
    setComplaints(complaints.map(complaint =>
      complaint.id === complaintId
        ? { ...complaint, status: 'rejected' }
        : complaint
    ));
  };

  const filteredComplaints = complaints.filter(
    (complaint) =>
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F2F2F7' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          Complaints Management
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
                Date: {complaint.submittedAt}
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
              <View style={styles.actions}>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: isDark ? '#30D158' : '#34C759' }]}
                  onPress={() => handleResolve(complaint.id)}>
                  <CheckCircle size={20} color="#FFFFFF" />
                  <Text style={styles.actionButtonText}>Resolve</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: isDark ? '#FF453A' : '#FF3B30' }]}
                  onPress={() => handleReject(complaint.id)}>
                  <XCircle size={20} color="#FFFFFF" />
                  <Text style={styles.actionButtonText}>Reject</Text>
                </TouchableOpacity>
              </View>
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
});