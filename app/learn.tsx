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
import {
  Menu,
  Search,
  Leaf,
  Shield,
  Clock,
  Home,
  Pill,
  Stethoscope,
  BookOpen,
  User,
} from 'lucide-react-native';
import { router } from 'expo-router';

interface UpdateItem {
  id: string;
  type: 'new' | 'update';
  category: string;
  title: string;
  description: string;
  image: string;
}

interface TipItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  backgroundColor: string;
}

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  image: string;
  completed: boolean;
}

const UPDATES: UpdateItem[] = [
  {
    id: '1',
    type: 'new',
    category: 'Govt. Schemes',
    title: 'New Subsidies for Dairy Farmers Announced',
    description:
      'The government has introduced new schemes to support small-scale dairy farmers.',
    image:
      'https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '2',
    type: 'update',
    category: 'Health Guidelines',
    title: 'Updated Vaccination Schedule',
    description: 'New vaccination protocols for livestock health management.',
    image:
      'data:image/jpeg;base64,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',
  },
  {
    id: '3',
    type: 'new',
    category: 'Technology',
    title: 'Digital Health Records',
    description: 'Learn about new digital tools for tracking animal health.',
    image:
      'https://static.wikia.nocookie.net/animals/images/b/ba/Sheep.jpg/revision/latest/scale-to-width-down/1200?cb=20190209033122',
  },
];

const TIPS: TipItem[] = [
  {
    id: '1',
    title: 'Feeding Guide',
    description: 'Seasonal feeding tips for optimal health.',
    icon: <Leaf size={24} color="#22c55e" />,
    backgroundColor: '#dcfce7',
  },
  {
    id: '2',
    title: 'Disease Prevention',
    description: 'Early signs of common illnesses.',
    icon: <Shield size={24} color="#3b82f6" />,
    backgroundColor: '#dbeafe',
  },
];

const TRAINING_MODULES: TrainingModule[] = [
  {
    id: '1',
    title: 'Basics of Livestock Health',
    description: 'Identify common diseases and learn care measures.',
    duration: '45 mins',
    image:
      'https://images.pexels.com/photos/1459978/pexels-photo-1459978.jpeg?auto=compress&cs=tinysrgb&w=200',
    completed: false,
  },
];

export default function LearnScreen() {
  const handleMenuPress = () => {
    Alert.alert('Menu', 'Opening menu');
  };

  const handleSearchPress = () => {
    Alert.alert('Search', 'Opening search');
  };

  const handleSeeAll = (section: string) => {
    Alert.alert('See All', `Opening all ${section}`);
  };

  const handleUpdatePress = (update: UpdateItem) => {
    Alert.alert('Update Details', `${update.title}\n\n${update.description}`);
  };

  const handleReadMore = (update: UpdateItem) => {
    Alert.alert('Read More', `Opening full article: ${update.title}`);
  };

  const handleTipPress = (tip: TipItem) => {
    Alert.alert('Tip Details', `${tip.title}\n\n${tip.description}`);
  };

  const handleStartTraining = (module: TrainingModule) => {
    Alert.alert(
      'Start Training',
      `Starting: ${module.title}\nDuration: ${module.duration}`
    );
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
      // Already on learn screen
    } else if (tab === 'User') {
      try {
        router.push('/user-profile');
      } catch (error) {
        console.error('Navigation error:', error);
      }
    }
  };

  const renderUpdateItem = (update: UpdateItem) => (
    <TouchableOpacity
      key={update.id}
      style={styles.updateCard}
      onPress={() => handleUpdatePress(update)}
    >
      <Image
        source={{ uri: update.image }}
        style={styles.updateImage}
        resizeMode="cover"
      />
      <View style={styles.updateOverlay}>
        <View style={styles.updateBadge}>
          <Text style={styles.updateBadgeText}>
            {update.type === 'new' ? 'New' : 'Update'}
          </Text>
        </View>
        <View style={styles.updateCategory}>
          <Text style={styles.updateCategoryText}>{update.category}</Text>
        </View>
        <Text style={styles.updateTitle}>{update.title}</Text>
        <Text style={styles.updateDescription}>{update.description}</Text>
        <TouchableOpacity
          style={styles.readMoreButton}
          onPress={() => handleReadMore(update)}
        >
          <Text style={styles.readMoreText}>Read More</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderTipItem = (tip: TipItem) => (
    <TouchableOpacity
      key={tip.id}
      style={styles.tipCard}
      onPress={() => handleTipPress(tip)}
    >
      <View style={[styles.tipIcon, { backgroundColor: tip.backgroundColor }]}>
        {tip.icon}
      </View>
      <View style={styles.tipContent}>
        <Text style={styles.tipTitle}>{tip.title}</Text>
        <Text style={styles.tipDescription}>{tip.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderTrainingModule = (module: TrainingModule) => (
    <View key={module.id} style={styles.trainingCard}>
      <Image
        source={{ uri: module.image }}
        style={styles.trainingImage}
        resizeMode="cover"
      />
      <View style={styles.trainingContent}>
        <Text style={styles.trainingTitle}>{module.title}</Text>
        <Text style={styles.trainingDescription}>{module.description}</Text>
        <View style={styles.trainingFooter}>
          <View style={styles.durationContainer}>
            <Clock size={16} color="#6b7280" />
            <Text style={styles.durationText}>{module.duration}</Text>
          </View>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => handleStartTraining(module)}
          >
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleMenuPress}>
          <Menu size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Learn</Text>
        <TouchableOpacity onPress={handleSearchPress}>
          <Search size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Updates Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Updates</Text>
            <TouchableOpacity onPress={() => handleSeeAll('Updates')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.updatesScrollContainer}
          >
            {UPDATES.map(renderUpdateItem)}
          </ScrollView>
        </View>

        {/* Tips & Insights Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tips & Insights</Text>
            <TouchableOpacity onPress={() => handleSeeAll('Tips & Insights')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tipsGrid}>{TIPS.map(renderTipItem)}</View>
        </View>

        {/* Training Modules Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Training Modules</Text>
            <TouchableOpacity onPress={() => handleSeeAll('Training Modules')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {TRAINING_MODULES.map(renderTrainingModule)}
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
          style={[styles.bottomNavItem, styles.bottomNavItemActive]}
          onPress={() => handleBottomNavigation('Learn')}
        >
          <BookOpen size={20} color="#22c55e" />
          <Text style={[styles.bottomNavText, styles.bottomNavTextActive]}>
            Learn
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={() => handleBottomNavigation('User')}
        >
          <User size={20} color="#6b7280" />
          <Text style={styles.bottomNavText}>User</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },

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
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#374151' },

  content: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },

  section: { marginBottom: 32 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#374151' },
  seeAllText: { fontSize: 14, color: '#22c55e', fontWeight: '500' },

  updateCard: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  updateImage: { width: '100%', height: 200 },
  updateOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  updateBadge: {
    backgroundColor: '#22c55e',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  updateBadgeText: { fontSize: 12, fontWeight: '600', color: 'white' },
  updateCategory: { marginBottom: 6 },
  updateCategoryText: { fontSize: 14, color: '#d1d5db', fontWeight: '500' },
  updateTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginBottom: 6,
    lineHeight: 22,
  },
  updateDescription: {
    fontSize: 14,
    color: '#d1d5db',
    lineHeight: 20,
    marginBottom: 10,
  },
  readMoreButton: { alignSelf: 'flex-start' },
  readMoreText: { fontSize: 14, color: '#22c55e', fontWeight: '600' },
  updatesScrollContainer: { paddingLeft: 0, paddingRight: 20 },

  tipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  tipCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tipIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipContent: { flex: 1 },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  tipDescription: { fontSize: 14, color: '#6b7280', lineHeight: 20 },

  trainingCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 16,
  },
  trainingImage: { width: 60, height: 60, borderRadius: 8, marginRight: 16 },
  trainingContent: { flex: 1 },
  trainingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  trainingDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  trainingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  durationContainer: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  durationText: { fontSize: 14, color: '#6b7280' },
  startButton: {
    backgroundColor: '#22c55e',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  startButtonText: { fontSize: 14, fontWeight: '600', color: 'white' },

  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  bottomNavItem: { flex: 1, alignItems: 'center', paddingVertical: 8 },
  bottomNavItemActive: {},
  bottomNavText: { fontSize: 12, color: '#6b7280', marginTop: 4 },
  bottomNavTextActive: { color: '#22c55e' },
});
