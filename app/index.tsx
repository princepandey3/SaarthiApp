import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Modal,
  FlatList,
  SafeAreaView,
  Linking,
} from 'react-native';
import { ChevronDown, BookOpen, ArrowRight } from 'lucide-react-native';
import { router } from 'expo-router';

type UserRole = 'Farmer' | 'Vet';
type Language = { code: string; name: string };

const LANGUAGES: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'pt', name: 'Português' },
  { code: 'it', name: 'Italiano' },
];

export default function HomeScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(LANGUAGES[0]);
  const [selectedRole, setSelectedRole] = useState<UserRole>('Farmer');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showGuideExpanded, setShowGuideExpanded] = useState(false);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    setShowLanguageModal(false);
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    router.push({
      pathname: '/login',
      params: { selectedRole }
    });
  };

  const handleLinkPress = (type: 'terms' | 'privacy') => {
    const message = type === 'terms' 
      ? 'Terms of Service would open here in a real app'
      : 'Privacy Policy would open here in a real app';
    Alert.alert('Info', message);
  };

  const renderLanguageItem = ({ item }: { item: Language }) => (
    <TouchableOpacity
      style={styles.languageItem}
      onPress={() => handleLanguageSelect(item)}
    >
      <Text style={styles.languageItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Illustration */}
        <View style={styles.headerContainer}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&cs=tinysrgb&w=800',
            }}
            style={styles.headerImage}
            resizeMode="cover"
          />
          <View style={styles.headerOverlay}>
            <Text style={styles.headerText}>
              Your trusted partner in livestock management.
            </Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          {/* Language Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Language</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowLanguageModal(true)}
            >
              <Text style={styles.dropdownText}>{selectedLanguage.name}</Text>
              <ChevronDown size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* Role Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Select Your Role</Text>
            <View style={styles.roleContainer}>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  selectedRole === 'Farmer' && styles.roleButtonActive,
                ]}
                onPress={() => handleRoleSelect('Farmer')}
              >
                <Text
                  style={[
                    styles.roleButtonText,
                    selectedRole === 'Farmer' && styles.roleButtonTextActive,
                  ]}
                >
                  Farmer
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  selectedRole === 'Vet' && styles.roleButtonActive,
                ]}
                onPress={() => handleRoleSelect('Vet')}
              >
                <Text
                  style={[
                    styles.roleButtonText,
                    selectedRole === 'Vet' && styles.roleButtonTextActive,
                  ]}
                >
                  Vet
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Quick Guide */}
          <TouchableOpacity
            style={styles.guideContainer}
            onPress={() => setShowGuideExpanded(!showGuideExpanded)}
          >
            <View style={styles.guideHeader}>
              <BookOpen size={24} color="#22c55e" />
              <View style={styles.guideTextContainer}>
                <Text style={styles.guideTitle}>Quick Guide</Text>
                <Text style={styles.guideSubtitle}>
                  Learn how to scan NFC tags to view animal details and prescriptions.
                </Text>
              </View>
            </View>
            {showGuideExpanded && (
              <View style={styles.guideExpanded}>
                <Text style={styles.guideExpandedText}>
                  • Hold your device near an NFC tag on the animal{'\n'}
                  • Wait for the automatic scan to complete{'\n'}
                  • View detailed animal health records{'\n'}
                  • Access vaccination history and prescriptions{'\n'}
                  • Update treatment information as needed
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Continue Button */}
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
            <ArrowRight size={20} color="white" />
          </TouchableOpacity>

          {/* Terms and Privacy */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By continuing, you agree to our{' '}
              <Text
                style={styles.termsLink}
                onPress={() => handleLinkPress('terms')}
              >
                Terms of Service
              </Text>{' '}
              and{' '}
              <Text
                style={styles.termsLink}
                onPress={() => handleLinkPress('privacy')}
              >
                Privacy Policy
              </Text>
              .
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Language Selection Modal */}
      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Language</Text>
            <FlatList
              data={LANGUAGES}
              keyExtractor={(item) => item.code}
              renderItem={renderLanguageItem}
              style={styles.languageList}
            />
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setShowLanguageModal(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  headerContainer: {
    height: 240,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
  },
  contentContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  dropdownText: {
    fontSize: 16,
    color: '#374151',
  },
  roleContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  roleButton: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  roleButtonActive: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  roleButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  roleButtonTextActive: {
    color: 'white',
  },
  guideContainer: {
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  guideHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  guideTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  guideTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  guideSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  guideExpanded: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#bbf7d0',
  },
  guideExpandedText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  continueButton: {
    backgroundColor: '#22c55e',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  termsContainer: {
    paddingHorizontal: 4,
  },
  termsText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: '#22c55e',
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '80%',
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 16,
  },
  languageList: {
    maxHeight: 200,
  },
  languageItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  languageItemText: {
    fontSize: 16,
    color: '#374151',
  },
  modalCancelButton: {
    marginTop: 16,
    padding: 12,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 16,
    color: '#6b7280',
  },
});