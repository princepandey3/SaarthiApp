import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {
  Users,
  Heart,
  Home,
  FileText,
  BarChart3,
  User,
} from 'lucide-react-native';
import { router } from 'expo-router';

interface ReportOption {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  backgroundColor: string;
}

const REPORT_OPTIONS: ReportOption[] = [
  {
    id: 'user-farm',
    title: 'Report User or Farm',
    subtitle: 'Report misconduct or issues.',
    icon: <Users size={24} color="#22c55e" />,
    backgroundColor: '#dcfce7',
  },
  {
    id: 'animal',
    title: 'Report Animal',
    subtitle: 'Report a sick or missing animal.',
    icon: <Heart size={24} color="#22c55e" />,
    backgroundColor: '#dcfce7',
  },
];

export default function ReportScreen() {
  const handleReportPress = (option: ReportOption) => {
    Alert.alert('Report', `Opening ${option.title}`);
  };

  const handleBottomNavigation = (tab: string) => {
    if (tab === 'Home') {
      router.replace('/vet-dashboard');
    } else if (tab === 'Prescription') {
      router.push('/prescription');
    } else if (tab === 'Report') {
      // Already on report screen
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
        <Text style={styles.headerTitle}>Report</Text>
      </View>

      <View style={styles.content}>
        {/* Report Options */}
        <View style={styles.optionsContainer}>
          {REPORT_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionCard}
              onPress={() => handleReportPress(option)}
            >
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
            </TouchableOpacity>
          ))}
        </View>
      </View>

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
          style={styles.bottomNavItem}
          onPress={() => handleBottomNavigation('Prescription')}
        >
          <FileText size={20} color="#6b7280" />
          <Text style={styles.bottomNavText}>Prescription</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bottomNavItem, styles.bottomNavItemActive]}
          onPress={() => handleBottomNavigation('Report')}
        >
          <BarChart3 size={20} color="#22c55e" />
          <Text style={[styles.bottomNavText, styles.bottomNavTextActive]}>
            Report
          </Text>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  optionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
    lineHeight: 20,
  },
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
  },
  bottomNavItemActive: {
    // Active icon handled via color
  },
  bottomNavText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    fontWeight: '500',
  },
  bottomNavTextActive: {
    color: '#22c55e',
    fontWeight: '600',
  },
});
