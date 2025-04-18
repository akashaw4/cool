import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Plus, Search, Users, Calendar as CalendarIcon, Clock, CircleCheck as CheckCircle2, Circle as XCircle } from 'lucide-react-native';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  department: string;
  year: string;
}

interface AttendanceRecord {
  id: string;
  type: 'class' | 'event' | 'activity';
  title: string;
  date: string;
  time: string;
  subject?: string;
  event?: string;
  activity?: string;
  students: {
    studentId: string;
    status: 'present' | 'absent';
  }[];
}

const STUDENTS: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    rollNumber: 'CS2021001',
    department: 'Computer Science',
    year: '3rd',
  },
  {
    id: '2',
    name: 'Jane Smith',
    rollNumber: 'CS2021002',
    department: 'Computer Science',
    year: '3rd',
  },
  // Add more students as needed
];

export default function TeacherAttendanceScreen() {
  const { isDark } = useTheme();
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [selectedType, setSelectedType] = useState<'class' | 'event' | 'activity'>('class');
  const [newAttendance, setNewAttendance] = useState({
    title: '',
    date: '',
    time: '',
    subject: '',
    event: '',
    activity: '',
  });
  const [studentAttendance, setStudentAttendance] = useState<Record<string, boolean>>({});

  const handleAddAttendance = () => {
    const record: AttendanceRecord = {
      id: Math.random().toString(36).substr(2, 9),
      type: selectedType,
      title: newAttendance.title,
      date: newAttendance.date,
      time: newAttendance.time,
      subject: selectedType === 'class' ? newAttendance.subject : undefined,
      event: selectedType === 'event' ? newAttendance.event : undefined,
      activity: selectedType === 'activity' ? newAttendance.activity : undefined,
      students: Object.entries(studentAttendance).map(([studentId, isPresent]) => ({
        studentId,
        status: isPresent ? 'present' : 'absent',
      })),
    };

    setAttendanceRecords([...attendanceRecords, record]);
    setNewAttendance({
      title: '',
      date: '',
      time: '',
      subject: '',
      event: '',
      activity: '',
    });
    setStudentAttendance({});
    setShowAddForm(false);
  };

  const filteredStudents = STUDENTS.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F2F2F7' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          Attendance Management
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}
          onPress={() => setShowAddForm(true)}>
          <Plus size={20} color={isDark ? '#0A84FF' : '#007AFF'} />
          <Text style={[styles.buttonText, { color: isDark ? '#0A84FF' : '#007AFF' }]}>
            Take Attendance
          </Text>
        </TouchableOpacity>
      </View>

      {showAddForm && (
        <View style={[styles.formContainer, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}>
          <Text style={[styles.formTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
            Take New Attendance
          </Text>

          <View style={styles.typeSelector}>
            {(['class', 'event', 'activity'] as const).map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeButton,
                  {
                    backgroundColor:
                      selectedType === type
                        ? isDark
                          ? '#0A84FF'
                          : '#007AFF'
                        : isDark
                        ? '#2C2C2E'
                        : '#F2F2F7',
                  },
                ]}
                onPress={() => setSelectedType(type)}>
                <Text
                  style={[
                    styles.typeButtonText,
                    {
                      color:
                        selectedType === type
                          ? '#FFFFFF'
                          : isDark
                          ? '#FFFFFF'
                          : '#000000',
                    },
                  ]}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Title"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newAttendance.title}
            onChangeText={(text) => setNewAttendance({ ...newAttendance, title: text })}
          />

          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Date (YYYY-MM-DD)"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newAttendance.date}
            onChangeText={(text) => setNewAttendance({ ...newAttendance, date: text })}
          />

          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Time (HH:MM)"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newAttendance.time}
            onChangeText={(text) => setNewAttendance({ ...newAttendance, time: text })}
          />

          {selectedType === 'class' && (
            <TextInput
              style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
              placeholder="Subject"
              placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
              value={newAttendance.subject}
              onChangeText={(text) => setNewAttendance({ ...newAttendance, subject: text })}
            />
          )}

          {selectedType === 'event' && (
            <TextInput
              style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
              placeholder="Event Name"
              placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
              value={newAttendance.event}
              onChangeText={(text) => setNewAttendance({ ...newAttendance, event: text })}
            />
          )}

          {selectedType === 'activity' && (
            <TextInput
              style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
              placeholder="Activity Name"
              placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
              value={newAttendance.activity}
              onChangeText={(text) => setNewAttendance({ ...newAttendance, activity: text })}
            />
          )}

          <View
            style={[
              styles.searchContainer,
              { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7' },
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

          <View style={styles.studentList}>
            {filteredStudents.map((student) => (
              <View
                key={student.id}
                style={[
                  styles.studentItem,
                  { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7' },
                ]}>
                <View style={styles.studentInfo}>
                  <Text style={[styles.studentName, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                    {student.name}
                  </Text>
                  <Text style={[styles.studentDetails, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                    {student.rollNumber} • {student.department}
                  </Text>
                </View>
                <Switch
                  value={studentAttendance[student.id] || false}
                  onValueChange={(value) =>
                    setStudentAttendance({ ...studentAttendance, [student.id]: value })
                  }
                />
              </View>
            ))}
          </View>

          <View style={styles.formActions}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: isDark ? '#FF453A' : '#FF3B30' }]}
              onPress={() => setShowAddForm(false)}>
              <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: isDark ? '#30D158' : '#34C759' }]}
              onPress={handleAddAttendance}>
              <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.attendanceList}>
        {attendanceRecords.map((record) => (
          <View
            key={record.id}
            style={[
              styles.attendanceCard,
              { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' },
            ]}>
            <View style={styles.attendanceHeader}>
              <Text style={[styles.attendanceTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                {record.title}
              </Text>
              <View
                style={[
                  styles.typeBadge,
                  {
                    backgroundColor:
                      record.type === 'class'
                        ? isDark
                          ? '#FF9F0A'
                          : '#FF9500'
                        : record.type === 'event'
                        ? isDark
                          ? '#30D158'
                          : '#34C759'
                        : isDark
                        ? '#0A84FF'
                        : '#007AFF',
                  },
                ]}>
                <Text style={styles.typeBadgeText}>
                  {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                </Text>
              </View>
            </View>

            <View style={styles.attendanceDetails}>
              <View style={styles.detailItem}>
                <CalendarIcon size={16} color={isDark ? '#8E8E93' : '#6B7280'} />
                <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                  {record.date}
                </Text>
              </View>
              
              <View style={styles.detailItem}>
                <Clock size={16} color={isDark ? '#8E8E93' : '#6B7280'} />
                <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                  {record.time}
                </Text>
              </View>

              <View style={styles.detailItem}>
                <Users size={16} color={isDark ? '#8E8E93' : '#6B7280'} />
                <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                  {record.students.filter((s) => s.status === 'present').length} Present •{' '}
                  {record.students.filter((s) => s.status === 'absent').length} Absent
                </Text>
              </View>
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
  typeSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  typeButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  input: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  studentList: {
    gap: 8,
    marginBottom: 16,
  },
  studentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
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
    marginTop: 2,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 16,
  },
  attendanceList: {
    padding: 20,
  },
  attendanceCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  attendanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  attendanceTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    flex: 1,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  attendanceDetails: {
    gap: 8,
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
});