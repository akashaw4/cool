import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useClubs } from '@/context/ClubContext';
import { Users, Flag } from 'lucide-react-native';

export default function ClubList() {
  const { isDark } = useTheme();
  const { clubs } = useClubs();

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F2F2F7' }]}>
      <View style={styles.clubsList}>
        {clubs.map((club) => (
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
          </View>
        ))}

        {clubs.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyStateText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
              No clubs found
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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