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
import { Upload, Search, FileText } from 'lucide-react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as XLSX from 'xlsx';

interface StudentResult {
  id: string;
  name: string;
  rollNo: string;
  year: string;
  division: string;
  prnNo: string;
  department: string;
  subject: string;
  marks: number;
  grade: string;
}

export default function TeacherResultsScreen() {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<StudentResult[]>([]);

  const handleImportExcel = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      if (result.assets && result.assets[0]) {
        const asset = result.assets[0];
        const response = await fetch(asset.uri);
        const blob = await response.blob();
        const reader = new FileReader();

        reader.onload = (e) => {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          const newResults = jsonData.map((row: any) => ({
            id: Math.random().toString(36).substr(2, 9),
            name: row.name || '',
            rollNo: row.rollNo || '',
            year: row.year || '',
            division: row.division || '',
            prnNo: row.prnNo || '',
            department: row.department || '',
            subject: row.subject || '',
            marks: parseInt(row.marks) || 0,
            grade: row.grade || '',
          }));

          setResults([...results, ...newResults]);
        };

        reader.readAsArrayBuffer(blob);
      }
    } catch (error) {
      console.error('Error importing Excel file:', error);
    }
  };

  const filteredResults = results.filter(
    (result) =>
      result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.prnNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F2F2F7' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          Student Results
        </Text>
        <TouchableOpacity
          style={[styles.uploadButton, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}
          onPress={handleImportExcel}>
          <Upload size={20} color={isDark ? '#0A84FF' : '#007AFF'} />
          <Text style={[styles.uploadButtonText, { color: isDark ? '#0A84FF' : '#007AFF' }]}>
            Import Results
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
          placeholder="Search results..."
          placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.resultsList}>
        {filteredResults.map((result) => (
          <View
            key={result.id}
            style={[
              styles.resultCard,
              { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' },
            ]}>
            <View style={styles.resultHeader}>
              <FileText size={24} color={isDark ? '#0A84FF' : '#007AFF'} />
              <View style={styles.studentInfo}>
                <Text style={[styles.studentName, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                  {result.name}
                </Text>
                <Text style={[styles.studentDetails, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                  Roll No: {result.rollNo} • PRN: {result.prnNo}
                </Text>
              </View>
            </View>

            <View style={styles.resultDetails}>
              <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                Department: {result.department}
              </Text>
              <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                Year: {result.year} • Division: {result.division}
              </Text>
              <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                Subject: {result.subject}
              </Text>
            </View>

            <View style={styles.marks}>
              <Text style={[styles.marksText, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                Marks: {result.marks}
              </Text>
              <Text style={[styles.gradeText, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                Grade: {result.grade}
              </Text>
            </View>
          </View>
        ))}

        {results.length === 0 && (
          <View style={styles.emptyState}>
            <FileText size={48} color={isDark ? '#8E8E93' : '#6B7280'} />
            <Text style={[styles.emptyStateText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
              No results uploaded yet
            </Text>
            <Text style={[styles.emptyStateSubtext, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
              Import an Excel file to get started
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
  header: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    marginBottom: 16,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
    alignSelf: 'flex-start',
  },
  uploadButtonText: {
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
  resultsList: {
    padding: 20,
  },
  resultCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  studentInfo: {
    marginLeft: 12,
    flex: 1,
  },
  studentName: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
  },
  studentDetails: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  resultDetails: {
    gap: 4,
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  marks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#38383A',
  },
  marksText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  gradeText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginTop: 12,
  },
  emptyStateSubtext: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
});