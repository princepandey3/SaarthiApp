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
  Search,
  History,
  Edit3,
  Plus,
  AlertTriangle,
  Package,
  MessageSquare,
  X,
  Home,
  FileText,
  BarChart3,
  User,
} from 'lucide-react-native';
import { router } from 'expo-router';

interface PrescriptionItem {
  id: string;
  animalId: string;
  owner: string;
  disease: string;
  medicine: string;
  duration: string;
  route: string;
  date: string;
  withdrawal: string;
  compliance: number;
}

interface AlertItem {
  id: string;
  type: 'medication' | 'stock' | 'message';
  title: string;
  description: string;
  time: string;
  date: string;
  primaryAction: string;
  secondaryAction: string;
}
const DUMMY_PRESCRIPTIONS: PrescriptionItem[] = [
  {
    id: '1',
    animalId: '#A001',
    owner: 'Raman Kumar',
    disease: 'Mastitis',
    medicine: 'Penicillin-10ml, Twice a day',
    duration: '5 days',
    route: 'Intramuscular',
    date: '2023-10-27',
    withdrawal: '7 days',
    compliance: 85,
  },
  {
    id: '2',
    animalId: '#B012',
    owner: 'Rahul Singh',
    disease: 'Pneumonia',
    medicine: 'Oxytetracycline-15ml, Once a day',
    duration: '3 days',
    route: 'Subcutaneous',
    date: '2023-10-26',
    withdrawal: '14 days',
    compliance: 92,
  },
  {
    id: '3',
    animalId: '#B013',
    owner: 'Jane Smith',
    disease: 'Pneumonia',
    medicine: 'Oxytetracycline-15ml, Once a day',
    duration: '7 days',
    route: 'Subcutaneous',
    date: '2023-10-26',
    withdrawal: '14 days',
    compliance: 92,
  },
  {
    id: '4',
    animalId: '#C012',
    owner: 'Lala Kumar',
    disease: 'Pneumonia',
    medicine: 'Oxytetracycline-10ml, Once a day',
    duration: '5 days',
    route: 'Subcutaneous',
    date: '2023-10-26',
    withdrawal: '14 days',
    compliance: 92,
  },
  {
    id: '5',
    animalId: '#C019',
    owner: 'Abhishek Kumar',
    disease: 'Pneumonia',
    medicine: 'Macrolytic lactone, Once a day',
    duration: '10 days',
    route: 'Subcutaneous',
    date: '2023-10-26',
    withdrawal: '14 days',
    compliance: 92,
  },
];

const DUMMY_ALERTS: AlertItem[] = [
  {
    id: '1',
    type: 'medication',
    title: 'Missed Medication',
    description: 'Animal ID #A001 missed their 10ml dose of Penicillin.',
    time: '2 hours ago',
    date: 'Today',
    primaryAction: 'Reschedule',
    secondaryAction: 'Dismiss',
  },
  {
    id: '2',
    type: 'stock',
    title: 'Low Medicine Stock',
    description: 'Stock for Oxytetracycline is running low. Only 5 doses left.',
    time: 'Yesterday, 4:30 PM',
    date: 'Yesterday',
    primaryAction: 'Re-order',
    secondaryAction: 'Dismiss',
  },
  {
    id: '3',
    type: 'message',
    title: 'New Message from Dr. Miller',
    description:
      '"Please monitor Animal #B012 closely for any side effects..."',
    time: 'Yesterday, 11:15 AM',
    date: 'Yesterday',
    primaryAction: 'Reply',
    secondaryAction: 'Mark as read',
  },
];

export default function PrescriptionScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<
    'Active' | 'Completed' | 'Alerts' | 'History'
  >('Active');

  // Function to render alerts by date
  const renderAlertsByDate = (dateLabel: string) => {
    const alertsForDate = DUMMY_ALERTS.filter(
      (alert) => alert.date === dateLabel
    );
    if (alertsForDate.length === 0) return null;

    return (
      <View style={styles.dateSection} key={dateLabel}>
        <Text style={styles.dateHeader}>{dateLabel}</Text>
        {alertsForDate.map((alert) => (
          <View
            key={alert.id}
            style={[
              styles.alertCard,
              alert.type === 'medication'
                ? { backgroundColor: '#fef3f2' }
                : alert.type === 'stock'
                ? { backgroundColor: '#fffbeb' }
                : { backgroundColor: '#ecfdf5' },
            ]}
          >
            <TouchableOpacity
              style={styles.dismissButton}
              onPress={() => handleDismissAlert(alert.id)}
            >
              <X size={16} color="#6b7280" />
            </TouchableOpacity>

            <View style={styles.alertContent}>
              <View style={styles.alertHeader}>
                {alert.type === 'medication' && (
                  <AlertTriangle size={20} color="#ef4444" />
                )}
                {alert.type === 'stock' && (
                  <Package size={20} color="#f59e0b" />
                )}
                {alert.type === 'message' && (
                  <MessageSquare size={20} color="#22c55e" />
                )}
                <View style={styles.alertTextContainer}>
                  <Text style={styles.alertTitle}>{alert.title}</Text>
                  <Text style={styles.alertDescription}>
                    {alert.description}
                  </Text>
                  <Text style={styles.alertTime}>{alert.time}</Text>
                </View>
              </View>

              <View style={styles.alertActions}>
                <TouchableOpacity
                  style={styles.secondaryActionButton}
                  onPress={() =>
                    handleAlertAction(alert.secondaryAction, alert)
                  }
                >
                  <Text style={styles.secondaryActionText}>
                    {alert.secondaryAction}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.primaryActionButton}
                  onPress={() => handleAlertAction(alert.primaryAction, alert)}
                >
                  <Text style={styles.primaryActionText}>
                    {alert.primaryAction}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  };

  // Filtered prescriptions based on search query
  const filteredPrescriptions = DUMMY_PRESCRIPTIONS.filter((prescription) => {
    const query = searchQuery.toLowerCase();

    return (
      prescription.animalId.toLowerCase().includes(query) ||
      prescription.owner.toLowerCase().includes(query) ||
      prescription.disease.toLowerCase().includes(query) ||
      prescription.medicine.toLowerCase().includes(query)
    );
  });

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      Alert.alert(
        'Search',
        'Please enter Animal ID, Batch ID, Disease or Medicine'
      );
    }
  };

  const handleTabPress = (
    tab: 'Active' | 'Completed' | 'Alerts' | 'History'
  ) => {
    setActiveTab(tab);
  };

  const handlePrescriptionAction = (
    action: 'history' | 'edit',
    prescription: PrescriptionItem
  ) => {
    Alert.alert(
      'Prescription Action',
      `${action === 'history' ? 'Viewing history' : 'Editing'} for ${
        prescription.animalId
      }`
    );
  };

  const handleAlertAction = (action: string, alert: AlertItem) => {
    Alert.alert('Alert Action', `${action} for: ${alert.title}`);
  };

  const handleDismissAlert = (alertId: string) => {
    Alert.alert('Dismiss Alert', 'Alert has been dismissed');
  };

  const handleAddPrescription = () => {
    router.push('/new-prescription');
  };

  const handleBottomNavigation = (tab: string) => {
    if (tab === 'Home') router.replace('/vet-dashboard');
    else if (tab === 'Prescription') return;
    else if (tab === 'Report') router.push('/report');
    else if (tab === 'Profile') router.push('/profile');
    else Alert.alert('Navigation', `Opening ${tab} tab`);
  };

  const getTabCount = (tab: string) => {
    switch (tab) {
      case 'Active':
        return DUMMY_PRESCRIPTIONS.length;
      case 'Completed':
        return 2;
      case 'Alerts':
        return DUMMY_ALERTS.length;
      case 'History':
        return 0;
      default:
        return 0;
    }
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 90) return '#22c55e';
    if (compliance >= 80) return '#22c55e';
    if (compliance >= 70) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Prescription</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color="#9ca3af" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Animal ID, Owner, Disease or Medicine"
              placeholderTextColor="#9ca3af"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
          </View>
        </View>

        {/* Tab Navigation */}
        <ScrollView
          style={styles.tabContainerScroll}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        >
          {(['Active', 'Completed', 'Alerts', 'History'] as const).map(
            (tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tabButton,
                  activeTab === tab && styles.tabButtonActive,
                ]}
                onPress={() => handleTabPress(tab)}
              >
                <Text
                  style={[
                    styles.tabButtonText,
                    activeTab === tab && styles.tabButtonTextActive,
                  ]}
                >
                  {tab}
                </Text>
                {getTabCount(tab) > 0 && (
                  <View
                    style={[
                      styles.tabBadge,
                      tab === 'Alerts' && styles.tabBadgeAlert,
                    ]}
                  >
                    <Text
                      style={[
                        styles.tabBadgeText,
                        tab === 'Alerts' && styles.tabBadgeTextAlert,
                      ]}
                    >
                      {getTabCount(tab)}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            )
          )}
        </ScrollView>

        {/* Prescription List (Filtered) */}
        {activeTab !== 'Alerts' ? (
          <View style={styles.prescriptionList}>
            {filteredPrescriptions.length > 0 ? (
              (activeTab === 'Completed'
                ? filteredPrescriptions.slice(0, 2) // Only show first 2 for Completed tab
                : filteredPrescriptions
              ).map((prescription) => (
                <View key={prescription.id} style={styles.prescriptionCard}>
                  <View style={styles.prescriptionHeader}>
                    <View>
                      <Text style={styles.animalId}>
                        Animal ID: {prescription.animalId}
                      </Text>
                      <Text style={styles.ownerName}>
                        Owner: {prescription.owner}
                      </Text>
                    </View>
                    <View style={styles.complianceContainer}>
                      <View style={styles.complianceDot} />
                      <Text
                        style={[
                          styles.complianceText,
                          {
                            color: getComplianceColor(prescription.compliance),
                          },
                        ]}
                      >
                        {prescription.compliance}% Compliance
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.disease}>{prescription.disease}</Text>
                  <Text style={styles.medicine}>{prescription.medicine}</Text>
                  <Text style={styles.details}>
                    Duration: {prescription.duration} | Route:{' '}
                    {prescription.route}
                  </Text>

                  <View style={styles.dateWithdrawalContainer}>
                    <Text style={styles.date}>Date: {prescription.date}</Text>
                    <Text style={styles.withdrawal}>
                      Withdrawal: {prescription.withdrawal}
                    </Text>
                  </View>

                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() =>
                        handlePrescriptionAction('history', prescription)
                      }
                    >
                      <History size={16} color="#6b7280" />
                      <Text style={styles.actionButtonText}>History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() =>
                        handlePrescriptionAction('edit', prescription)
                      }
                    >
                      <Edit3 size={16} color="#22c55e" />
                      <Text
                        style={[styles.actionButtonText, { color: '#22c55e' }]}
                      >
                        Edit
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <Text
                style={{ textAlign: 'center', marginTop: 40, color: '#9ca3af' }}
              >
                No prescriptions found.
              </Text>
            )}
          </View>
        ) : (
          // Alerts Tab
          <View style={styles.alertsList}>
            {renderAlertsByDate('Today')}
            {renderAlertsByDate('Yesterday')}
          </View>
        )}
      </ScrollView>

      {/* Add Prescription Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddPrescription}
      >
        <Plus size={24} color="white" />
      </TouchableOpacity>

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

  /** HEADER **/
  header: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#374151',
  },

  /** CONTENT **/
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  /** SEARCH **/
  searchContainer: {
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#374151',
    paddingVertical: 6,
  },

  /** TAB NAVIGATION **/
  tabContainerScroll: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    gap: 6,
  },
  tabButtonActive: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  tabButtonTextActive: {
    color: 'white',
  },
  tabBadge: {
    marginLeft: 6,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  tabBadgeAlert: {
    backgroundColor: '#ef4444',
  },
  tabBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  tabBadgeTextAlert: {
    color: 'white',
  },

  /** PRESCRIPTION LIST **/
  prescriptionList: {
    marginBottom: 140,
  },
  prescriptionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  prescriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  animalId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  ownerName: {
    fontSize: 14,
    color: '#6b7280',
  },
  complianceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  complianceDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22c55e',
  },
  complianceText: {
    fontSize: 14,
    fontWeight: '500',
  },
  disease: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  medicine: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  details: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 10,
  },
  dateWithdrawalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  date: {
    fontSize: 12,
    color: '#374151',
  },
  withdrawal: {
    fontSize: 12,
    color: '#ef4444',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#f3f4f6',
  },
  actionButtonText: {
    fontSize: 14,
    color: '#6b7280',
  },

  /** ALERTS **/
  alertsList: {
    marginBottom: 140,
  },
  dateSection: {
    marginBottom: 24,
  },
  dateHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 12,
  },
  alertCard: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    position: 'relative',
  },
  dismissButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 6,
    zIndex: 1,
  },
  alertContent: {
    paddingRight: 24,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  alertTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  alertDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 4,
  },
  alertTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  alertActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  secondaryActionButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  secondaryActionText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  primaryActionButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    backgroundColor: '#22c55e',
  },
  primaryActionText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
  },

  /** ADD BUTTON **/
  addButton: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#22c55e',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },

  /** BOTTOM NAVIGATION **/
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  bottomNavItemActive: {},
  bottomNavText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'center',
  },
  bottomNavTextActive: {
    color: '#22c55e',
    fontWeight: '600',
  },
});
