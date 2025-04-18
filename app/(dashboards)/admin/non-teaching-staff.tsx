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
import { Upload, UserPlus, Search, Trash2, SquarePen as PenSquare } from 'lucide-react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as XLSX from 'xlsx';

interface NonTeachingStaff {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  joiningDate: string;
  shift: string;
}

const ROLES = [
  'Librarian',
  'Office Staff',
  'Lab Assistant',
  'Security Guard',
  'Cleaner',
  'Peon',
  'Accountant',
  'Receptionist',
  'System Administrator',
  'Maintenance Staff',
];

export default function NonTeachingStaffScreen() {
  const { isDark } = useTheme();
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [staffList, setStaffList] = useState<NonTeachingStaff[]>([]);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    role: '',
    shift: '',
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
            
            const newStaffList = jsonData.map((row: any) => ({
              id: Math.random().toString(36).substr(2, 9),
              name: row.name || '',
              email: row.email || '',
              phone: row.phone || '',
              department: row.department || '',
              role: row.role || '',
              shift: row.shift || '',
              joiningDate: new Date().toISOString().split('T')[0],
            }));

            setStaffList([...staffList, ...newStaffList]);
          };
          reader.readAsArrayBuffer(blob);
        }
      }
    } catch (error) {
      console.error('Error importing Excel file:', error);
    }
  };

  const handleAddStaff = () => {
    const newStaffMember: NonTeachingStaff = {
      id: Math.random().toString(36).substr(2, 9),
      ...newStaff,
      joiningDate: new Date().toISOString().split('T')[0],
    };
    setStaffList([...staffList, newStaffMember]);
    setNewStaff({ name: '', email: '', phone: '', department: '', role: '', shift: '' });
    setShowAddForm(false);
  };

  const filteredStaff = staffList.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F2F2F7' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          Non-Teaching Staff Management
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
              Add Staff
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
          placeholder="Search non-teaching staff..."
          placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {showAddForm && (
        <View style={[styles.formContainer, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}>
          <Text style={[styles.formTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
            Add New Non-Teaching Staff
          </Text>
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Name"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newStaff.name}
            onChangeText={(text) => setNewStaff({ ...newStaff, name: text })}
          />
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Email"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newStaff.email}
            onChangeText={(text) => setNewStaff({ ...newStaff, email: text })}
            keyboardType="email-address"
          />
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Phone"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newStaff.phone}
            onChangeText={(text) => setNewStaff({ ...newStaff, phone: text })}
            keyboardType="phone-pad"
          />
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Department"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newStaff.department}
            onChangeText={(text) => setNewStaff({ ...newStaff, department: text })}
          />
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Role"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newStaff.role}
            onChangeText={(text) => setNewStaff({ ...newStaff, role: text })}
          />
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Shift (e.g., Morning, Evening)"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newStaff.shift}
            onChangeText={(text) => setNewStaff({ ...newStaff, shift: text })}
          />
          <View style={styles.formActions}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: isDark ? '#FF453A' : '#FF3B30' }]}
              onPress={() => setShowAddForm(false)}>
              <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: isDark ? '#30D158' : '#34C759' }]}
              onPress={handleAddStaff}>
              <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.staffList}>
        {filteredStaff.map((staff) => (
          <View
            key={staff.id}
            style={[
              styles.staffCard,
              { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' },
            ]}>
            <View style={styles.staffInfo}>
              <Text style={[styles.staffName, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                {staff.name}
              </Text>
              <Text style={[styles.staffDetails, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                {staff.role} • {staff.department}
              </Text>
              <Text style={[styles.staffContact, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                {staff.email} • {staff.phone}
              </Text>
              <Text style={[styles.staffShift, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                Shift: {staff.shift}
              </Text>
            </View>
            <View style={styles.staffActions}>
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
  staffList: {
    padding: 20,
  },
  staffCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  staffInfo: {
    flex: 1,
  },
  staffName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  staffDetails: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  staffContact: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  staffShift: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  staffActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionButton: {
    padding: 8,
  },
});