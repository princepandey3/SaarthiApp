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
  ChevronDown,
  Plus,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Home,
  FileText,
  BarChart3,
  User,
} from 'lucide-react-native';
import { router } from 'expo-router';

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  route: string;
  withdrawalPeriod: string;
  status: 'approved' | 'warning' | 'danger';
  statusText: string;
  note?: string;
}

const DUMMY_MEDICINES: Medicine[] = [
  {
    id: '1',
    name: 'Amoxicillin',
    dosage: '10ml',
    frequency: 'Once a day',
    duration: '7 days',
    route: 'Intramuscular',
    withdrawalPeriod: '14 days',
    status: 'approved',
    statusText: 'Approved',
  },
  {
    id: '2',
    name: 'Meloxicam',
    dosage: '2ml',
    frequency: 'Once a day',
    duration: '',
    route: '',
    withdrawalPeriod: '14 days',
    status: 'warning',
    statusText: 'Warning',
    note: "Dosage slightly low for animal's weight. Recommended: 5ml",
  },
  {
    id: '3',
    name: 'Ivermectin',
    dosage: '',
    frequency: '',
    duration: '',
    route: '',
    withdrawalPeriod: '14 days',
    status: 'danger',
    statusText: 'Danger',
    note: 'Contraindicated with current medications. High risk of adverse reactions.',
  },
];

export default function NewPrescription() {
  const [selectedAnimal, setSelectedAnimal] = useState('');
  const [disease, setDisease] = useState('');
  const [medicines, setMedicines] = useState<Medicine[]>(DUMMY_MEDICINES);
  const [additionalInstructions, setAdditionalInstructions] = useState('');

  const handleBack = () => {
    router.back();
  };

  const handleAnimalSelect = () => {
    Alert.alert('Select Animal', 'Opening animal selection');
  };

  const handleDiseaseSelect = () => {
    Alert.alert('Select Disease', 'Opening disease selection');
  };

  const handleAddMedicine = () => {
    Alert.alert('Add Medicine', 'Opening medicine selection');
  };

  const handleRequestVetReview = () => {
    Alert.alert('Vet Review', 'Requesting veterinarian review');
  };

  const handleConfirmPrescription = () => {
    if (!selectedAnimal) {
      Alert.alert('Error', 'Please select an animal');
      return;
    }
    if (!disease) {
      Alert.alert('Error', 'Please select a disease');
      return;
    }

    Alert.alert('Success', 'Prescription created successfully!', [
      {
        text: 'OK',
        onPress: () => router.back(),
      },
    ]);
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle size={16} color="#22c55e" />;
      case 'warning':
        return <AlertTriangle size={16} color="#f59e0b" />;
      case 'danger':
        return <AlertCircle size={16} color="#ef4444" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return '#22c55e';
      case 'warning':
        return '#f59e0b';
      case 'danger':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getMedicineCardStyle = (status: string) => {
    const baseStyle = [styles.medicineCard];
    switch (status) {
      case 'approved':
        return [...baseStyle, styles.medicineCardApproved];
      case 'warning':
        return [...baseStyle, styles.medicineCardWarning];
      case 'danger':
        return [...baseStyle, styles.medicineCardDanger];
      default:
        return baseStyle;
    }
  };

  const renderMedicine = (medicine: Medicine) => (
    <View key={medicine.id} style={getMedicineCardStyle(medicine.status)}>
      <View style={styles.medicineHeader}>
        <Text style={styles.medicineName}>{medicine.name}</Text>
        <View style={styles.statusContainer}>
          {getStatusIcon(medicine.status)}
          <Text
            style={[
              styles.statusText,
              { color: getStatusColor(medicine.status) },
            ]}
          >
            {medicine.statusText}
          </Text>
        </View>
      </View>

      <View style={styles.medicineDetails}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Dosage</Text>
            <TextInput
              style={styles.detailInput}
              placeholder="15ml"
              placeholderTextColor="#9ca3af"
              value={medicine.dosage}
            />
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Frequency</Text>
            <TextInput
              style={styles.detailInput}
              placeholder="Once a day"
              placeholderTextColor="#9ca3af"
              value={medicine.frequency}
            />
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Duration</Text>
            <TextInput
              style={styles.detailInput}
              placeholder="7 days"
              placeholderTextColor="#9ca3af"
              value={medicine.duration}
            />
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Route</Text>
            <TextInput
              style={styles.detailInput}
              placeholder="Intramuscular"
              placeholderTextColor="#9ca3af"
              value={medicine.route}
            />
          </View>
        </View>

        <View style={styles.withdrawalRow}>
          <Text style={styles.detailLabel}>Withdrawal Period</Text>
          <TextInput
            style={styles.withdrawalInput}
            placeholder="e.g. 14 days"
            placeholderTextColor="#9ca3af"
            value={medicine.withdrawalPeriod}
          />
        </View>

        {medicine.note && (
          <View style={styles.noteContainer}>
            <AlertTriangle size={16} color="#f59e0b" />
            <Text style={styles.noteText}>{medicine.note}</Text>
          </View>
        )}

        {(medicine.status === 'warning' || medicine.status === 'danger') && (
          <TouchableOpacity
            style={styles.requestVetReviewCard}
            onPress={handleRequestVetReview}
          >
            <Text style={styles.requestVetReviewCardText}>
              🐾 Request Vet Review
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Prescription</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Select Animals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Animals</Text>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={handleAnimalSelect}
          >
            <Text style={styles.selectButtonText}>
              Enter or Scan Animal IDs
            </Text>
            <ChevronDown size={20} color="#6b7280" />
          </TouchableOpacity>
          <Text style={styles.helperText}>
            Scan multiple animals or select from list
          </Text>

          {/* Animal Tags */}
          <View style={styles.tagContainer}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Cow-001</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Cow-002</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Cow-003</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.selectFromListButton}>
            <Text style={styles.selectFromListText}>Select from List</Text>
          </TouchableOpacity>
        </View>

        {/* Disease */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Disease</Text>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={handleDiseaseSelect}
          >
            <Text style={styles.selectButtonText}>Mastitis</Text>
            <ChevronDown size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Medicines */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medicines</Text>
          {medicines.map(renderMedicine)}

          <TouchableOpacity
            style={styles.addMedicineButton}
            onPress={handleAddMedicine}
          >
            <Plus size={20} color="#22c55e" />
            <Text style={styles.addMedicineText}>Add Another Medicine</Text>
          </TouchableOpacity>
        </View>

        {/* Additional Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Instructions</Text>
          <TextInput
            style={styles.instructionsInput}
            placeholder="Any extra details..."
            placeholderTextColor="#9ca3af"
            value={additionalInstructions}
            onChangeText={setAdditionalInstructions}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Confirm Button */}
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmPrescription}
        >
          <Text style={styles.confirmButtonText}>Confirm Prescription</Text>
        </TouchableOpacity>
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
          onPress={() => handleBottomNavigation('Prescription')}
        >
          <FileText size={20} color="#22c55e" />
          <Text style={[styles.bottomNavText, styles.bottomNavTextActive]}>
            Prescription
          </Text>
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
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  selectButtonText: {
    fontSize: 16,
    color: '#374151',
  },
  helperText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#dcfce7',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagText: {
    fontSize: 14,
    color: '#22c55e',
    fontWeight: '500',
  },
  selectFromListButton: {
    backgroundColor: '#dcfce7',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  selectFromListText: {
    fontSize: 16,
    color: '#22c55e',
    fontWeight: '500',
  },
  medicineCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#e5e7eb',
    borderRightColor: '#e5e7eb',
    borderBottomColor: '#e5e7eb',
  },
  medicineCardApproved: {
    borderLeftColor: '#22c55e',
  },
  medicineCardWarning: {
    borderLeftColor: '#f59e0b',
  },
  medicineCardDanger: {
    borderLeftColor: '#ef4444',
  },
  medicineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  medicineName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  medicineDetails: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flex: 1,
    marginRight: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  detailInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#374151',
  },
  withdrawalRow: {
    marginBottom: 12,
  },
  withdrawalInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#374151',
    marginTop: 4,
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#fffbeb',
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#fbbf24',
    marginBottom: 12,
  },
  noteText: {
    fontSize: 14,
    color: '#92400e',
    flex: 1,
    lineHeight: 20,
  },
  requestVetReviewCard: {
    backgroundColor: '#dcfce7',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  requestVetReviewCardText: {
    fontSize: 16,
    color: '#22c55e',
    fontWeight: '500',
  },
  addMedicineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#22c55e',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 8,
  },
  addMedicineText: {
    fontSize: 16,
    color: '#22c55e',
    fontWeight: '500',
  },
  instructionsInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#374151',
    textAlignVertical: 'top',
    minHeight: 80,
  },
  confirmButton: {
    backgroundColor: '#22c55e',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  confirmButtonText: {
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
