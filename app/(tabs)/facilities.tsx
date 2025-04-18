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
import { Building2, Calendar as CalendarIcon, Clock, Search, Users, CircleCheck as CheckCircle2, Circle as XCircle } from 'lucide-react-native';

interface Facility {
  id: string;
  name: string;
  type: string;
  capacity: number;
  location: string;
  image: string;
  status: 'available' | 'maintenance' | 'booked';
}

interface BookingRequest {
  id: string;
  facilityId: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected';
}

const FACILITIES = [
  {
    id: '1',
    name: 'Main Auditorium',
    type: 'Auditorium',
    capacity: 500,
    location: 'Main Block',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
    status: 'available',
  },
  {
    id: '2',
    name: 'Conference Room A',
    type: 'Conference Room',
    capacity: 50,
    location: 'Admin Block',
    image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800',
    status: 'available',
  },
  {
    id: '3',
    name: 'Sports Complex',
    type: 'Sports Facility',
    capacity: 200,
    location: 'Sports Block',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
    status: 'available',
  },
  // Add more facilities here
];

export default function FacilitiesScreen() {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    startTime: '',
    endTime: '',
    purpose: '',
  });
  const [myBookings, setMyBookings] = useState<BookingRequest[]>([]);

  const handleBooking = () => {
    if (selectedFacility) {
      const newBooking: BookingRequest = {
        id: Math.random().toString(36).substr(2, 9),
        facilityId: selectedFacility.id,
        ...bookingDetails,
        status: 'pending',
      };
      setMyBookings([...myBookings, newBooking]);
      setShowBookingForm(false);
      setSelectedFacility(null);
      setBookingDetails({ date: '', startTime: '', endTime: '', purpose: '' });
    }
  };

  const filteredFacilities = FACILITIES.filter(
    (facility) =>
      facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F2F2F7' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          Campus Facilities
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
          Book facilities for your events
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
          placeholder="Search facilities..."
          placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {showBookingForm && selectedFacility && (
        <View style={[styles.bookingForm, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}>
          <Text style={[styles.formTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
            Book {selectedFacility.name}
          </Text>
          
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Date (YYYY-MM-DD)"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={bookingDetails.date}
            onChangeText={(text) => setBookingDetails({ ...bookingDetails, date: text })}
          />
          
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Start Time (HH:MM)"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={bookingDetails.startTime}
            onChangeText={(text) => setBookingDetails({ ...bookingDetails, startTime: text })}
          />
          
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="End Time (HH:MM)"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={bookingDetails.endTime}
            onChangeText={(text) => setBookingDetails({ ...bookingDetails, endTime: text })}
          />
          
          <TextInput
            style={[styles.input, styles.textArea, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Purpose of booking"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={bookingDetails.purpose}
            onChangeText={(text) => setBookingDetails({ ...bookingDetails, purpose: text })}
            multiline
            numberOfLines={4}
          />

          <View style={styles.formActions}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: isDark ? '#FF453A' : '#FF3B30' }]}
              onPress={() => setShowBookingForm(false)}>
              <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: isDark ? '#30D158' : '#34C759' }]}
              onPress={handleBooking}>
              <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Submit Request</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.facilitiesList}>
        {filteredFacilities.map((facility) => (
          <TouchableOpacity
            key={facility.id}
            style={[
              styles.facilityCard,
              { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' },
            ]}
            onPress={() => {
              setSelectedFacility(facility);
              setShowBookingForm(true);
            }}>
            <View style={styles.facilityHeader}>
              <View style={styles.facilityInfo}>
                <Building2 size={20} color={isDark ? '#0A84FF' : '#007AFF'} />
                <Text style={[styles.facilityName, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                  {facility.name}
                </Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(facility.status, isDark) },
                ]}>
                <Text style={styles.statusText}>{facility.status}</Text>
              </View>
            </View>

            <View style={styles.facilityDetails}>
              <View style={styles.detailItem}>
                <Users size={16} color={isDark ? '#8E8E93' : '#6B7280'} />
                <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                  Capacity: {facility.capacity}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Building2 size={16} color={isDark ? '#8E8E93' : '#6B7280'} />
                <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                  Location: {facility.location}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {myBookings.length > 0 && (
        <View style={styles.myBookings}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
            My Booking Requests
          </Text>
          {myBookings.map((booking) => {
            const facility = FACILITIES.find(f => f.id === booking.facilityId);
            return (
              <View
                key={booking.id}
                style={[
                  styles.bookingCard,
                  { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' },
                ]}>
                <Text style={[styles.bookingTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                  {facility?.name}
                </Text>
                <View style={styles.bookingDetails}>
                  <View style={styles.detailItem}>
                    <CalendarIcon size={16} color={isDark ? '#8E8E93' : '#6B7280'} />
                    <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                      {booking.date}
                    </Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Clock size={16} color={isDark ? '#8E8E93' : '#6B7280'} />
                    <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                      {booking.startTime} - {booking.endTime}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(booking.status, isDark) },
                  ]}>
                  <Text style={styles.statusText}>{booking.status}</Text>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
}

function getStatusColor(status: string, isDark: boolean) {
  switch (status) {
    case 'available':
    case 'approved':
      return isDark ? '#30D158' : '#34C759';
    case 'maintenance':
    case 'rejected':
      return isDark ? '#FF453A' : '#FF3B30';
    case 'booked':
    case 'pending':
      return isDark ? '#FF9F0A' : '#FF9500';
    default:
      return isDark ? '#8E8E93' : '#8E8E93';
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
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
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
  bookingForm: {
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
  formActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 16,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  facilitiesList: {
    padding: 20,
  },
  facilityCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  facilityHeader: {
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
  facilityDetails: {
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
  statusBadge: {
    alignSelf: 'flex-start',
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
  myBookings: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 16,
  },
  bookingCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  bookingTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 8,
  },
  bookingDetails: {
    gap: 8,
    marginBottom: 12,
  },
});