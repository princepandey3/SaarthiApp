import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import {
  Settings,
  Edit3,
  CreditCard,
  Phone,
  MapPin,
  BarChart3,
  Home,
  Pill,
  Stethoscope,
  BookOpen,
  User,
} from 'lucide-react-native';
import { router } from 'expo-router';
import StewardshipMeter from './../components/StewardshipMeter';

export default function UserProfileScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<
    'Weekly' | 'Monthly' | 'Yearly'
  >('Weekly');

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Opening profile editor');
  };

  const handleEditField = (field: string) => {
    Alert.alert('Edit Field', `Editing ${field}`);
  };

  const handleBottomNavigation = (tab: string) => {
    if (tab === 'Home') {
      try {
        router.replace('/farmer-dashboard');
      } catch (error) {
        console.error('Navigation error:', error);
      }
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
      // Already on user screen
    }
  };
  function polarToCartesian(
    cx: number,
    cy: number,
    r: number,
    angleDeg: number
  ) {
    const rad = ((angleDeg - 90) * Math.PI) / 180.0;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  }

  function describeArc(
    x: number,
    y: number,
    r: number,
    startAngle: number,
    endAngle: number
  ) {
    const start = polarToCartesian(x, y, r, endAngle);
    const end = polarToCartesian(x, y, r, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      'M',
      start.x,
      start.y,
      'A',
      r,
      r,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(' ');
  }

  const renderStewardshipMeter = () => {
    const score = 520;
    const maxScore = 850;
    const percentage = score / maxScore;

    const size = 200; // width of SVG
    const strokeWidth = 16;
    const radius = (size - strokeWidth) / 2;
    const center = size / 2;

    // Arc length (half circle = πr)
    const circumference = Math.PI * radius;
    const progress = circumference * percentage;

    return (
      <View style={styles.meterContainer}>
        <Svg width={size} height={size / 2} viewBox={`0 0 ${size} ${size / 2}`}>
          {/* Background arc */}
          <Path
            d={describeArc(center, center, radius, 180, 0)}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
          />

          {/* Progress arc */}
          <Path
            d={describeArc(center, center, radius, 180, 180 - percentage * 180)}
            stroke="#22c55e"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
          />
        </Svg>

        {/* Center content */}
        <View style={styles.meterCenter}>
          <Text style={styles.scoreNumber}>{score}</Text>
          <Text style={styles.scoreLabel}>out of {maxScore}</Text>
        </View>

        {/* Usage indicators */}
        <View style={styles.usageIndicators}>
          <View style={styles.usageItem}>
            <View style={[styles.usageDot, { backgroundColor: '#ef4444' }]} />
            <Text style={styles.usageText}>High Usage</Text>
            <Text style={styles.usageValue}>30</Text>
          </View>
          <View style={styles.usageItem}>
            <View style={[styles.usageDot, { backgroundColor: '#f59e0b' }]} />
            <Text style={styles.usageText}>Mid Usage</Text>
            <Text style={styles.usageValue}>25</Text>
          </View>
          <View style={styles.usageItem}>
            <View style={[styles.usageDot, { backgroundColor: '#22c55e' }]} />
            <Text style={styles.usageText}>Low Usage</Text>
            <Text style={styles.usageValue}>10</Text>
          </View>
        </View>
      </View>
    );
  };
  const renderAMUChart = () => {
    const chartData = [
      { day: 'Mon', value: 15 },
      { day: 'Tue', value: 25 },
      { day: 'Wed', value: 18 },
      { day: 'Thu', value: 8 },
      { day: 'Fri', value: 12 },
      { day: 'Sat', value: 5 },
      { day: 'Sun', value: 20 },
    ];

    const maxValue = Math.max(...chartData.map((d) => d.value));

    return (
      <View style={styles.chartContainer}>
        <View style={styles.chartArea}>
          <View style={styles.yAxisContainer}>
            <Text style={styles.yAxisLabel}>30</Text>
            <Text style={styles.yAxisLabel}>20</Text>
            <Text style={styles.yAxisLabel}>10</Text>
            <Text style={styles.yAxisLabel}>0</Text>
          </View>
          <View style={styles.chartContent}>
            <View style={styles.chartBackground}>
              {chartData.map((data, index) => {
                const height = (data.value / maxValue) * 80;
                const x = (index / (chartData.length - 1)) * 200;
                const y = 80 - height;

                return (
                  <View
                    key={index}
                    style={[styles.chartPoint, { left: x, top: y }]}
                  />
                );
              })}
              {/* Chart line */}
              <View style={styles.chartLine} />
            </View>
            <View style={styles.xAxisLabels}>
              {chartData.map((data, index) => (
                <Text key={index} style={styles.xAxisLabel}>
                  {data.day}
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
        <TouchableOpacity onPress={handleEditProfile}>
          <Settings size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <Edit3 size={32} color="#22c55e" />
            </View>
          </View>

          <Text style={styles.profileName}>Ramesh Kumar</Text>
          <Text style={styles.profileHandle}>@ramesh.k</Text>
        </View>

        {/* Profile Details */}
        <View style={styles.detailsSection}>
          <View style={styles.detailItem}>
            <View style={styles.detailLeft}>
              <CreditCard size={20} color="#6b7280" />
              <View style={styles.detailText}>
                <Text style={styles.detailLabel}>Farm Code</Text>
                <Text style={styles.detailValue}>FK 02450</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleEditField('Farm Code')}>
              <Edit3 size={16} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.detailItem}>
            <View style={styles.detailLeft}>
              <CreditCard size={20} color="#6b7280" />
              <View style={styles.detailText}>
                <Text style={styles.detailLabel}>Aadhaar</Text>
                <Text style={styles.detailValue}>**** **** 4567</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleEditField('Aadhaar')}>
              <Edit3 size={16} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.detailItem}>
            <View style={styles.detailLeft}>
              <Phone size={20} color="#6b7280" />
              <View style={styles.detailText}>
                <Text style={styles.detailLabel}>Phone</Text>
                <Text style={styles.detailValue}>+91 98765 43210</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleEditField('Phone')}>
              <Edit3 size={16} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.detailItem}>
            <View style={styles.detailLeft}>
              <MapPin size={20} color="#6b7280" />
              <View style={styles.detailText}>
                <Text style={styles.detailLabel}>Location</Text>
                <Text style={styles.detailValue}>Punjab, India</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleEditField('Location')}>
              <Edit3 size={16} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>120</Text>
            <Text style={styles.statLabel}>Registered{'\n'}Livestock</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Under Withdrawal</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Active Treatments</Text>
          </View>
        </View>

        {/* Stewardship Score */}
        <View style={styles.stewardshipSection}>
          <View style={styles.stewardshipHeader}>
            <Text style={styles.stewardshipTitle}>Stewardship Score</Text>
            <Text style={styles.stewardshipSubtitle}>Excellent</Text>
          </View>
          <Text style={styles.stewardshipDescription}>
            Based on your recent activity
          </Text>
          {renderStewardshipMeter()}
        </View>

        {/* AMU Trends */}
        <View style={styles.amuSection}>
          <View style={styles.amuHeader}>
            <Text style={styles.sectionTitle}>AMU Trends</Text>
            <TouchableOpacity>
              <BarChart3 size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>

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
                    selectedPeriod === period && styles.periodButtonTextActive,
                  ]}
                >
                  {period}
                </Text>
              </TouchableOpacity>
            ))}
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
          style={[styles.bottomNavItem, styles.bottomNavItemActive]}
          onPress={() => handleBottomNavigation('User')}
        >
          <User size={20} color="#22c55e" />
          <Text style={[styles.bottomNavText, styles.bottomNavTextActive]}>
            User
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#f0f9ff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profileImageContainer: {
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fecaca',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  profileHandle: {
    fontSize: 16,
    color: '#6b7280',
  },
  detailsSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  detailLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailText: {
    marginLeft: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  statsSection: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 18,
  },

  /** STEWARDSHIP SECTION **/
  stewardshipSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  stewardshipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stewardshipTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
  stewardshipSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22c55e',
  },
  stewardshipDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 20,
  },

  /** STEWARDSHIP METER **/
  meterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  meterCenter: {
    position: 'absolute',
    top: '35%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#374151',
  },
  scoreLabel: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  usageIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 20,
  },
  usageItem: {
    alignItems: 'center',
  },
  usageDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 4,
  },
  usageText: {
    fontSize: 12,
    color: '#374151',
    marginBottom: 2,
  },
  usageValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
  },

  /** AMU TRENDS **/
  amuSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  amuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
    padding: 2,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  periodButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  periodButtonActive: {
    backgroundColor: '#22c55e',
  },
  periodButtonText: {
    fontSize: 12,
    color: '#6b7280',
  },
  periodButtonTextActive: {
    color: 'white',
    fontWeight: '500',
  },
  chartContainer: {
    height: 120,
  },
  chartArea: {
    flexDirection: 'row',
    height: 100,
  },
  yAxisContainer: {
    justifyContent: 'space-between',
    paddingRight: 10,
    height: 80,
    paddingTop: 10,
  },
  yAxisLabel: {
    fontSize: 10,
    color: '#9ca3af',
  },
  chartContent: {
    flex: 1,
  },
  chartBackground: {
    height: 80,
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    position: 'relative',
    marginBottom: 16,
    marginTop: 10,
  },
  chartPoint: {
    position: 'absolute',
    width: 6,
    height: 6,
    backgroundColor: '#22c55e',
    borderRadius: 3,
  },
  chartLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: 8,
  },
  xAxisLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  xAxisLabel: {
    fontSize: 12,
    color: '#6b7280',
  },

  /** BOTTOM NAVIGATION **/
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
