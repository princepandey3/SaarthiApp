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
  FlatList,
} from 'react-native';
import {
  ArrowLeft,
  Bell,
  Search,
  ChevronRight,
  Plus,
  Home,
  FileText,
  BarChart3,
  User,
} from 'lucide-react-native';
import { router } from 'expo-router';

interface BatchItem {
  id: string;
  batchId: string;
  animals: number;
}

const DUMMY_BATCHES: BatchItem[] = [
  { id: '1', batchId: 'B001', animals: 10 },
  { id: '2', batchId: 'B002', animals: 15 },
  { id: '3', batchId: 'B003', animals: 8 },
  { id: '4', batchId: 'B004', animals: 12 },
  { id: '6', batchId: 'B006', animals: 14 },
  { id: '7', batchId: 'B007', animals: 23 },
  { id: '8', batchId: 'B008', animals: 5 },
  { id: '9', batchId: 'B009', animals: 9 },
];

export default function RegisteredBatches() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleBack = () => {
    router.back();
  };

  const handleBatchPress = (batch: BatchItem) => {
    Alert.alert(
      'Batch Details',
      `Batch ID: ${batch.batchId}\nAnimals: ${batch.animals}`
    );
  };

  const handleAddBatch = () => {
    router.push('/batch-registration-form');
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

  const renderBatchItem = ({ item }: { item: BatchItem }) => (
    <TouchableOpacity
      style={styles.batchItem}
      onPress={() => handleBatchPress(item)}
    >
      <View style={styles.batchContent}>
        <View style={styles.batchInfo}>
          <Text style={styles.batchLabel}>Batch ID</Text>
          <Text style={styles.batchId}>{item.batchId}</Text>
        </View>
        <View style={styles.batchInfo}>
          <Text style={styles.batchLabel}>Animals</Text>
          <Text style={styles.animalCount}>{item.animals}</Text>
        </View>
      </View>
      <ChevronRight size={20} color="#22c55e" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Registered Batches</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color="#374151" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color="#9ca3af" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by Batch ID"
              placeholderTextColor="#9ca3af"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Batch List */}
        <FlatList
          data={DUMMY_BATCHES}
          keyExtractor={(item) => item.id}
          renderItem={renderBatchItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.batchList}
        />

        {/* Add Batch Button */}
        <TouchableOpacity
          style={styles.addBatchButton}
          onPress={handleAddBatch}
        >
          <Plus size={20} color="white" />
          <Text style={styles.addBatchButtonText}>Add Batch</Text>
        </TouchableOpacity>
      </View>

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
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
  notificationButton: {
    position: 'relative',
    padding: 4,
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    backgroundColor: '#ef4444',
    borderRadius: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    paddingVertical: 12,
  },
  batchList: {
    paddingBottom: 100,
  },
  batchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  batchContent: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  batchInfo: {
    flex: 1,
  },
  batchLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  batchId: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
  animalCount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
  addBatchButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#22c55e',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  addBatchButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  bottomNavItemActive: {
    // Active state styling handled by text and icon colors
  },
  bottomNavText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  bottomNavTextActive: {
    color: '#22c55e',
  },
});
