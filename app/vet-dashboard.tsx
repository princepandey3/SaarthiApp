import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import {
  Search,
  QrCode,
  Bell,
  Heart,
  Users,
  Grid3X3,
  Plus,
  Edit3,
  AlertTriangle,
  Home,
  FileText,
  BarChart3,
  User,
} from 'lucide-react-native';
import { router } from 'expo-router';

interface ActivityItem {
  id: string;
  type: 'animal' | 'owner' | 'system';
  title: string;
  subtitle: string;
  time: string;
  icon: 'plus' | 'edit' | 'alert';
}

const DUMMY_ACTIVITIES: ActivityItem[] = [
  {
    id: '1',
    type: 'animal',
    title: 'New animal registered',
    subtitle: 'Animal ID: PAASHU-01234',
    time: '2m ago',
    icon: 'plus',
  },
  {
    id: '2',
    type: 'owner',
    title: 'Owner details updated',
    subtitle: 'Owner ID: JDOE-5678',
    time: '1h ago',
    icon: 'edit',
  },
  {
    id: '3',
    type: 'system',
    title: 'System update',
    subtitle: 'Scheduled maintenance at 2 AM',
    time: '1d ago',
    icon: 'alert',
  },
];

export default function VetDashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      Alert.alert('Search', 'Please enter an Animal ID or Batch ID');
      return;
    }
    Alert.alert('Search', `Searching for: ${searchQuery}`);
  };

  const handleQuickLink = (type: string) => {
    if (type === 'Animal') {
      router.push('/animal-management');
    } else if (type === 'Owner') {
      router.push('/owner-management');
    } else if (type === 'Batch') {
      router.push('/batch-management');
    } else {
      Alert.alert('Quick Link', `Opening ${type} management`);
    }
  };

  const handleActivityPress = (activity: ActivityItem) => {
    Alert.alert('Activity', `${activity.title}\n${activity.subtitle}`);
  };

  const handleBottomNavigation = (tab: string) => {
    if (tab === 'Prescription') {
      router.push('/prescription');
    } else if (tab === 'Report') {
      router.push('/report');
    } else if (tab === 'Profile') {
      router.push('/profile');
    } else {
      Alert.alert('Navigation', `Opening ${tab} tab`);
    }
  };

  const renderActivityIcon = (iconType: string, activityType: string) => {
    const iconColor =
      activityType === 'animal'
        ? '#22c55e'
        : activityType === 'owner'
        ? '#3b82f6'
        : '#f59e0b';

    switch (iconType) {
      case 'plus':
        return <Plus size={20} color={iconColor} />;
      case 'edit':
        return <Edit3 size={20} color={iconColor} />;
      case 'alert':
        return <AlertTriangle size={20} color={iconColor} />;
      default:
        return <Plus size={20} color={iconColor} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/images/logo2.png')} // <-- your custom logo
          style={styles.headerLogo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>Home</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color="#374151" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Page Title */}
        <Text style={styles.pageTitle}>View Animal Details</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color="#6b7280" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Enter Animal ID/Batch ID"
              placeholderTextColor="#9ca3af"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
          </View>
          <TouchableOpacity
            style={styles.qrButton}
            onPress={() => Alert.alert('QR Scanner', 'Opening QR code scanner')}
          >
            <QrCode size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Statistics Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>1,234</Text>
              <Text style={styles.statLabel}>Total Animal{'\n'}Registered</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>56</Text>
              <Text style={styles.statLabel}>Total Owner{'\n'}Registered</Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>78</Text>
              <Text style={styles.statLabel}>
                Total Active{'\n'}Prescriptions
              </Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>99</Text>
              <Text style={styles.statLabel}>
                Total Completed{'\n'}Prescriptions
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Links */}
        <View style={styles.quickLinksContainer}>
          <Text style={styles.sectionTitle}>Quick Links</Text>
          <View style={styles.quickLinksGrid}>
            <TouchableOpacity
              style={styles.quickLinkItem}
              onPress={() => handleQuickLink('Animal')}
            >
              <View
                style={[styles.quickLinkIcon, { backgroundColor: '#dcfce7' }]}
              >
                <Heart size={24} color="#22c55e" />
              </View>
              <Text style={styles.quickLinkText}>Animal{'\n'}Management</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickLinkItem}
              onPress={() => handleQuickLink('Owner')}
            >
              <View
                style={[styles.quickLinkIcon, { backgroundColor: '#dbeafe' }]}
              >
                <Users size={24} color="#3b82f6" />
              </View>
              <Text style={styles.quickLinkText}>Owner{'\n'}Management</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickLinkItem}
              onPress={() => handleQuickLink('Batch')}
            >
              <View
                style={[styles.quickLinkIcon, { backgroundColor: '#fef3c7' }]}
              >
                <Grid3X3 size={24} color="#f59e0b" />
              </View>
              <Text style={styles.quickLinkText}>Batch{'\n'}Management</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.recentActivityContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {DUMMY_ACTIVITIES.map((activity) => (
            <TouchableOpacity
              key={activity.id}
              style={styles.activityItem}
              onPress={() => handleActivityPress(activity)}
            >
              <View style={styles.activityIconContainer}>
                {renderActivityIcon(activity.icon, activity.type)}
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activitySubtitle}>{activity.subtitle}</Text>
              </View>
              <Text style={styles.activityTime}>{activity.time}</Text>
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

  /** HEADER **/
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerLogo: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
  },
  notificationButton: {
    position: 'relative',
    padding: 6,
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

  /** CONTENT **/
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 16,
  },

  /** SEARCH BAR **/
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 12,
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
    fontSize: 16,
    color: '#374151',
    paddingVertical: 10,
  },
  qrButton: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  /** STAT CARDS **/
  statsContainer: {
    marginBottom: 32,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 16,
  },

  /** QUICK LINKS **/
  quickLinksContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  quickLinksGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickLinkItem: {
    flex: 1,
    alignItems: 'center',
  },
  quickLinkIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  quickLinkText: {
    fontSize: 12,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 16,
  },

  /** RECENT ACTIVITY **/
  recentActivityContainer: {
    marginBottom: 120,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  activityIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  activitySubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  activityTime: {
    fontSize: 10,
    color: '#9ca3af',
    marginLeft: 8,
  },

  /** BOTTOM NAVIGATION **/
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  bottomNavItemActive: {},
  bottomNavText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
    textAlign: 'center',
  },
  bottomNavTextActive: {
    color: '#22c55e',
    fontWeight: '600',
  },
});
