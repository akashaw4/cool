import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Plus, Trash2, SquarePen as PenSquare, Vote, Calendar as CalendarIcon, Upload, Clock } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { format } from 'date-fns';

interface Election {
  id: string;
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  positions: ElectionPosition[];
  status: 'upcoming' | 'active' | 'completed';
}

interface ElectionPosition {
  id: string;
  title: string;
  candidates: Candidate[];
}

interface Candidate {
  id: string;
  name: string;
  department: string;
  year: string;
  image: string;
  position: string;
  votes: number;
}

const POSITIONS = [
  'President',
  'Vice President',
  'Secretary',
  'Treasurer',
  'Sports Secretary',
  'Cultural Secretary',
];

export default function ElectionManagementScreen() {
  const { isDark } = useTheme();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCandidateForm, setShowCandidateForm] = useState(false);
  const [selectedElection, setSelectedElection] = useState<Election | null>(null);
  const [elections, setElections] = useState<Election[]>([]);
  const [newElection, setNewElection] = useState({
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
  });
  const [newCandidate, setNewCandidate] = useState({
    name: '',
    department: '',
    year: '',
    position: '',
    image: '',
  });

  const handleAddElection = () => {
    const election: Election = {
      id: Math.random().toString(36).substr(2, 9),
      ...newElection,
      positions: POSITIONS.map(pos => ({
        id: Math.random().toString(36).substr(2, 9),
        title: pos,
        candidates: [],
      })),
      status: 'upcoming',
    };
    setElections([...elections, election]);
    setNewElection({
      title: '',
      description: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
    });
    setShowAddForm(false);
  };

  const handleSelectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setNewCandidate({ ...newCandidate, image: result.assets[0].uri });
    }
  };

  const handleAddCandidate = () => {
    if (!selectedElection) return;

    const candidate: Candidate = {
      id: Math.random().toString(36).substr(2, 9),
      ...newCandidate,
      votes: 0,
    };

    setElections(elections.map(election =>
      election.id === selectedElection.id
        ? {
            ...election,
            positions: election.positions.map(position =>
              position.title === newCandidate.position
                ? { ...position, candidates: [...position.candidates, candidate] }
                : position
            ),
          }
        : election
    ));

    setNewCandidate({ name: '', department: '', year: '', position: '', image: '' });
    setShowCandidateForm(false);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F2F2F7' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          Election Management
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}
          onPress={() => setShowAddForm(true)}>
          <Plus size={20} color={isDark ? '#0A84FF' : '#007AFF'} />
          <Text style={[styles.buttonText, { color: isDark ? '#0A84FF' : '#007AFF' }]}>
            Create Election
          </Text>
        </TouchableOpacity>
      </View>

      {showAddForm && (
        <View style={[styles.formContainer, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}>
          <Text style={[styles.formTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
            Create New Election
          </Text>
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Election Title"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newElection.title}
            onChangeText={(text) => setNewElection({ ...newElection, title: text })}
          />
          <TextInput
            style={[styles.input, styles.textArea, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Description"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newElection.description}
            onChangeText={(text) => setNewElection({ ...newElection, description: text })}
            multiline
            numberOfLines={4}
          />
          <View style={styles.dateTimeContainer}>
            <View style={styles.dateTimeInput}>
              <Text style={[styles.label, { color: isDark ? '#FFFFFF' : '#000000' }]}>Start Date</Text>
              <TextInput
                style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
                value={newElection.startDate}
                onChangeText={(text) => setNewElection({ ...newElection, startDate: text })}
              />
            </View>
            <View style={styles.dateTimeInput}>
              <Text style={[styles.label, { color: isDark ? '#FFFFFF' : '#000000' }]}>Start Time</Text>
              <TextInput
                style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
                placeholder="HH:MM"
                placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
                value={newElection.startTime}
                onChangeText={(text) => setNewElection({ ...newElection, startTime: text })}
              />
            </View>
          </View>
          <View style={styles.dateTimeContainer}>
            <View style={styles.dateTimeInput}>
              <Text style={[styles.label, { color: isDark ? '#FFFFFF' : '#000000' }]}>End Date</Text>
              <TextInput
                style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
                value={newElection.endDate}
                onChangeText={(text) => setNewElection({ ...newElection, endDate: text })}
              />
            </View>
            <View style={styles.dateTimeInput}>
              <Text style={[styles.label, { color: isDark ? '#FFFFFF' : '#000000' }]}>End Time</Text>
              <TextInput
                style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
                placeholder="HH:MM"
                placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
                value={newElection.endTime}
                onChangeText={(text) => setNewElection({ ...newElection, endTime: text })}
              />
            </View>
          </View>
          <View style={styles.formActions}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: isDark ? '#FF453A' : '#FF3B30' }]}
              onPress={() => setShowAddForm(false)}>
              <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: isDark ? '#30D158' : '#34C759' }]}
              onPress={handleAddElection}>
              <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {elections.map((election) => (
        <View
          key={election.id}
          style={[
            styles.electionCard,
            { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' },
          ]}>
          <View style={styles.electionHeader}>
            <Text style={[styles.electionTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
              {election.title}
            </Text>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(election.status, isDark) },
              ]}>
              <Text style={styles.statusText}>{election.status}</Text>
            </View>
          </View>

          <Text style={[styles.electionDescription, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
            {election.description}
          </Text>

          <View style={styles.electionDates}>
            <View style={styles.dateItem}>
              <CalendarIcon size={16} color={isDark ? '#8E8E93' : '#6B7280'} />
              <Text style={[styles.dateText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                Start: {election.startDate} {election.startTime}
              </Text>
            </View>
            <View style={styles.dateItem}>
              <Clock size={16} color={isDark ? '#8E8E93' : '#6B7280'} />
              <Text style={[styles.dateText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                End: {election.endDate} {election.endTime}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.addCandidateButton, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7' }]}
            onPress={() => {
              setSelectedElection(election);
              setShowCandidateForm(true);
            }}>
            <Plus size={20} color={isDark ? '#0A84FF' : '#007AFF'} />
            <Text style={[styles.addCandidateText, { color: isDark ? '#0A84FF' : '#007AFF' }]}>
              Add Candidate
            </Text>
          </TouchableOpacity>

          {election.positions.map((position) => (
            <View key={position.id} style={styles.positionSection}>
              <Text style={[styles.positionTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                {position.title}
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {position.candidates.map((candidate) => (
                  <View
                    key={candidate.id}
                    style={[
                      styles.candidateCard,
                      { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7' },
                    ]}>
                    <Image
                      source={{ uri: candidate.image }}
                      style={styles.candidateImage}
                    />
                    <Text style={[styles.candidateName, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                      {candidate.name}
                    </Text>
                    <Text style={[styles.candidateDetails, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                      {candidate.department}
                    </Text>
                    <Text style={[styles.candidateDetails, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                      {candidate.year}
                    </Text>
                    <Text style={[styles.voteCount, { color: isDark ? '#0A84FF' : '#007AFF' }]}>
                      {candidate.votes} votes
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          ))}
        </View>
      ))}

      {showCandidateForm && selectedElection && (
        <View style={[styles.formContainer, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}>
          <Text style={[styles.formTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
            Add New Candidate
          </Text>
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Candidate Name"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newCandidate.name}
            onChangeText={(text) => setNewCandidate({ ...newCandidate, name: text })}
          />
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Department"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newCandidate.department}
            onChangeText={(text) => setNewCandidate({ ...newCandidate, department: text })}
          />
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Year"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newCandidate.year}
            onChangeText={(text) => setNewCandidate({ ...newCandidate, year: text })}
          />
          <View style={styles.pickerContainer}>
            <Text style={[styles.label, { color: isDark ? '#FFFFFF' : '#000000' }]}>Position</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {POSITIONS.map((position) => (
                <TouchableOpacity
                  key={position}
                  style={[
                    styles.positionChip,
                    {
                      backgroundColor:
                        newCandidate.position === position
                          ? isDark
                            ? '#0A84FF'
                            : '#007AFF'
                          : isDark
                          ? '#2C2C2E'
                          : '#F2F2F7',
                    },
                  ]}
                  onPress={() => setNewCandidate({ ...newCandidate, position })}>
                  <Text
                    style={[
                      styles.positionChipText,
                      {
                        color:
                          newCandidate.position === position
                            ? '#FFFFFF'
                            : isDark
                            ? '#FFFFFF'
                            : '#000000',
                      },
                    ]}>
                    {position}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <TouchableOpacity
            style={[
              styles.imageUploadButton,
              { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7' },
            ]}
            onPress={handleSelectImage}>
            {newCandidate.image ? (
              <Image source={{ uri: newCandidate.image }} style={styles.previewImage} />
            ) : (
              <>
                <Upload size={24} color={isDark ? '#0A84FF' : '#007AFF'} />
                <Text style={[styles.uploadText, { color: isDark ? '#0A84FF' : '#007AFF' }]}>
                  Upload Photo
                </Text>
              </>
            )}
          </TouchableOpacity>
          <View style={styles.formActions}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: isDark ? '#FF453A' : '#FF3B30' }]}
              onPress={() => {
                setShowCandidateForm(false);
                setSelectedElection(null);
              }}>
              <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: isDark ? '#30D158' : '#34C759' }]}
              onPress={handleAddCandidate}>
              <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Add Candidate</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

function getStatusColor(status: string, isDark: boolean) {
  switch (status) {
    case 'active':
      return isDark ? '#30D158' : '#34C759';
    case 'completed':
      return isDark ? '#8E8E93' : '#8E8E93';
    case 'upcoming':
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
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
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  dateTimeInput: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 8,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 16,
  },
  electionCard: {
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  electionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  electionTitle: {
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
  electionDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 12,
  },
  electionDates: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  addCandidateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  addCandidateText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    marginLeft: 8,
  },
  positionSection: {
    marginTop: 16,
  },
  positionTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 12,
  },
  candidateCard: {
    padding: 12,
    borderRadius: 8,
    marginRight: 12,
    width: 160,
  },
  candidateImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
    alignSelf: 'center',
  },
  candidateName: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    textAlign: 'center',
  },
  candidateDetails: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    marginTop: 2,
  },
  voteCount: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    textAlign: 'center',
    marginTop: 8,
  },
  pickerContainer: {
    marginBottom: 16,
  },
  positionChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  positionChipText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  imageUploadButton: {
    height: 120,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    marginTop: 8,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});