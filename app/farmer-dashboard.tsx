import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import {
  Bell,
  Pill,
  FileText,
  Eye,
  Heart,
  CheckCircle,
  Clock,
  AlertTriangle,
  Home,
  Stethoscope,
  BookOpen,
  User,
} from 'lucide-react-native';
import { router } from 'expo-router';

interface ScheduleItem {
  id: string;
  animalId: string;
  treatment: string;
  time: string;
  type: 'antibiotic' | 'pain';
}

interface ActivityItem {
  id: string;
  type: 'registration' | 'medicine' | 'prescription';
  title: string;
  subtitle: string;
  time: string;
}

const SCHEDULE_ITEMS: ScheduleItem[] = [
  {
    id: '1',
    animalId: '12345',
    treatment: 'Antibiotic Course',
    time: '09:00 AM',
    type: 'antibiotic',
  },
  {
    id: '2',
    animalId: '67890',
    treatment: 'Pain Medication',
    time: '10:00 AM',
    type: 'pain',
  },
];

const ACTIVITY_ITEMS: ActivityItem[] = [
  {
    id: '1',
    type: 'registration',
    title: 'New animal registered',
    subtitle: 'ID 54321',
    time: 'Today, 11:30 AM',
  },
  {
    id: '2',
    type: 'medicine',
    title: 'Medicine given to',
    subtitle: 'ID 12345',
    time: 'Today, 09:05 AM',
  },
  {
    id: '3',
    type: 'prescription',
    title: 'Prescription for',
    subtitle: 'ID 98765 sent for review',
    time: 'Yesterday, 05:30 PM',
  },
];

export default function FarmerDashboard() {
  const handleScheduleItem = (item: ScheduleItem) => {
    Alert.alert(
      'Schedule',
      `${item.treatment} for Animal ID: ${item.animalId} at ${item.time}`
    );
  };

  const handleActivityItem = (item: ActivityItem) => {
    Alert.alert('Activity', `${item.title} ${item.subtitle}`);
  };

  const handleViewAll = (section: string) => {
    if (section === 'Schedule') {
      router.push('/medicine');
    } else {
      Alert.alert('View All', `Opening ${section} section`);
    }
  };

  const handleBottomNavigation = (tab: string) => {
    if (tab === 'Home') {
      // Already on home
    } else if (tab === 'Medicine') {
      try {
        router.push('/medicine');
      } catch (error) {
        console.error('Navigation error:', error);
      }
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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'registration':
        return <Heart size={20} color="#3b82f6" />;
      case 'medicine':
        return <CheckCircle size={20} color="#22c55e" />;
      case 'prescription':
        return <Clock size={20} color="#f59e0b" />;
      default:
        return <Heart size={20} color="#6b7280" />;
    }
  };

  const getActivityIconBackground = (type: string) => {
    switch (type) {
      case 'registration':
        return '#dbeafe';
      case 'medicine':
        return '#dcfce7';
      case 'prescription':
        return '#fef3c7';
      default:
        return '#f3f4f6';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.profilePicture}>
            <Text style={styles.profileInitial}>S</Text>
          </View>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>Mr. Sharma</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color="#374151" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Pill size={20} color="#22c55e" />
            </View>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Medicines{'\n'}Scheduled</Text>
            <Text style={styles.statSubtext}>Today</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <FileText size={20} color="#f59e0b" />
            </View>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Under Review</Text>
            <Text style={styles.statSubtext}>Prescriptions</Text>
          </View>
        </View>

        {/* Today's Schedule */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Schedule</Text>
            <TouchableOpacity onPress={() => handleViewAll('Schedule')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {SCHEDULE_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.scheduleItem}
              onPress={() => handleScheduleItem(item)}
            >
              <View style={styles.scheduleIconContainer}>
                <Pill size={20} color="#22c55e" />
              </View>
              <View style={styles.scheduleContent}>
                <Text style={styles.scheduleAnimalId}>
                  Animal ID: {item.animalId}
                </Text>
                <Text style={styles.scheduleTreatment}>{item.treatment}</Text>
              </View>
              <Text style={styles.scheduleTime}>{item.time}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity onPress={() => handleViewAll('Activity')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {ACTIVITY_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.activityItem}
              onPress={() => handleActivityItem(item)}
            >
              <View
                style={[
                  styles.activityIconContainer,
                  { backgroundColor: getActivityIconBackground(item.type) },
                ]}
              >
                {getActivityIcon(item.type)}
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>
                  {item.title}{' '}
                  <Text style={styles.activitySubtitle}>{item.subtitle}</Text>
                </Text>
                <Text style={styles.activityTime}>{item.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Missed Prescription Alert */}
        <View style={styles.alertContainer}>
          <View style={styles.alertHeader}>
            <Text style={styles.alertTitle}>Missed Prescription</Text>
            <AlertTriangle size={20} color="#ef4444" />
          </View>
          <Text style={styles.alertAnimalId}>Animal ID: 45678</Text>
          <Text style={styles.alertDescription}>
            Deworming - 2 days overdue
          </Text>
          <Text style={styles.alertStatus}>Under vet review</Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={[styles.bottomNavItem, styles.bottomNavItemActive]}
          onPress={() => handleBottomNavigation('Home')}
        >
          <Home size={20} color="#22c55e" />
          <Text style={[styles.bottomNavText, styles.bottomNavTextActive]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={() => handleBottomNavigation('Medicine')}
        >
          <Pill size={20} color="#6b7280" />
          <Text style={styles.bottomNavText}>Medicine</Text>
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
          <Text style={styles.bottomNavText}>Profile</Text>
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
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileInitial: {
    fontSize: 18,
    fontWeight: '700',
    color: '#374151',
  },
  welcomeText: {
    fontSize: 13,
    color: '#6b7280',
  },
  userName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#374151',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    backgroundColor: '#ef4444',
    borderRadius: 4,
  },

  /* CONTENT */
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  /* STATS */
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 28,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#dcfce7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 14,
    color: '#4b5563',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 2,
  },
  statSubtext: {
    fontSize: 12,
    color: '#9ca3af',
  },

  /* SECTIONS */
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  viewAllText: {
    fontSize: 14,
    color: '#22c55e',
    fontWeight: '600',
  },

  /* SCHEDULE */
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
  scheduleIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#dcfce7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  scheduleContent: {
    flex: 1,
  },
  scheduleAnimalId: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  scheduleTreatment: {
    fontSize: 13,
    color: '#6b7280',
  },
  scheduleTime: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },

  /* ACTIVITY */
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
  activityIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  activitySubtitle: {
    fontWeight: '500',
    color: '#374151',
  },
  activityTime: {
    fontSize: 12,
    color: '#6b7280',
  },

  /* ALERT */
  alertContainer: {
    backgroundColor: '#fef2f2',
    borderRadius: 14,
    padding: 16,
    marginBottom: 100,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#dc2626',
  },
  alertAnimalId: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  alertDescription: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 2,
  },
  alertStatus: {
    fontSize: 12,
    color: '#f59e0b',
    fontWeight: '600',
  },

  /* BOTTOM NAVIGATION */
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    gap: 2,
  },
  bottomNavItemActive: {
    backgroundColor: '#f0fdf4',
    borderRadius: 10,
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
