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
import { BookOpen, Plus, Search, Trash2, SquarePen as PenSquare, Upload, Video, FileText, Users } from 'lucide-react-native';
import * as DocumentPicker from 'expo-document-picker';

interface Course {
  id: string;
  title: string;
  description: string;
  department: string;
  instructor: string;
  duration: string;
  enrolledStudents: number;
  materials: CourseMaterial[];
}

interface CourseMaterial {
  id: string;
  type: 'video' | 'document' | 'note';
  title: string;
  description: string;
  url: string;
  uploadedAt: string;
}

export default function CourseManagementScreen() {
  const { isDark } = useTheme();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showMaterialForm, setShowMaterialForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    department: '',
    instructor: '',
    duration: '',
  });
  const [newMaterial, setNewMaterial] = useState({
    type: 'document' as 'video' | 'document' | 'note',
    title: '',
    description: '',
  });

  const handleAddCourse = () => {
    const course: Course = {
      id: Math.random().toString(36).substr(2, 9),
      ...newCourse,
      enrolledStudents: 0,
      materials: [],
    };
    setCourses([...courses, course]);
    setNewCourse({
      title: '',
      description: '',
      department: '',
      instructor: '',
      duration: '',
    });
    setShowAddForm(false);
  };

  const handleUploadMaterial = async () => {
    if (!selectedCourse) return;

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: false,
      });

      if (result.assets && result.assets[0]) {
        const asset = result.assets[0];
        const material: CourseMaterial = {
          id: Math.random().toString(36).substr(2, 9),
          ...newMaterial,
          url: asset.uri,
          uploadedAt: new Date().toISOString(),
        };

        setCourses(courses.map(course =>
          course.id === selectedCourse.id
            ? { ...course, materials: [...course.materials, material] }
            : course
        ));

        setNewMaterial({
          type: 'document',
          title: '',
          description: '',
        });
        setShowMaterialForm(false);
      }
    } catch (error) {
      console.error('Error uploading material:', error);
    }
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F2F2F7' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          Course Management
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}
          onPress={() => setShowAddForm(true)}>
          <Plus size={20} color={isDark ? '#0A84FF' : '#007AFF'} />
          <Text style={[styles.buttonText, { color: isDark ? '#0A84FF' : '#007AFF' }]}>
            Create Course
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
          placeholder="Search courses..."
          placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {showAddForm && (
        <View style={[styles.formContainer, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}>
          <Text style={[styles.formTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
            Create New Course
          </Text>
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Course Title"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newCourse.title}
            onChangeText={(text) => setNewCourse({ ...newCourse, title: text })}
          />
          <TextInput
            style={[styles.input, styles.textArea, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Description"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newCourse.description}
            onChangeText={(text) => setNewCourse({ ...newCourse, description: text })}
            multiline
            numberOfLines={4}
          />
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Department"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newCourse.department}
            onChangeText={(text) => setNewCourse({ ...newCourse, department: text })}
          />
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Instructor"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newCourse.instructor}
            onChangeText={(text) => setNewCourse({ ...newCourse, instructor: text })}
          />
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Duration (e.g., 12 weeks)"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newCourse.duration}
            onChangeText={(text) => setNewCourse({ ...newCourse, duration: text })}
          />
          <View style={styles.formActions}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: isDark ? '#FF453A' : '#FF3B30' }]}
              onPress={() => setShowAddForm(false)}>
              <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: isDark ? '#30D158' : '#34C759' }]}
              onPress={handleAddCourse}>
              <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {showMaterialForm && selectedCourse && (
        <View style={[styles.formContainer, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]}>
          <Text style={[styles.formTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
            Add Course Material
          </Text>
          <View style={styles.materialTypeSelector}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                {
                  backgroundColor:
                    newMaterial.type === 'video'
                      ? isDark
                        ? '#0A84FF'
                        : '#007AFF'
                      : isDark
                      ? '#2C2C2E'
                      : '#F2F2F7',
                },
              ]}
              onPress={() => setNewMaterial({ ...newMaterial, type: 'video' })}>
              <Video
                size={20}
                color={newMaterial.type === 'video' ? '#FFFFFF' : isDark ? '#FFFFFF' : '#000000'}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  {
                    color:
                      newMaterial.type === 'video'
                        ? '#FFFFFF'
                        : isDark
                        ? '#FFFFFF'
                        : '#000000',
                  },
                ]}>
                Video
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                {
                  backgroundColor:
                    newMaterial.type === 'document'
                      ? isDark
                        ? '#0A84FF'
                        : '#007AFF'
                      : isDark
                      ? '#2C2C2E'
                      : '#F2F2F7',
                },
              ]}
              onPress={() => setNewMaterial({ ...newMaterial, type: 'document' })}>
              <FileText
                size={20}
                color={newMaterial.type === 'document' ? '#FFFFFF' : isDark ? '#FFFFFF' : '#000000'}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  {
                    color:
                      newMaterial.type === 'document'
                        ? '#FFFFFF'
                        : isDark
                        ? '#FFFFFF'
                        : '#000000',
                  },
                ]}>
                Document
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                {
                  backgroundColor:
                    newMaterial.type === 'note'
                      ? isDark
                        ? '#0A84FF'
                        : '#007AFF'
                      : isDark
                      ? '#2C2C2E'
                      : '#F2F2F7',
                },
              ]}
              onPress={() => setNewMaterial({ ...newMaterial, type: 'note' })}>
              <BookOpen
                size={20}
                color={newMaterial.type === 'note' ? '#FFFFFF' : isDark ? '#FFFFFF' : '#000000'}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  {
                    color:
                      newMaterial.type === 'note'
                        ? '#FFFFFF'
                        : isDark
                        ? '#FFFFFF'
                        : '#000000',
                  },
                ]}>
                Note
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={[styles.input, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Title"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newMaterial.title}
            onChangeText={(text) => setNewMaterial({ ...newMaterial, title: text })}
          />
          <TextInput
            style={[styles.input, styles.textArea, { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7', color: isDark ? '#FFFFFF' : '#000000' }]}
            placeholder="Description"
            placeholderTextColor={isDark ? '#8E8E93' : '#8E8E93'}
            value={newMaterial.description}
            onChangeText={(text) => setNewMaterial({ ...newMaterial, description: text })}
            multiline
            numberOfLines={4}
          />
          <TouchableOpacity
            style={[
              styles.uploadButton,
              { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7' },
            ]}
            onPress={handleUploadMaterial}>
            <Upload size={24} color={isDark ? '#0A84FF' : '#007AFF'} />
            <Text style={[styles.uploadText, { color: isDark ? '#0A84FF' : '#007AFF' }]}>
              Upload {newMaterial.type === 'video' ? 'Video' : newMaterial.type === 'document' ? 'Document' : 'Note'}
            </Text>
          </TouchableOpacity>
          <View style={styles.formActions}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: isDark ? '#FF453A' : '#FF3B30' }]}
              onPress={() => {
                setShowMaterialForm(false);
                setSelectedCourse(null);
              }}>
              <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: isDark ? '#30D158' : '#34C759' }]}
              onPress={handleUploadMaterial}>
              <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Upload</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.coursesList}>
        {filteredCourses.map((course) => (
          <View
            key={course.id}
            style={[
              styles.courseCard,
              { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' },
            ]}>
            <View style={styles.courseHeader}>
              <View style={styles.courseInfo}>
                <BookOpen size={20} color={isDark ? '#0A84FF' : '#007AFF'} />
                <Text style={[styles.courseTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                  {course.title}
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.addMaterialButton,
                  { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7' },
                ]}
                onPress={() => {
                  setSelectedCourse(course);
                  setShowMaterialForm(true);
                }}>
                <Plus size={16} color={isDark ? '#0A84FF' : '#007AFF'} />
                <Text style={[styles.addMaterialText, { color: isDark ? '#0A84FF' : '#007AFF' }]}>
                  Add Material
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.courseDescription, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
              {course.description}
            </Text>

            <View style={styles.courseDetails}>
              <View style={styles.detailItem}>
                <Users size={16} color={isDark ? '#8E8E93' : '#6B7280'} />
                <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                  {course.enrolledStudents} Students
                </Text>
              </View>
              <Text style={[styles.detailText, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                {course.duration}
              </Text>
            </View>

            {course.materials.length > 0 && (
              <View style={styles.materialsList}>
                <Text style={[styles.materialsTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                  Course Materials
                </Text>
                {course.materials.map((material) => (
                  <View
                    key={material.id}
                    style={[
                      styles.materialItem,
                      { backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7' },
                    ]}>
                    {material.type === 'video' ? (
                      <Video size={16} color={isDark ? '#0A84FF' : '#007AFF'} />
                    ) : material.type === 'document' ? (
                      <FileText size={16} color={isDark ? '#0A84FF' : '#007AFF'} />
                    ) : (
                      <BookOpen size={16} color={isDark ? '#0A84FF' : '#007AFF'} />
                    )}
                    <View style={styles.materialInfo}>
                      <Text style={[styles.materialTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                        {material.title}
                      </Text>
                      <Text
                        style={[styles.materialDescription, { color: isDark ? '#8E8E93' : '#6B7280' }]}>
                        {material.description}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            <View style={styles.courseActions}>
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
  materialTypeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  typeButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    marginLeft: 8,
  },
  uploadButton: {
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
  coursesList: {
    padding: 20,
  },
  courseCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  courseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  addMaterialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    gap: 4,
  },
  addMaterialText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  courseDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 12,
  },
  courseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
  materialsList: {
    marginTop: 16,
  },
  materialsTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 12,
  },
  materialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  materialInfo: {
    marginLeft: 12,
    flex: 1,
  },
  materialTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  materialDescription: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  courseActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 16,
  },
  actionButton: {
    padding: 8,
  },
});