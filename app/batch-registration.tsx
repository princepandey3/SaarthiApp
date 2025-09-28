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
  ArrowLeft,
  Bell,
  Search,
  ArrowRight,
  Home,
  FileText,
  BarChart3,
  User,
} from 'lucide-react-native';
import { router } from 'expo-router';

export default function BatchRegistration() {
  const [searchBy, setSearchBy] = useState<'owner' | 'farm'>('owner');
  const [searchQuery, setSearchQuery] = useState('');
  const [ownerDetails, setOwnerDetails] = useState<any | null>(null);

  // Dummy Owners
  const dummyOwners = [
    {
      ownerId: 'OWN001',
      name: 'Ramesh Yadav',
      contact: '+91 9876543210',
      address: '#123, 4th Main, 5th Cross, HSR Layout, Bangalore - 560102',
      totalAnimals: '50',
      batches: '5',
    },
    {
      ownerId: 'OWN002',
      name: 'Sita Sharma',
      contact: '+91 9123456780',
      address: 'Near Market Road, Jaipur - 302001',
      totalAnimals: '30',
      batches: '3',
    },
  ];

  // Dummy Farms
  const dummyFarms = [
    {
      farmId: 'FARM001',
      name: 'Green Valley Dairy',
      contact: '+91 9812345678',
      address: 'Village Road, Pune - 411001',
      totalAnimals: '100',
      batches: '10',
    },
    {
      farmId: 'FARM002',
      name: 'Happy Cow Farm',
      contact: '+91 9001234567',
      address: 'NH44, Hyderabad - 500001',
      totalAnimals: '70',
      batches: '7',
    },
  ];

  const handleBack = () => {
    router.back();
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      Alert.alert(
        'Search',
        `Please enter ${searchBy === 'owner' ? 'Owner ID' : 'Farm ID'}`
      );
      return;
    }

    let result = null;
    if (searchBy === 'owner') {
      result = dummyOwners.find((o) => o.ownerId === searchQuery.trim());
    } else {
      result = dummyFarms.find((f) => f.farmId === searchQuery.trim());
    }

    if (result) {
      setOwnerDetails(result);
    } else {
      setOwnerDetails(null);
      Alert.alert(
        'Not Found',
        `${searchBy === 'owner' ? 'Owner' : 'Farm'} not found`
      );
    }
  };

  const handleNext = () => {
    router.push('/registered-batches');
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
        <Text style={styles.headerTitle}>Batch Registration</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color="#374151" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Search By Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Search by:</Text>
          <View style={styles.searchByContainer}>
            <TouchableOpacity
              style={[
                styles.searchByButton,
                searchBy === 'owner' && styles.searchByButtonActive,
              ]}
              onPress={() => setSearchBy('owner')}
            >
              <Text
                style={[
                  styles.searchByButtonText,
                  searchBy === 'owner' && styles.searchByButtonTextActive,
                ]}
              >
                Owner ID
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.searchByButton,
                searchBy === 'farm' && styles.searchByButtonActive,
              ]}
              onPress={() => setSearchBy('farm')}
            >
              <Text
                style={[
                  styles.searchByButtonText,
                  searchBy === 'farm' && styles.searchByButtonTextActive,
                ]}
              >
                Farm ID
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color="#6b7280" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder={`Enter ${
                searchBy === 'owner' ? 'Owner ID' : 'Farm ID'
              }`}
              placeholderTextColor="#9ca3af"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
          </View>
        </View>

        {/* Details Section */}
        {ownerDetails && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {searchBy === 'owner' ? 'Owner Details' : 'Farm Details'}
            </Text>
            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>
                    {searchBy === 'owner' ? 'Owner Name' : 'Farm Name'}
                  </Text>
                  <Text style={styles.detailValue}>{ownerDetails.name}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Contact Number</Text>
                  <Text style={styles.detailValue}>{ownerDetails.contact}</Text>
                </View>
              </View>

              <View style={styles.addressContainer}>
                <Text style={styles.detailLabel}>Address</Text>
                <Text style={styles.detailValue}>{ownerDetails.address}</Text>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Total Animals</Text>
                  <Text style={styles.detailValue}>
                    {ownerDetails.totalAnimals}
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Batches</Text>
                  <Text style={styles.detailValue}>{ownerDetails.batches}</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
          <ArrowRight size={20} color="white" />
        </TouchableOpacity>
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
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  notificationButton: {
    position: 'relative',
    padding: 10,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    backgroundColor: '#ef4444',
    borderRadius: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  searchByContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  searchByButton: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchByButtonActive: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  searchByButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  searchByButtonTextActive: {
    color: 'white',
  },
  searchContainer: {
    marginBottom: 32,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    height: 50,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  detailsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    flex: 1,
    marginRight: 12,
  },
  addressContainer: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    lineHeight: 22,
  },
  nextButton: {
    backgroundColor: '#22c55e',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 24,
    alignSelf: 'flex-end',
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingVertical: 10,
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
  },
});
