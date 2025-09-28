import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import {
  ArrowLeft,
  Smartphone,
  Mail,
  User,
  CreditCard,
} from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';

// Dummy data for prototype
const DUMMY_DATA = {
  mobile: '9876543210',
  aadhaar: '123456789012',
  gmail: 'test@gmail.com',
  password: 'password123',
};

export default function LoginScreen() {
  const params = useLocalSearchParams();
  const selectedRole = (params.selectedRole as string) || 'Farmer';

  const [mobileNumber, setMobileNumber] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [gmailID, setGmailID] = useState('');
  const [password, setPassword] = useState('');
  const [authMethod, setAuthMethod] = useState<'mobile' | 'aadhaar' | 'gmail'>(
    'mobile'
  );

  const handleBack = () => {
    router.back();
  };

  const handleAuthentication = () => {
    if (authMethod === 'mobile') {
      if (!mobileNumber.trim()) {
        Alert.alert('Error', 'Please enter your mobile number');
        return;
      }

      if (mobileNumber.length !== 10) {
        Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
        return;
      }

      // Check dummy data
      if (mobileNumber === DUMMY_DATA.mobile) {
        Alert.alert(
          'OTP Sent',
          `OTP has been sent to ${mobileNumber}. Use OTP: 123456`,
          [
            {
              text: 'OK',
              onPress: () => {
                if (selectedRole === 'Farmer') {
                  router.replace('/farmer-dashboard');
                } else {
                  router.replace('/vet-dashboard');
                }
              },
            },
          ]
        );
      } else {
        Alert.alert('Error', 'Invalid mobile number. Use: 9876543210');
      }
    } else if (authMethod === 'aadhaar') {
      if (!aadhaarNumber.trim()) {
        Alert.alert('Error', 'Please enter your Aadhaar number');
        return;
      }

      if (aadhaarNumber.length !== 12) {
        Alert.alert('Error', 'Please enter a valid 12-digit Aadhaar number');
        return;
      }

      // Check dummy data
      if (aadhaarNumber === DUMMY_DATA.aadhaar) {
        Alert.alert(
          'OTP Sent',
          'OTP has been sent to your registered mobile number. Use OTP: 123456',
          [
            {
              text: 'OK',
              onPress: () => {
                if (selectedRole === 'Farmer') {
                  router.replace('/farmer-dashboard');
                } else {
                  router.replace('/vet-dashboard');
                }
              },
            },
          ]
        );
      } else {
        Alert.alert('Error', 'Invalid Aadhaar number. Use: 123456789012');
      }
    } else if (authMethod === 'gmail') {
      if (!gmailID.trim()) {
        Alert.alert('Error', 'Please enter your Gmail ID');
        return;
      }

      if (!gmailID.includes('@gmail.com')) {
        Alert.alert('Error', 'Please enter a valid Gmail ID');
        return;
      }

      if (!password.trim()) {
        Alert.alert('Error', 'Please enter your password');
        return;
      }

      // Check dummy data
      if (gmailID === DUMMY_DATA.gmail && password === DUMMY_DATA.password) {
        Alert.alert('Login Successful', `Welcome! Logged in with ${gmailID}`, [
          {
            text: 'OK',
            onPress: () => {
              if (selectedRole === 'Farmer') {
                router.replace('/farmer-dashboard');
              } else {
                router.replace('/vet-dashboard');
              }
            },
          },
        ]);
      } else {
        Alert.alert(
          'Error',
          'Invalid credentials. Use: test@gmail.com / password123'
        );
      }
    }
  };

  const handleAuthMethodChange = (method: 'mobile' | 'aadhaar' | 'gmail') => {
    setAuthMethod(method);
    // Clear fields when switching methods
    setMobileNumber('');
    setAadhaarNumber('');
    setGmailID('');
    setPassword('');
  };

  const getButtonText = () => {
    if (authMethod === 'gmail') {
      return 'Submit';
    }
    return 'Send OTP';
  };

  const renderInputFields = () => {
    if (authMethod === 'mobile') {
      return (
        <View style={styles.inputContainer}>
          <Smartphone size={20} color="#6b7280" style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Mobile Number"
            placeholderTextColor="#9ca3af"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>
      );
    }

    if (authMethod === 'aadhaar') {
      return (
        <View style={styles.inputContainer}>
          <CreditCard size={20} color="#6b7280" style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Aadhaar Number"
            placeholderTextColor="#9ca3af"
            value={aadhaarNumber}
            onChangeText={setAadhaarNumber}
            keyboardType="numeric"
            maxLength={12}
          />
        </View>
      );
    }

    if (authMethod === 'gmail') {
      return (
        <>
          <View style={styles.inputContainer}>
            <Mail size={20} color="#6b7280" style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Gmail ID"
              placeholderTextColor="#9ca3af"
              value={gmailID}
              onChangeText={setGmailID}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <User size={20} color="#6b7280" style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              placeholderTextColor="#9ca3af"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              autoCapitalize="none"
            />
          </View>
        </>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <ArrowLeft size={24} color="#374151" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>SAARTHI</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Logo */}
            {/* Logo */}
            <View style={styles.logoContainer}>
              <Image
                source={require('../assets/images/logo2.png')} // <-- your custom logo file
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            {/* Welcome Text */}
            <Text style={styles.welcomeText}>Welcome {selectedRole}</Text>
            <Text style={styles.subtitleText}>Enter your details to login</Text>

            {/* Dummy Data Info */}
            <View style={styles.dummyDataContainer}>
              <Text style={styles.dummyDataTitle}>Demo Credentials:</Text>
              <Text style={styles.dummyDataText}>Mobile: 9876543210</Text>
              <Text style={styles.dummyDataText}>Aadhaar: 123456789012</Text>
              <Text style={styles.dummyDataText}>
                Gmail: test@gmail.com / password123
              </Text>
            </View>

            {/* Input Fields */}
            <View style={styles.inputSection}>
              {renderInputFields()}

              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleAuthentication}
              >
                <Text style={styles.actionButtonText}>{getButtonText()}</Text>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Authentication Method Options */}
            <View style={styles.authMethodContainer}>
              <TouchableOpacity
                style={[
                  styles.authMethodButton,
                  authMethod === 'mobile' && styles.authMethodButtonActive,
                ]}
                onPress={() => handleAuthMethodChange('mobile')}
              >
                <Smartphone
                  size={20}
                  color={authMethod === 'mobile' ? 'white' : '#22c55e'}
                />
                <Text
                  style={[
                    styles.authMethodButtonText,
                    authMethod === 'mobile' &&
                      styles.authMethodButtonTextActive,
                  ]}
                >
                  Mobile
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.authMethodButton,
                  authMethod === 'aadhaar' && styles.authMethodButtonActive,
                ]}
                onPress={() => handleAuthMethodChange('aadhaar')}
              >
                <CreditCard
                  size={20}
                  color={authMethod === 'aadhaar' ? 'white' : '#22c55e'}
                />
                <Text
                  style={[
                    styles.authMethodButtonText,
                    authMethod === 'aadhaar' &&
                      styles.authMethodButtonTextActive,
                  ]}
                >
                  Aadhaar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.authMethodButton,
                  authMethod === 'gmail' && styles.authMethodButtonActive,
                ]}
                onPress={() => handleAuthMethodChange('gmail')}
              >
                <Mail
                  size={20}
                  color={authMethod === 'gmail' ? 'white' : '#22c55e'}
                />
                <Text
                  style={[
                    styles.authMethodButtonText,
                    authMethod === 'gmail' && styles.authMethodButtonTextActive,
                  ]}
                >
                  Gmail ID
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  keyboardView: {
    flex: 1,
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
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100, // adjust size as needed
    height: 100,
  },

  pawIcon: {
    position: 'relative',
    width: 60,
    height: 60,
  },
  pawPad: {
    width: 32,
    height: 28,
    backgroundColor: '#22c55e',
    borderRadius: 16,
    position: 'absolute',
    bottom: 0,
    left: 14,
  },
  pawToes: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  toe: {
    width: 12,
    height: 14,
    backgroundColor: '#22c55e',
    borderRadius: 6,
    position: 'absolute',
  },
  toe1: {
    top: 8,
    left: 8,
  },
  toe2: {
    top: 4,
    left: 24,
  },
  toe3: {
    top: 8,
    right: 8,
  },
  toe4: {
    top: 16,
    left: 55,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  dummyDataContainer: {
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#bae6fd',
  },
  dummyDataTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0369a1',
    marginBottom: 4,
  },
  dummyDataText: {
    fontSize: 12,
    color: '#0369a1',
    fontFamily: 'monospace',
  },
  inputSection: {
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    paddingVertical: 12,
  },
  actionButton: {
    backgroundColor: '#22c55e',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#d1d5db',
  },
  dividerText: {
    fontSize: 14,
    color: '#6b7280',
    paddingHorizontal: 16,
  },
  authMethodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  authMethodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#22c55e',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  authMethodButtonActive: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  authMethodButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#22c55e',
  },
  authMethodButtonTextActive: {
    color: 'white',
  },
});
