import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';

const CANDIDATES = [
  {
    id: '1',
    name: 'Sarah Johnson',
    position: 'Student Council President',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    votes: 245,
  },
  {
    id: '2',
    name: 'Michael Chen',
    position: 'Vice President',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    votes: 198,
  },
];

export default function ElectionsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Student Council Elections 2024</Text>
        <Text style={styles.headerSubtitle}>Voting ends in 2 days</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Candidates</Text>
        {CANDIDATES.map((candidate) => (
          <View key={candidate.id} style={styles.candidateCard}>
            <Image
              source={{ uri: `${candidate.image}?w=200` }}
              style={styles.candidateImage}
            />
            <View style={styles.candidateInfo}>
              <Text style={styles.candidateName}>{candidate.name}</Text>
              <Text style={styles.candidatePosition}>{candidate.position}</Text>
              <Text style={styles.voteCount}>{candidate.votes} votes</Text>
            </View>
            <TouchableOpacity style={styles.voteButton}>
              <Text style={styles.voteButtonText}>Vote</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Election Timeline</Text>
        <View style={styles.timeline}>
          <View style={styles.timelineItem}>
            <View style={[styles.timelineDot, styles.timelineDotActive]} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineDate}>Mar 10, 2024</Text>
              <Text style={styles.timelineTitle}>Nominations Open</Text>
            </View>
          </View>
          <View style={styles.timelineItem}>
            <View style={[styles.timelineDot, styles.timelineDotActive]} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineDate}>Mar 15, 2024</Text>
              <Text style={styles.timelineTitle}>Voting Begins</Text>
            </View>
          </View>
          <View style={styles.timelineItem}>
            <View style={styles.timelineDot} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineDate}>Mar 20, 2024</Text>
              <Text style={styles.timelineTitle}>Results Announcement</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#000000',
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#8E8E93',
    marginTop: 4,
  },
  section: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    borderRadius: 12,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#000000',
    marginBottom: 16,
  },
  candidateCard: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  candidateImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  candidateInfo: {
    flex: 1,
    marginLeft: 16,
  },
  candidateName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#000000',
  },
  candidatePosition: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#8E8E93',
    marginTop: 2,
  },
  voteCount: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#007AFF',
    marginTop: 4,
  },
  voteButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  voteButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
  },
  timeline: {
    marginTop: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#8E8E93',
    marginTop: 6,
  },
  timelineDotActive: {
    backgroundColor: '#007AFF',
  },
  timelineContent: {
    marginLeft: 12,
    flex: 1,
  },
  timelineDate: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#8E8E93',
  },
  timelineTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#000000',
    marginTop: 2,
  },
});