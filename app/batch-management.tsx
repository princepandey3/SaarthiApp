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
  ArrowLeft,
  Bell,
  Grid3X3,
  CreditCard,
  Search,
  ChevronRight,
  Home,
  FileText,
  BarChart3,
  User,
} from 'lucide-react-native';
import { router } from 'expo-router';

interface ManagementOption {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  backgroundColor: string;
}

const MANAGEMENT_OPTIONS: ManagementOption[] = [
  {
    id: 'registrations',
    title: 'Batch Registrations',
    subtitle: 'Register new batches of animals',
    icon: <Grid3X3 size={24} color="#22c55e" />,
    backgroundColor: '#dcfce7',
  },
  {
    id: 'ear-tag',
    title: 'Ear Tag Change',
    subtitle: 'Update ear tag information for a batch',
    icon: <CreditCard size={24} color="#22c55e" />,
    backgroundColor: '#dcfce7',
  },
  {
    id: 'search-modify',
    title: 'Search & Modify Batch',
    subtitle: 'Find and edit existing batch details',
    icon: <Search size={24} color="#22c55e" />,
    backgroundColor: '#dcfce7',
  },
];

export default function BatchManagement() {
  const handleBack = () => {
    router.back();
  };

  const handleOptionPress = (option: ManagementOption) => {
    if (option.id === 'registrations') {
      router.push('/batch-registration');
    } else {
      Alert.alert('Batch Management', `Opening ${option.title}`);
    }
  };

  const handleBottomNavigation = (tab: string) => {
    if (tab === 'Home') {
      router.replace('/vet-dashboard');
    } else if (tab === 'Prescription') {
      router.push('/prescription');
    } else if (tab === 'Report') {
      router.push('/report');
    } else if (tab === 'Profile') {
      router.push('/profile');
    } else {
      Alert.alert('Navigation', `Opening ${tab} tab`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Batch Management</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color="#374151" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Management Options */}
        <View style={styles.optionsContainer}>
          {MANAGEMENT_OPTIONS.map((option, index) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionItem,
                index === MANAGEMENT_OPTIONS.length - 1 &&
                  styles.lastOptionItem,
              ]}
              onPress={() => handleOptionPress(option)}
            >
              <View style={styles.optionLeft}>
                <View
                  style={[
                    styles.optionIcon,
                    { backgroundColor: option.backgroundColor },
                  ]}
                >
                  {option.icon}
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                </View>
              </View>
              <ChevronRight size={20} color="#9ca3af" />
            </TouchableOpacity>
          ))}
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
          onPress={() => handleBottomNavigation('Prescription')}
        >
          <FileText size={20} color="#6b7280" />
          <Text style={styles.bottomNavText}>Prescription</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={() => handleBottomNavigation('Report')}
        >
          <BarChart3 size={20} color="#6b7280" />
          <Text style={styles.bottomNavText}>Report</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={() => handleBottomNavigation('Profile')}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 10,
    height: 10,
    backgroundColor: '#ef4444',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  optionsContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 120, // space for bottom nav
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  lastOptionItem: {
    borderBottomWidth: 0,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 18,
  },
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  bottomNavItemActive: {},
  bottomNavText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  bottomNavTextActive: {
    color: '#22c55e',
    fontWeight: '600',
  },
});
