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
import { Check, X, Search, Clock, Calendar as CalendarIcon, Building2 } from 'lucide-react-native';

interface BookingRequest {
  id: string;
  facilityId: string;
  facilityName: string;
  userId: string;
  userName: string;
  userRole: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
}

export default function FacilityBookingsScreen() {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([
    {
      id: '1',
      facilityId: 'f1',
      facilityName: 'Main Auditorium',
      userId: 'u1',
      userName: 'Dr. Sharma',
      userRole: 'Professor',
      date: '2024-03-20',
      startTime: '10:00',
      endTime: '12:00',
      purpose: 'Technical Symposium',
      status: 'pending',
      requestedAt: '2024-03-15T10:30:00Z',
    },
    // Add more sample booking requests
  ]);

  const handleApprove = (bookingId: string) => {
    setBookingRequests(bookingRequests.map(booking =>
      booking.id === bookingId ? { ...booking, status: 'approved' } : booking
    ));
    // TODO: Send notification to user
  };

  const handleReject = (bookingId: string) => {
    setBookingRequests(bookingRequests.map(booking =>
      booking.id === bookingId ? { ...booking, status: 'rejected' } : booking
    ));
    // TODO: Send notification to user
  };

  const filteredBookings = bookingRequests.filter(
    (booking) =>
      booking.facilityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F2F2F7' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          Facility Booking Requests
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
          placeholder="Search bookings..."
          placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.bookingList}>
        {filteredBookings.map((booking) => (
          <View
            key={booking.id}
            style={[
              styles.bookingCard,
              { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' },
            ]}>
            <View style={styles.bookingHeader}>
              <View style={styles.facilityInfo}>
                <Building2 size={20} color={isDark ? '#0A84FF' : '#007AFF'} />
                <Text style={[styles.facilityName, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                  {booking.facilityName}
                </Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(booking.status, isDark) },
                ]}>
                <Text style={styles.statusText}>{booking.status}</Text>
              </View>
            </View>

            <View style={styles.bookingDetails}>
              <Text style={[styles.userName, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                {booking.userName} • {booking.userRole}
              </Text>
              
              <View style={styles.timeInfo}>
                <CalendarIcon size={16} color={isDark ? '#8E8E93' : '#6B7280'} />
                <Text style={[styles.timeText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                  {booking.date}
                </Text>
              </View>
              
              <View style={styles.timeInfo}>
                <Clock size={16} color={isDark ? '#8E8E93' : '#6B7280'} />
                <Text style={[styles.timeText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                  {booking.startTime} - {booking.endTime}
                </Text>
              </View>

              <Text style={[styles.purpose, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                Purpose: {booking.purpose}
              </Text>
            </View>

            {booking.status === 'pending' && (
              <View style={styles.actions}>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: isDark ? '#30D158' : '#34C759' }]}
                  onPress={() => handleApprove(booking.id)}>
                  <Check size={20} color="#FFFFFF" />
                  <Text style={styles.actionText}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: isDark ? '#FF453A' : '#FF3B30' }]}
                  onPress={() => handleReject(booking.id)}>
                  <X size={20} color="#FFFFFF" />
                  <Text style={styles.actionText}>Reject</Text>
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
    case 'approved':
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
  bookingList: {
    padding: 20,
  },
  bookingCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  facilityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  facilityName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
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
    textTransform: 'capitalize',
  },
  bookingDetails: {
    gap: 8,
  },
  userName: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  purpose: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    gap: 4,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
});