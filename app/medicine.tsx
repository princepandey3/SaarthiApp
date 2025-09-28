import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Menu,
  Bell,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Check,
  Home,
  Pill,
  Stethoscope,
  BookOpen,
  User,
} from 'lucide-react-native';
import { router } from 'expo-router';

interface MedicineItem {
  id: string;
  animalId?: string;
  batchId?: string;
  medicineName: string;
  dueDate: string;
  completed: boolean;
}

const DUMMY_MEDICINES: MedicineItem[] = [
  {
    id: '1',
    animalId: 'A-123',
    medicineName: 'Ivermectin for Scabies',
    dueDate: 'Oct 18, 2023',
    completed: false,
  },
  {
    id: '2',
    batchId: 'B-456',
    medicineName: 'Albendazole for Worms',
    dueDate: 'Oct 18, 2023',
    completed: false,
  },
];

const UPCOMING_MEDICINES: MedicineItem[] = [
  {
    id: '3',
    animalId: 'A-789',
    medicineName: 'Vaccination Booster',
    dueDate: 'Oct 20, 2023',
    completed: false,
  },
  {
    id: '4',
    batchId: 'B-321',
    medicineName: 'Deworming Treatment',
    dueDate: 'Oct 22, 2023',
    completed: false,
  },
  {
    id: '5',
    animalId: 'A-456',
    medicineName: 'Antibiotic Course',
    dueDate: 'Oct 25, 2023',
    completed: false,
  },
  {
    id: '6',
    batchId: 'B-789',
    medicineName: 'Vitamin Supplement',
    dueDate: 'Oct 28, 2023',
    completed: false,
  },
];

const CALENDAR_DATA = {
  currentMonth: 'October 2023',
  selectedDate: 18,
  todayDate: 18,
  daysWithMedicine: [4, 18, 29], // Days that have medicine scheduled
};

export default function MedicineScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'Today' | 'Upcoming'>('Today');
  const [medicines, setMedicines] = useState<MedicineItem[]>(DUMMY_MEDICINES);

  const handleMenuPress = () => {
    Alert.alert('Menu', 'Opening menu');
  };

  const handleNotificationPress = () => {
    Alert.alert('Notifications', 'Opening notifications');
  };

  const handlePreviousMonth = () => {
    Alert.alert('Calendar', 'Previous month');
  };

  const handleNextMonth = () => {
    Alert.alert('Calendar', 'Next month');
  };

  const handleDatePress = (date: number) => {
    Alert.alert('Date Selected', `Selected date: ${date}`);
  };

  const handleTabPress = (tab: 'Today' | 'Upcoming') => {
    setActiveTab(tab);
  };

  const handleFilterPress = () => {
    Alert.alert('Filter', 'Opening filter options');
  };

  const handleMedicineComplete = (medicineId: string) => {
    setMedicines((prev) =>
      prev.map((med) =>
        med.id === medicineId ? { ...med, completed: !med.completed } : med
      )
    );
  };

  const handleBottomNavigation = (tab: string) => {
    if (tab === 'Home') {
      try {
        router.replace('/farmer-dashboard');
      } catch (error) {
        console.error('Navigation error:', error);
      }
    } else if (tab === 'Medicine') {
      // Already on medicine screen
    } else if (tab === 'Animal') {
      try {
        router.push('/animals');
      } catch (error) {
        console.error('Navigation error:', error);
      }
    } else if (tab === 'Learn') {
      try {
        router.push('/learn');
      } catch (error) {
        console.error('Navigation error:', error);
      }
    } else if (tab === 'User') {
      try {
        router.push('/user-profile');
      } catch (error) {
        console.error('Navigation error:', error);
      }
    }
  };

  const renderCalendar = () => {
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
    const startPadding = Array.from({ length: 6 }, (_, i) => 24 + i); // Previous month days

    return (
      <View style={styles.calendarContainer}>
        {/* Calendar Header */}
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={handlePreviousMonth}>
            <ChevronLeft size={20} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.monthText}>{CALENDAR_DATA.currentMonth}</Text>
          <TouchableOpacity onPress={handleNextMonth}>
            <ChevronRight size={20} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Days of Week */}
        <View style={styles.daysOfWeekContainer}>
          {daysOfWeek.map((day, index) => (
            <Text key={index} style={styles.dayOfWeekText}>
              {day}
            </Text>
          ))}
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendarGrid}>
          {/* Previous month padding */}
          {startPadding.map((date, index) => (
            <TouchableOpacity key={`prev-${index}`} style={styles.calendarDay}>
              <Text style={styles.calendarDayTextInactive}>{date}</Text>
            </TouchableOpacity>
          ))}

          {/* Current month days */}
          {daysInMonth.map((date) => {
            const isSelected = date === CALENDAR_DATA.selectedDate;
            const isToday = date === CALENDAR_DATA.todayDate;
            const hasMedicine = CALENDAR_DATA.daysWithMedicine.includes(date);

            return (
              <TouchableOpacity
                key={date}
                style={[
                  styles.calendarDay,
                  isSelected && styles.calendarDaySelected,
                ]}
                onPress={() => handleDatePress(date)}
              >
                <Text
                  style={[
                    styles.calendarDayText,
                    isSelected && styles.calendarDayTextSelected,
                  ]}
                >
                  {date}
                </Text>
                {hasMedicine && !isSelected && (
                  <View style={styles.medicineDot} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const renderMedicineItem = (medicine: MedicineItem) => {
    const isCompleted = medicine.completed;

    return (
      <View key={medicine.id} style={styles.medicineItem}>
        <View style={styles.medicineContent}>
          <Text style={styles.medicineId}>
            {medicine.animalId
              ? `Animal ID: ${medicine.animalId}`
              : `Batch ID: ${medicine.batchId}`}
          </Text>
          <Text style={styles.medicineName}>{medicine.medicineName}</Text>
          <Text style={styles.medicineDue}>Due: {medicine.dueDate}</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.completeButton,
            isCompleted
              ? styles.completeButtonCompleted
              : styles.completeButtonInactive,
          ]}
          onPress={() => handleMedicineComplete(medicine.id)}
        >
          <Check size={20} color={isCompleted ? 'white' : '#9ca3af'} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleMenuPress}>
          <Menu size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medicine</Text>
        <TouchableOpacity onPress={handleNotificationPress}>
          <Bell size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Calendar */}
        {renderCalendar()}

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'Today' && styles.tabButtonActive,
            ]}
            onPress={() => handleTabPress('Today')}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === 'Today' && styles.tabButtonTextActive,
              ]}
            >
              Today
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'Upcoming' && styles.tabButtonActive,
            ]}
            onPress={() => handleTabPress('Upcoming')}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === 'Upcoming' && styles.tabButtonTextActive,
              ]}
            >
              Upcoming
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color="#9ca3af" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Animal or Batch ID"
              placeholderTextColor="#9ca3af"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={handleFilterPress}
          >
            <Filter size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Medicine List */}
        <View style={styles.medicineList}>
          {activeTab === 'Today'
            ? medicines.map(renderMedicineItem)
            : UPCOMING_MEDICINES.map(renderMedicineItem)}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={() => handleBottomNavigation('Home')}
        >
          <Home size={20} color="#6b7280" />
          <Text style={styles.bottomNavText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bottomNavItem, styles.bottomNavItemActive]}
          onPress={() => handleBottomNavigation('Medicine')}
        >
          <Pill size={20} color="#22c55e" />
          <Text style={[styles.bottomNavText, styles.bottomNavTextActive]}>
            Medicine
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={() => handleBottomNavigation('Animal')}
        >
          <Stethoscope size={20} color="#6b7280" />
          <Text style={styles.bottomNavText}>Animal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={() => handleBottomNavigation('Learn')}
        >
          <BookOpen size={20} color="#6b7280" />
          <Text style={styles.bottomNavText}>Learn</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={() => handleBottomNavigation('User')}
        >
          <User size={20} color="#6b7280" />
          <Text style={styles.bottomNavText}>User</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },

  /* CONTENT */
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  /* CALENDAR */
  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  daysOfWeekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  dayOfWeekText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    width: 32,
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 20,
  },
  calendarDaySelected: {
    backgroundColor: '#22c55e',
    borderRadius: 20,
  },
  calendarDayText: {
    fontSize: 15,
    color: '#374151',
  },
  calendarDayTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  calendarDayTextInactive: {
    fontSize: 15,
    color: '#d1d5db',
  },
  medicineDot: {
    position: 'absolute',
    bottom: 6,
    width: 5,
    height: 5,
    backgroundColor: '#22c55e',
    borderRadius: 2.5,
  },

  /* TABS */
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 25,
    padding: 4,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 21,
  },
  tabButtonActive: {
    backgroundColor: '#22c55e',
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280',
  },
  tabButtonTextActive: {
    color: 'white',
    fontWeight: '600',
  },

  /* SEARCH */
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  /* MEDICINE LIST */
  medicineList: {
    marginBottom: 100,
  },
  completeButtonInactive: {
    backgroundColor: '#d1d5db', // light grey background
  },

  medicineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  medicineContent: {
    flex: 1,
    marginRight: 12,
  },
  medicineId: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 2,
  },
  medicineName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  medicineDue: {
    fontSize: 13,
    color: '#6b7280',
  },
  completeButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#22c55e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeButtonCompleted: {
    backgroundColor: '#16a34a',
  },

  /* BOTTOM NAV */
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    gap: 2,
    borderRadius: 10,
  },
  bottomNavItemActive: {
    backgroundColor: '#f0fdf4',
  },
  bottomNavText: {
    fontSize: 12,
    color: '#6b7280',
  },
  bottomNavTextActive: {
    color: '#22c55e',
    fontWeight: '600',
  },
});
