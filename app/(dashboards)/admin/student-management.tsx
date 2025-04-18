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
import { Upload, UserPlus, Search, Trash2, SquarePen as PenSquare, GraduationCap } from 'lucide-react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as XLSX from 'xlsx';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  rollNumber: string;
  year: string;
  admissionDate: string;
}

export default function StudentManagementScreen() {
  const { isDark } = useTheme();
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [studentList, setStudentList] = useState<Student[]>([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    rollNumber: '',
    year: '',
  });

  const handleImportExcel = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      if (result.assets && result.assets[0]) {
        const asset = result.assets[0];
        if (Platform.OS === 'web') {
          const response = await fetch(asset.uri);
          const blob = await response.blob();
          const reader = new FileReader();
          reader.onload = (e) => {
            const data = new Uint8Array(e.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            
            const newStudentList = jsonData.map((row: any) => ({
              id: Math.random().toString(36).substr(2, 9),
              name: row.name || '',
              email: row.email || '',
              phone: row.phone || '',
              department: row.department || '',
              rollNumber: row.rollNumber || '',
              year: row.year || '',
              admissionDate: new Date().toISOString().split('T')[0],
            }));

            setStudentList([...studentList, ...newStudentList]);
          };
          reader.readAsArrayBuffer(blob);
        }
      }
    } catch (error) {
      console.error('Error importing Excel file:', error);
    }
  };

  const handleAddStudent = () => {
    const newStudentEntry: Student = {
      id: Math.random().toString(36).substr(2, 9),
      ...newStudent,
      admissionDate: new Date().toISOString().split('T')[0],
    };
    setStudentList([...studentList, newStudentEntry]);
    setNewStudent({ name: '', email: '', phone: '', department: '', rollNumber: '', year: '' });
    setShowAddForm(false);
  };

  const filteredStudents = studentList.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F2F2F7' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          Student Management
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}
            onPress={handleImportExcel}>
            <Upload size={20} color={isDark ? '#0A84FF' : '#007AFF'} />
            <Text style={[styles.buttonText, { color: isDark ? '#0A84FF' : '#007AFF' }]}>
              Import Excel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}
            onPress={() => setShowAddForm(true)}>
            <UserPlus size={20} color={isDark ? '#0A84FF' : '#007AFF'} />
            <Text style={[styles.buttonText, { color: isDark ? '#0A84FF' : '#007AFF' }]}>
              Add Student
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={[
          styles.searchContainer,
          { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' },
        ]}>
        <Search size={20} color={isDark ? '#8E8E93' : '#8E8E93'} />
        <TextInput
          style={[styles.searchInput, { color: isDark ? '#FFFFFF' : '#000000' }]}
          placeholder="Search students..."
          placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {showAddForm && (
        <View style={[styles.formContainer, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}>
          <Text style={[styles.formTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
            Add New Student
          </Text>
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Name"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newStudent.name}
            onChangeText={(text) => setNewStudent({ ...newStudent, name: text })}
          />
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Email"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newStudent.email}
            onChangeText={(text) => setNewStudent({ ...newStudent, email: text })}
            keyboardType="email-address"
          />
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Phone"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newStudent.phone}
            onChangeText={(text) => setNewStudent({ ...newStudent, phone: text })}
            keyboardType="phone-pad"
          />
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Department"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newStudent.department}
            onChangeText={(text) => setNewStudent({ ...newStudent, department: text })}
          />
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Roll Number"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newStudent.rollNumber}
            onChangeText={(text) => setNewStudent({ ...newStudent, rollNumber: text })}
          />
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Year"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newStudent.year}
            onChangeText={(text) => setNewStudent({ ...newStudent, year: text })}
          />
          <View style={styles.formActions}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: isDark ? '#FF453A' : '#FF3B30' }]}
              onPress={() => setShowAddForm(false)}>
              <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: isDark ? '#30D158' : '#34C759' }]}
              onPress={handleAddStudent}>
              <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.studentList}>
        {filteredStudents.map((student) => (
          <View
            key={student.id}
            style={[
              styles.studentCard,
              { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' },
            ]}>
            <View style={styles.studentInfo}>
              <Text style={[styles.studentName, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                {student.name}
              </Text>
              <Text style={[styles.studentDetails, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                {student.department} • Year {student.year} • {student.rollNumber}
              </Text>
              <Text style={[styles.studentContact, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                {student.email} • {student.phone}
              </Text>
            </View>
            <View style={styles.studentActions}>
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
  actions: {
    flexDirection: 'row',
    gap: 12,
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
  formActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 16,
  },
  studentList: {
    padding: 20,
  },
  studentCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  studentDetails: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  studentContact: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  studentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionButton: {
    padding: 8,
  },
});