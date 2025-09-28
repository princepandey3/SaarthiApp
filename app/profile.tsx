import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import { Edit3, Home, FileText, BarChart3, User } from 'lucide-react-native';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<
    'Weekly' | 'Monthly' | 'Yearly'
  >('Monthly');

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Opening profile editor');
  };

  const handleBottomNavigation = (tab: string) => {
    if (tab === 'Home') {
      router.replace('/vet-dashboard');
    } else if (tab === 'Prescription') {
      router.push('/prescription');
    } else if (tab === 'Report') {
      router.push('/report');
    } else if (tab === 'Profile') {
      // Already on profile screen
    } else {
      Alert.alert('Navigation', `Opening ${tab} tab`);
    }
  };

  const performanceData = [
    { month: 'Jan', value: 2.8 },
    { month: 'Feb', value: 3.2 },
    { month: 'Mar', value: 2.5 },
    { month: 'Apr', value: 3.5 },
    { month: 'May', value: 3.0 },
    { month: 'Jun', value: 2.8 },
  ];

  const amuTrendData = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 60 },
    { month: 'Mar', value: 70 },
    { month: 'Apr', value: 80 },
    { month: 'May', value: 60 },
    { month: 'Jun', value: 55 },
    { month: 'Jul', value: 45 },
  ];

  const renderPerformanceChart = () => {
    const maxValue = Math.max(...performanceData.map((d) => d.value));

    return (
      <View style={styles.chartContainer}>
        <View style={styles.chartArea}>
          <View style={styles.yAxisContainer}>
            <Text style={styles.yAxisLabel}>3.5</Text>
            <Text style={styles.yAxisLabel}>3.0</Text>
            <Text style={styles.yAxisLabel}>2.5</Text>
            <Text style={styles.yAxisLabel}>2.0</Text>
            <Text style={styles.yAxisLabel}>1.5</Text>
            <Text style={styles.yAxisLabel}>1.0</Text>
            <Text style={styles.yAxisLabel}>0.5</Text>
            <Text style={styles.yAxisLabel}>0</Text>
          </View>
          <View style={styles.chartBars}>
            {performanceData.map((data, index) => (
              <View key={index} style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    { height: (data.value / maxValue) * 120 },
                  ]}
                />
                <Text style={styles.barLabel}>{data.month}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  const renderAMUChart = () => {
    return (
      <View style={styles.lineChartContainer}>
        <View style={styles.amuChartArea}>
          <View style={styles.yAxisContainerAMU}>
            <Text style={styles.yAxisLabel}>80</Text>
            <Text style={styles.yAxisLabel}>60</Text>
            <Text style={styles.yAxisLabel}>40</Text>
            <Text style={styles.yAxisLabel}>20</Text>
            <Text style={styles.yAxisLabel}>0</Text>
          </View>
          <View style={styles.lineChart}>
            <View style={styles.chartAreaAMU}>
              <View style={styles.amuFillArea} />
              {amuTrendData.map((data, index) => {
                const x = (index / (amuTrendData.length - 1)) * 260;
                const y = 100 - ((data.value - 20) / 60) * 100;

                return (
                  <View
                    key={index}
                    style={[styles.dataPoint, { left: x, top: y }]}
                  />
                );
              })}
            </View>
            <View style={styles.xAxisLabels}>
              {amuTrendData.map((data, index) => (
                <Text key={index} style={styles.xAxisLabel}>
                  {data.month}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=200',
              }}
              style={styles.profileImage}
            />
            <View style={styles.onlineIndicator} />
          </View>

          <Text style={styles.profileName}>Dr. Shanika Sharma</Text>
          <Text style={styles.profileTitle}>Veterinary Surgeon, DVM</Text>

          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={handleEditProfile}
          >
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Farm Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Farm Insights</Text>
          <View style={styles.insightsContainer}>
            <View style={styles.insightCard}>
              <View style={styles.insightHeader}>
                <Text style={styles.insightEmoji}>🚜</Text>
                <Text style={styles.insightLabel}>Farms Managed</Text>
              </View>
              <Text style={styles.insightValue}>28</Text>
              <Text style={styles.insightSubtext}>+2 this month</Text>
            </View>

            <View style={styles.insightCard}>
              <View style={styles.insightHeader}>
                <Text style={styles.insightEmoji}>🏥</Text>
                <Text style={styles.insightLabel}>Animals Treated</Text>
              </View>
              <Text style={styles.insightValue}>1,245</Text>
              <Text style={styles.insightSubtext}>Total lifetime</Text>
            </View>
          </View>
        </View>

        {/* Performance Trends */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Trends</Text>
          {renderPerformanceChart()}
        </View>

        {/* AMU Trends */}
        <View style={styles.section}>
          <View style={styles.amuHeader}>
            <Text style={styles.sectionTitle}>AMU Trends</Text>
            <View style={styles.periodSelector}>
              {(['Weekly', 'Monthly', 'Yearly'] as const).map((period) => (
                <TouchableOpacity
                  key={period}
                  style={[
                    styles.periodButton,
                    selectedPeriod === period && styles.periodButtonActive,
                  ]}
                  onPress={() => setSelectedPeriod(period)}
                >
                  <Text
                    style={[
                      styles.periodButtonText,
                      selectedPeriod === period &&
                        styles.periodButtonTextActive,
                    ]}
                  >
                    {period}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {renderAMUChart()}
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
          style={[styles.bottomNavItem, styles.bottomNavItemActive]}
          onPress={() => handleBottomNavigation('Profile')}
        >
          <User size={20} color="#22c55e" />
          <Text style={[styles.bottomNavText, styles.bottomNavTextActive]}>
            Profile
          </Text>
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
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    backgroundColor: '#22c55e',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'white',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  profileTitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 20,
  },
  editProfileButton: {
    backgroundColor: '#22c55e',
    borderRadius: 25,
    paddingHorizontal: 40,
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
  },
  editProfileText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },
  insightsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  insightCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightEmoji: {
    fontSize: 16,
    marginRight: 8,
  },
  insightLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  insightValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  insightSubtext: {
    fontSize: 12,
    color: '#22c55e',
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  chartArea: {
    flexDirection: 'row',
    height: 140,
  },
  yAxisContainer: {
    justifyContent: 'space-between',
    paddingRight: 10,
    height: 120,
    paddingTop: 10,
  },
  yAxisLabel: {
    fontSize: 10,
    color: '#9ca3af',
  },
  chartBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1,
    height: 120,
    paddingTop: 10,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  bar: {
    backgroundColor: '#22c55e',
    width: 24,
    borderRadius: 2,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  amuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
    padding: 2,
  },
  periodButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  periodButtonActive: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  periodButtonText: {
    fontSize: 12,
    color: '#6b7280',
  },
  periodButtonTextActive: {
    color: '#374151',
    fontWeight: '500',
  },
  lineChartContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  amuChartArea: {
    flexDirection: 'row',
    height: 140,
  },
  yAxisContainerAMU: {
    justifyContent: 'space-between',
    paddingRight: 10,
    height: 100,
    paddingTop: 10,
  },
  lineChart: {
    flex: 1,
  },
  chartAreaAMU: {
    height: 100,
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    position: 'relative',
    marginBottom: 16,
    marginTop: 10,
  },
  amuFillArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: 8,
  },
  dataPoint: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: '#22c55e',
    borderRadius: 2,
  },
  xAxisLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  xAxisLabel: {
    fontSize: 12,
    color: '#6b7280',
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
