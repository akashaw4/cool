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
import { useClubs } from '@/context/ClubContext';
import { Plus, Trash2, SquarePen as PenSquare, Users, Flag } from 'lucide-react-native';

export default function ClubsScreen() {
  const { isDark } = useTheme();
  const { clubs, addClub, updateClub, deleteClub } = useClubs();
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newClub, setNewClub] = useState({
    name: '',
    description: '',
    category: '',
    advisor: '',
    meetingSchedule: '',
    memberCount: '',
  });

  const handleAddClub = () => {
    addClub({
      name: newClub.name,
      description: newClub.description,
      category: newClub.category,
      advisor: newClub.advisor,
      meetingSchedule: newClub.meetingSchedule,
      memberCount: parseInt(newClub.memberCount) || 0,
    });
    setNewClub({
      name: '',
      description: '',
      category: '',
      advisor: '',
      meetingSchedule: '',
      memberCount: '',
    });
    setShowAddForm(false);
  };

  const handleDeleteClub = (id: string) => {
    deleteClub(id);
  };

  const filteredClubs = clubs.filter(
    (club) =>
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F2F2F7' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          Club Management
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}
          onPress={() => setShowAddForm(true)}>
          <Plus size={20} color={isDark ? '#0A84FF' : '#007AFF'} />
          <Text style={[styles.buttonText, { color: isDark ? '#0A84FF' : '#007AFF' }]}>
            Create Club
          </Text>
        </TouchableOpacity>
      </View>

      {showAddForm && (
        <View style={[styles.formContainer, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}>
          <Text style={[styles.formTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
            Create New Club
          </Text>
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Club Name"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newClub.name}
            onChangeText={(text) => setNewClub({ ...newClub, name: text })}
          />
          <TextInput
            style={[styles.input, styles.textArea, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Description"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newClub.description}
            onChangeText={(text) => setNewClub({ ...newClub, description: text })}
            multiline
            numberOfLines={4}
          />
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Category"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newClub.category}
            onChangeText={(text) => setNewClub({ ...newClub, category: text })}
          />
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Faculty Advisor"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newClub.advisor}
            onChangeText={(text) => setNewClub({ ...newClub, advisor: text })}
          />
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Meeting Schedule"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newClub.meetingSchedule}
            onChangeText={(text) => setNewClub({ ...newClub, meetingSchedule: text })}
          />
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Initial Member Count"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newClub.memberCount}
            onChangeText={(text) => setNewClub({ ...newClub, memberCount: text })}
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
              onPress={handleAddClub}>
              <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.clubsList}>
        {filteredClubs.map((club) => (
          <View
            key={club.id}
            style={[
              styles.clubCard,
              { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' },
            ]}>
            <View style={styles.clubHeader}>
              <Flag size={24} color={isDark ? '#0A84FF' : '#007AFF'} />
              <Text style={[styles.clubName, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                {club.name}
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      club.status === 'active'
                        ? isDark
                          ? '#30D158'
                          : '#34C759'
                        : isDark
                        ? '#FF453A'
                        : '#FF3B30',
                  },
                ]}>
                <Text style={styles.statusText}>{club.status}</Text>
              </View>
            </View>

            <Text style={[styles.clubDescription, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
              {club.description}
            </Text>

            <View style={styles.clubDetails}>
              <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                Category: {club.category}
              </Text>
              <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                Advisor: {club.advisor}
              </Text>
              <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                Meeting: {club.meetingSchedule}
              </Text>
              <View style={styles.memberCount}>
                <Users size={16} color={isDark ? '#8E8E93' : '#6B7280'} />
                <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                  {club.memberCount} Members
                </Text>
              </View>
            </View>

            <View style={styles.clubActions}>
              <TouchableOpacity style={styles.actionButton}>
                <PenSquare size={20} color={isDark ? '#0A84FF' : '#007AFF'} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleDeleteClub(club.id)}>
                <Trash2 size={20} color={isDark ? '#FF453A' : '#FF3B30'} />
              </TouchableOpacity>
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
  clubsList: {
    padding: 20,
  },
  clubCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  clubHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  clubName: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    flex: 1,
    marginLeft: 12,
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
  clubDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 12,
  },
  clubDetails: {
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  memberCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  clubActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 16,
  },
  actionButton: {
    padding: 8,
  },
});