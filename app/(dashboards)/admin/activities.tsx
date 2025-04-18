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
import { useActivities } from '@/context/ActivitiesContext';
import { Plus, Calendar, MapPin, Users } from 'lucide-react-native';

export default function AdminActivitiesScreen() {
  const { isDark } = useTheme();
  const { activities, addActivity } = useActivities();
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newActivity, setNewActivity] = useState({
    title: '',
    description: '',
    type: '',
    date: '',
    time: '',
    venue: '',
    coordinator: '',
    participants: '',
  });

  const handleAddActivity = () => {
    addActivity({
      title: newActivity.title,
      description: newActivity.description,
      type: newActivity.type,
      date: newActivity.date,
      time: newActivity.time,
      venue: newActivity.venue,
      coordinator: newActivity.coordinator,
      participants: parseInt(newActivity.participants) || 0,
    });
    setNewActivity({
      title: '',
      description: '',
      type: '',
      date: '',
      time: '',
      venue: '',
      coordinator: '',
      participants: '',
    });
    setShowAddForm(false);
  };

  const filteredActivities = activities.filter(
    (activity) =>
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F2F2F7' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          Other Activities
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}
          onPress={() => setShowAddForm(true)}>
          <Plus size={20} color={isDark ? '#0A84FF' : '#007AFF'} />
          <Text style={[styles.buttonText, { color: isDark ? '#0A84FF' : '#007AFF' }]}>
            Add Activity
          </Text>
        </TouchableOpacity>
      </View>

      {showAddForm && (
        <View style={[styles.formContainer, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}>
          <Text style={[styles.formTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
            Add New Activity
          </Text>
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Activity Title"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newActivity.title}
            onChangeText={(text) => setNewActivity({ ...newActivity, title: text })}
          />
          <TextInput
            style={[styles.input, styles.textArea, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Description"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newActivity.description}
            onChangeText={(text) => setNewActivity({ ...newActivity, description: text })}
            multiline
            numberOfLines={4}
          />
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Type"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newActivity.type}
            onChangeText={(text) => setNewActivity({ ...newActivity, type: text })}
          />
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Date (YYYY-MM-DD)"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newActivity.date}
            onChangeText={(text) => setNewActivity({ ...newActivity, date: text })}
          />
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Time (HH:MM)"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newActivity.time}
            onChangeText={(text) => setNewActivity({ ...newActivity, time: text })}
          />
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Venue"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newActivity.venue}
            onChangeText={(text) => setNewActivity({ ...newActivity, venue: text })}
          />
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Coordinator"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newActivity.coordinator}
            onChangeText={(text) => setNewActivity({ ...newActivity, coordinator: text })}
          />
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Expected Participants"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newActivity.participants}
            onChangeText={(text) => setNewActivity({ ...newActivity, participants: text })}
            keyboardType="numeric"
          />
          <View style={styles.formActions}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: isDark ? '#FF453A' : '#FF3B30' }]}
              onPress={() => setShowAddForm(false)}>
              <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: isDark ? '#30D158' : '#34C759' }]}
              onPress={handleAddActivity}>
              <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.activitiesList}>
        {filteredActivities.map((activity) => (
          <View
            key={activity.id}
            style={[
              styles.activityCard,
              { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' },
            ]}>
            <View style={styles.activityHeader}>
              <Text style={[styles.activityTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                {activity.title}
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(activity.status, isDark) },
                ]}>
                <Text style={styles.statusText}>{activity.status}</Text>
              </View>
            </View>

            <Text style={[styles.activityDescription, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
              {activity.description}
            </Text>

            <View style={styles.activityDetails}>
              <View style={styles.detailItem}>
                <Calendar size={16} color={isDark ? '#8E8E93' : '#6B7280'} />
                <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                  {activity.date} at {activity.time}
                </Text>
              </View>

              <View style={styles.detailItem}>
                <MapPin size={16} color={isDark ? '#8E8E93' : '#6B7280'} />
                <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                  {activity.venue}
                </Text>
              </View>

              <View style={styles.detailItem}>
                <Users size={16} color={isDark ? '#8E8E93' : '#6B7280'} />
                <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                  {activity.participants} Participants
                </Text>
              </View>
            </View>

            <Text style={[styles.coordinator, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
              Coordinator: {activity.coordinator}
            </Text>
          </View>
        ))}
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
  activitiesList: {
    padding: 20,
  },
  activityCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityTitle: {
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
  activityDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 12,
  },
  activityDetails: {
    gap: 8,
    marginBottom: 12,
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
  coordinator: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 16,
  },
});