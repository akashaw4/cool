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
import { Building2, Plus, Search, Trash2, SquarePen as PenSquare, Clock, Calendar as CalendarIcon } from 'lucide-react-native';

interface Facility {
  id: string;
  name: string;
  type: string;
  capacity: number;
  location: string;
  description: string;
  status: 'available' | 'maintenance' | 'booked';
}

const FACILITY_TYPES = [
  // Academic Facilities
  'Lecture Hall',
  'Smart Classroom',
  'Laboratory',
  'Computer Lab',
  'Workshop',
  'Seminar Hall',
  'Conference Room',
  'Library',
  'Research Center',
  
  // Sports Facilities
  'Indoor Sports Complex',
  'Outdoor Sports Ground',
  'Basketball Court',
  'Cricket Ground',
  'Football Ground',
  'Gymnasium',
  'Swimming Pool',
  
  // Technical Facilities
  'CAD/CAM Lab',
  'Robotics Lab',
  'Electronics Lab',
  'Mechanical Workshop',
  'Chemical Lab',
  'Physics Lab',
  'Project Lab',
  
  // Student Amenities
  'Auditorium',
  'Student Center',
  'Cafeteria',
  'Medical Center',
  'Placement Cell',
  'Innovation Hub',
  
  // Residential Facilities
  'Boys Hostel',
  'Girls Hostel',
  'Staff Quarters',
  'Guest House',
  
  // Other Facilities
  'Parking Area',
  'Transport Facility',
  'Power Backup Facility',
  'Wi-Fi Zone'
];

export default function FacilityManagementScreen() {
  const { isDark } = useTheme();
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [facilityList, setFacilityList] = useState<Facility[]>([]);
  const [newFacility, setNewFacility] = useState({
    name: '',
    type: '',
    capacity: '',
    location: '',
    description: '',
  });

  const handleAddFacility = () => {
    const newFacilityEntry: Facility = {
      id: Math.random().toString(36).substr(2, 9),
      name: newFacility.name,
      type: newFacility.type,
      capacity: parseInt(newFacility.capacity) || 0,
      location: newFacility.location,
      description: newFacility.description,
      status: 'available',
    };
    setFacilityList([...facilityList, newFacilityEntry]);
    setNewFacility({ name: '', type: '', capacity: '', location: '', description: '' });
    setShowAddForm(false);
  };

  const filteredFacilities = facilityList.filter(
    (facility) =>
      facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F2F2F7' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          Facility Management
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}
          onPress={() => setShowAddForm(true)}>
          <Plus size={20} color={isDark ? '#0A84FF' : '#007AFF'} />
          <Text style={[styles.buttonText, { color: isDark ? '#0A84FF' : '#007AFF' }]}>
            Add Facility
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
          placeholder="Search facilities..."
          placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {showAddForm && (
        <View style={[styles.formContainer, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}>
          <Text style={[styles.formTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
            Add New Facility
          </Text>
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Facility Name"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newFacility.name}
            onChangeText={(text) => setNewFacility({ ...newFacility, name: text })}
          />
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Type"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newFacility.type}
            onChangeText={(text) => setNewFacility({ ...newFacility, type: text })}
          />
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Capacity"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newFacility.capacity}
            onChangeText={(text) => setNewFacility({ ...newFacility, capacity: text })}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Location"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newFacility.location}
            onChangeText={(text) => setNewFacility({ ...newFacility, location: text })}
          />
          <TextInput
            style={[styles.input, styles.textArea, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Description"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newFacility.description}
            onChangeText={(text) => setNewFacility({ ...newFacility, description: text })}
            multiline
            numberOfLines={4}
          />
          <View style={styles.formActions}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: isDark ? '#FF453A' : '#FF3B30' }]}
              onPress={() => setShowAddForm(false)}>
              <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: isDark ? '#30D158' : '#34C759' }]}
              onPress={handleAddFacility}>
              <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.facilityList}>
        {filteredFacilities.map((facility) => (
          <View
            key={facility.id}
            style={[
              styles.facilityCard,
              { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' },
            ]}>
            <View style={styles.facilityInfo}>
              <Text style={[styles.facilityName, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                {facility.name}
              </Text>
              <Text style={[styles.facilityDetails, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                {facility.type} • Capacity: {facility.capacity}
              </Text>
              <Text style={[styles.facilityLocation, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                Location: {facility.location}
              </Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(facility.status, isDark) }]}>
                <Text style={styles.statusText}>{facility.status}</Text>
              </View>
            </View>
            <View style={styles.facilityActions}>
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

function getStatusColor(status: string, isDark: boolean) {
  switch (status) {
    case 'available':
      return isDark ? '#30D158' : '#34C759';
    case 'maintenance':
      return isDark ? '#FF9F0A' : '#FF9500';
    case 'booked':
      return isDark ? '#FF453A' : '#FF3B30';
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
  formActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 16,
  },
  facilityList: {
    padding: 20,
  },
  facilityCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  facilityInfo: {
    flex: 1,
  },
  facilityName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  facilityDetails: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  facilityLocation: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    textTransform: 'capitalize',
  },
  facilityActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionButton: {
    padding: 8,
  },
});