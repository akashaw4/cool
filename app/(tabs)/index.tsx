import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Bell, FileText, Vote, Calendar, Wallet } from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.nameText}>John Doe</Text>
      </View>

      <View style={styles.notificationsSection}>
        <Text style={styles.sectionTitle}>Recent Notifications</Text>
        <View style={styles.notification}>
          <Bell size={20} color="#007AFF" />
          <Text style={styles.notificationText}>New election announced for Student Council</Text>
        </View>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.actionItem}>
            <Vote size={24} color="#007AFF" />
            <Text style={styles.actionText}>Vote Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <FileText size={24} color="#007AFF" />
            <Text style={styles.actionText}>Submit Complaint</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <Calendar size={24} color="#007AFF" />
            <Text style={styles.actionText}>Book Facility</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <Wallet size={24} color="#007AFF" />
            <Text style={styles.actionText}>View Budget</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.upcomingEvents}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <View style={styles.eventCard}>
          <Text style={styles.eventTitle}>Annual Sports Meet</Text>
          <Text style={styles.eventDate}>March 15, 2024</Text>
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
  welcomeText: {
    fontSize: 16,
    color: '#8E8E93',
    fontFamily: 'Inter_400Regular',
  },
  nameText: {
    fontSize: 24,
    color: '#000000',
    fontFamily: 'Inter_700Bold',
    marginTop: 4,
  },
  notificationsSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    borderRadius: 12,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#000000',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 12,
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    padding: 12,
    borderRadius: 8,
  },
  notificationText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#000000',
    fontFamily: 'Inter_400Regular',
  },
  quickActions: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    borderRadius: 12,
    marginHorizontal: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionItem: {
    width: '48%',
    backgroundColor: '#F2F2F7',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    color: '#000000',
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
  upcomingEvents: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  eventCard: {
    backgroundColor: '#F2F2F7',
    padding: 16,
    borderRadius: 8,
  },
  eventTitle: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Inter_600SemiBold',
  },
  eventDate: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
});