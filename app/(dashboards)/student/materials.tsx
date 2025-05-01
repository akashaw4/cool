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
import { FileText, Search, Download, BookOpen } from 'lucide-react-native';

interface Material {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'video' | 'note';
  course: string;
  uploadedBy: string;
  uploadedAt: string;
  fileUrl: string;
}

const MATERIALS = [
  {
    id: '1',
    title: 'Introduction to Data Structures',
    description: 'Basic concepts and implementation of data structures',
    type: 'document',
    course: 'Data Structures',
    uploadedBy: 'Dr. Michael Chen',
    uploadedAt: '2024-03-10T10:00:00Z',
    fileUrl: 'https://example.com/materials/ds-intro.pdf',
  },
  {
    id: '2',
    title: 'Database Design Fundamentals',
    description: 'Understanding database schemas and relationships',
    type: 'video',
    course: 'Database Management',
    uploadedBy: 'Prof. Sarah Johnson',
    uploadedAt: '2024-03-12T14:30:00Z',
    fileUrl: 'https://example.com/materials/db-design.mp4',
  },
];

export default function MaterialsScreen() {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMaterials = MATERIALS.filter(
    (material) =>
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = (fileUrl: string) => {
    // Implement download logic
    console.log('Downloading:', fileUrl);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F2F2F7' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          Course Materials
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
          placeholder="Search materials..."
          placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.materialsList}>
        {filteredMaterials.map((material) => (
          <View
            key={material.id}
            style={[
              styles.materialCard,
              { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' },
            ]}>
            <View style={styles.materialHeader}>
              {material.type === 'document' ? (
                <FileText size={20} color={isDark ? '#0A84FF' : '#007AFF'} />
              ) : (
                <BookOpen size={20} color={isDark ? '#0A84FF' : '#007AFF'} />
              )}
              <Text style={[styles.materialTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                {material.title}
              </Text>
            </View>
            
            <Text style={[styles.materialDescription, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
              {material.description}
            </Text>

            <View style={styles.materialDetails}>
              <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                Course: {material.course}
              </Text>
              <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                Uploaded by: {material.uploadedBy}
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.downloadButton,
                { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7' },
              ]}
              onPress={() => handleDownload(material.fileUrl)}>
              <Download size={20} color={isDark ? '#0A84FF' : '#007AFF'} />
              <Text style={[styles.downloadText, { color: isDark ? '#0A84FF' : '#007AFF' }]}>
                Download Material
              </Text>
            </TouchableOpacity>
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
  materialsList: {
    padding: 20,
  },
  materialCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  materialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  materialTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    flex: 1,
  },
  materialDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 12,
  },
  materialDetails: {
    gap: 4,
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  downloadText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
});