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
import { useEvents } from '@/context/EventsContext';
import { Calendar, Clock, MapPin, Users, Search } from 'lucide-react-native';

export default function TeacherEventsScreen() {
  const { isDark } = useTheme();
  const { events } = useEvents();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F2F2F7' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          Campus Events
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
          placeholder="Search events..."
          placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.eventsList}>
        {filteredEvents.map((event) => (
          <View
            key={event.id}
            style={[
              styles.eventCard,
              { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' },
            ]}>
            <View style={styles.eventHeader}>
              <Text style={[styles.eventTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                {event.title}
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(event.status, isDark) },
                ]}>
                <Text style={styles.statusText}>{event.status}</Text>
              </View>
            </View>

            <Text style={[styles.eventDescription, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
              {event.description}
            </Text>

            <View style={styles.eventDetails}>
              <View style={styles.detailItem}>
                <Calendar size={16} color={isDark ? '#8E8E93' : '#6B7280'} />
                <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                  {event.date}
                </Text>
              </View>
              
              <View style={styles.detailItem}>
                <Clock size={16} color={isDark ? '#8E8E93' : '#6B7280'} />
                <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                  {event.time}
                </Text>
              </View>
              
              <View style={styles.detailItem}>
                <MapPin size={16} color={isDark ? '#8E8E93' : '#6B7280'} />
                <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                  {event.venue}
                </Text>
              </View>
              
              <View style={styles.detailItem}>
                <Users size={16} color={isDark ? '#8E8E93' : '#6B7280'} />
                <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                  {event.registeredCount}/{event.capacity} Registered
                </Text>
              </View>
            </View>
          </View>
        ))}

        {filteredEvents.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyStateText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
              No events found
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

function getStatusColor(status: string, isDark: boolean) {
  switch (status) {
    case 'upcoming':
      return isDark ? '#FF9F0A' : '#FF9500';
    case 'ongoing':
      return isDark ? '#30D158' : '#34C759';
    case 'completed':
      return isDark ? '#8E8E93' : '#8E8E93';
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
  eventsList: {
    padding: 20,
  },
  eventCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 18,
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
    textTransform: 'capitalize',
  },
  eventDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 12,
  },
  eventDetails: {
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