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
import { ArrowLeft, QrCode, Calendar, ChevronDown } from 'lucide-react-native';
import { router } from 'expo-router';

export default function BatchRegistrationForm() {
  const [earTagId, setEarTagId] = useState('');
  const [dataEntryDate, setDataEntryDate] = useState('');
  const [taggingDate, setTaggingDate] = useState('');
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [flockName, setFlockName] = useState('');
  const [maleCount0to3, setMaleCount0to3] = useState('0');
  const [femaleCount0to3, setFemaleCount0to3] = useState('0');
  const [maleCountAbove3, setMaleCountAbove3] = useState('0');
  const [femaleCountAbove3, setFemaleCountAbove3] = useState('0');

  const handleBack = () => {
    router.back();
  };

  const handleScanQR = () => {
    Alert.alert('QR Scanner', 'Opening QR code scanner for ear tag ID');
  };

  const handleDateSelect = (type: 'entry' | 'tagging') => {
    Alert.alert(
      'Date Picker',
      `Select ${type === 'entry' ? 'Data Entry' : 'Tagging'} Date`
    );
  };

  const handleDropdownSelect = (type: 'species' | 'breed') => {
    Alert.alert('Select', `Choose ${type === 'species' ? 'Species' : 'Breed'}`);
  };

  const getTotalAnimals = () => {
    const total =
      parseInt(maleCount0to3 || '0') +
      parseInt(femaleCount0to3 || '0') +
      parseInt(maleCountAbove3 || '0') +
      parseInt(femaleCountAbove3 || '0');
    return total;
  };

  const handleClearAll = () => {
    setEarTagId('');
    setDataEntryDate('');
    setTaggingDate('');
    setSpecies('');
    setBreed('');
    setFlockName('');
    setMaleCount0to3('0');
    setFemaleCount0to3('0');
    setMaleCountAbove3('0');
    setFemaleCountAbove3('0');
  };

  const handleSubmit = () => {
    if (!earTagId.trim()) {
      Alert.alert('Error', 'Please enter or scan ear tag ID');
      return;
    }
    if (!flockName.trim()) {
      Alert.alert('Error', 'Please enter flock name');
      return;
    }

    Alert.alert(
      'Success',
      `Batch registered successfully!\nEar Tag ID: ${earTagId}\nTotal Animals: ${getTotalAnimals()}`,
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Batch Registration</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Ear Tag ID */}
        <View style={styles.section}>
          <Text style={styles.label}>Ear Tag ID</Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={styles.textInput}
              placeholder="Scan or enter ear tag ID"
              placeholderTextColor="#9ca3af"
              value={earTagId}
              onChangeText={setEarTagId}
            />
            <TouchableOpacity style={styles.iconButton} onPress={handleScanQR}>
              <QrCode size={20} color="#22c55e" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Date Fields */}
        <View style={styles.dateRow}>
          <View style={styles.dateField}>
            <Text style={styles.label}>Data Entry Date</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => handleDateSelect('entry')}
            >
              <Text style={styles.dateText}>Select date</Text>
              <Calendar size={16} color="#6b7280" />
            </TouchableOpacity>
          </View>
          <View style={styles.dateField}>
            <Text style={styles.label}>Tagging Date</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => handleDateSelect('tagging')}
            >
              <Text style={styles.dateText}>Select date</Text>
              <Calendar size={16} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Species and Breed */}
        <View style={styles.dropdownRow}>
          <View style={styles.dropdownField}>
            <Text style={styles.label}>Species</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => handleDropdownSelect('species')}
            >
              <Text style={styles.dropdownText}>Select</Text>
              <ChevronDown size={16} color="#6b7280" />
            </TouchableOpacity>
          </View>
          <View style={styles.dropdownField}>
            <Text style={styles.label}>Breed</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => handleDropdownSelect('breed')}
            >
              <Text style={styles.dropdownText}>Select</Text>
              <ChevronDown size={16} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Name of Flock */}
        <View style={styles.section}>
          <Text style={styles.label}>Name of Flock</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter flock name"
            placeholderTextColor="#9ca3af"
            value={flockName}
            onChangeText={setFlockName}
          />
        </View>

        {/* Number of Animals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Number of Animals</Text>

          {/* 0 to 3 months */}
          <Text style={styles.ageGroupTitle}>0 to 3 months</Text>
          <View style={styles.animalCountRow}>
            <View style={styles.countField}>
              <Text style={styles.countLabel}>Male</Text>
              <TextInput
                style={styles.countInput}
                value={maleCount0to3}
                onChangeText={setMaleCount0to3}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#9ca3af"
              />
            </View>
            <View style={styles.countField}>
              <Text style={styles.countLabel}>Female</Text>
              <TextInput
                style={styles.countInput}
                value={femaleCount0to3}
                onChangeText={setFemaleCount0to3}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          {/* Above 3 months */}
          <Text style={styles.ageGroupTitle}>Above 3 months</Text>
          <View style={styles.animalCountRow}>
            <View style={styles.countField}>
              <Text style={styles.countLabel}>Male</Text>
              <TextInput
                style={styles.countInput}
                value={maleCountAbove3}
                onChangeText={setMaleCountAbove3}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#9ca3af"
              />
            </View>
            <View style={styles.countField}>
              <Text style={styles.countLabel}>Female</Text>
              <TextInput
                style={styles.countInput}
                value={femaleCountAbove3}
                onChangeText={setFemaleCountAbove3}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>
        </View>

        {/* Total Animals */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Animals</Text>
          <Text style={styles.totalValue}>{getTotalAnimals()}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.clearButton} onPress={handleClearAll}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  placeholder: {
    width: 32,
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
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  textInput: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#374151',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
  },
  iconButton: {
    padding: 14,
    borderLeftWidth: 1,
    borderLeftColor: '#d1d5db',
  },
  dateRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  dateField: {
    flex: 1,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dateText: {
    fontSize: 16,
    color: '#6b7280',
  },
  dropdownRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  dropdownField: {
    flex: 1,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dropdownText: {
    fontSize: 16,
    color: '#6b7280',
  },
  ageGroupTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#22c55e',
    marginBottom: 12,
    marginTop: 12,
  },
  animalCountRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  countField: {
    flex: 1,
  },
  countLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 6,
  },
  countInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingVertical: 12,
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#dcfce7',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 18,
    marginBottom: 32,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22c55e',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#22c55e',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 40,
  },
  clearButton: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#22c55e',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});
