import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Package, Clock, ArrowLeft, Plus } from 'lucide-react-native';

export default function SendPackage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    parcelType: '',
    size: '',
    pickupTime: 'immediate',
    specialInstructions: '',
  });

  useEffect(() => {
    // Update dropoff location if destination was selected
    if (params.destination) {
      setFormData(prev => ({
        ...prev,
        dropoffLocation: `${params.destination}, ${params.destinationArea}`,
      }));
    }
  }, [params]);

  const parcelTypes = ['Document', 'Small Package', 'Fragile Item', 'Electronics', 'Other'];
  const sizes = ['Small', 'Medium', 'Large'];
  const estimatedPrice = 'KSh 350';

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    // Add your form validation and submission logic here
    if (!formData.pickupLocation || !formData.dropoffLocation || !formData.parcelType || !formData.size) {
      Alert.alert('Please fill in all required fields.');
      return;
    }
    // Simulate successful submission
    Alert.alert('Success', 'Your package has been scheduled!');
    router.push('/(sender)/history');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#228B22', '#32CD32']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft color="#fff" size={22} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Send a Package</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.label}>Pickup Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter pickup location"
          value={formData.pickupLocation}
          onChangeText={text => handleInputChange('pickupLocation', text)}
        />

        <Text style={styles.label}>Dropoff Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter dropoff location"
          value={formData.dropoffLocation}
          onChangeText={text => handleInputChange('dropoffLocation', text)}
        />

        <Text style={styles.label}>Parcel Type</Text>
        <View style={styles.chipGroup}>
          {parcelTypes.map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.chip,
                formData.parcelType === type && styles.chipSelected,
              ]}
              onPress={() => handleInputChange('parcelType', type)}
            >
              <Text
                style={[
                  styles.chipText,
                  formData.parcelType === type && styles.chipTextSelected,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Size</Text>
        <View style={styles.chipGroup}>
          {sizes.map(size => (
            <TouchableOpacity
              key={size}
              style={[
                styles.chip,
                formData.size === size && styles.chipSelected,
              ]}
              onPress={() => handleInputChange('size', size)}
            >
              <Text
                style={[
                  styles.chipText,
                  formData.size === size && styles.chipTextSelected,
                ]}
              >
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Pickup Time</Text>
        <View style={styles.chipGroup}>
          <TouchableOpacity
            style={[
              styles.chip,
              formData.pickupTime === 'immediate' && styles.chipSelected,
            ]}
            onPress={() => handleInputChange('pickupTime', 'immediate')}
          >
            <Text
              style={[
                styles.chipText,
                formData.pickupTime === 'immediate' && styles.chipTextSelected,
              ]}
            >
              Immediate
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.chip,
              formData.pickupTime === 'schedule' && styles.chipSelected,
            ]}
            onPress={() => handleInputChange('pickupTime', 'schedule')}
          >
            <Text
              style={[
                styles.chipText,
                formData.pickupTime === 'schedule' && styles.chipTextSelected,
              ]}
            >
              Schedule
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Special Instructions</Text>
        <TextInput
          style={[styles.input, { height: 60 }]}
          placeholder="Any special instructions?"
          value={formData.specialInstructions}
          onChangeText={text => handleInputChange('specialInstructions', text)}
          multiline
        />

        <View style={styles.estimateContainer}>
          <Package color="#228B22" size={20} />
          <Text style={styles.estimateText}>Estimated Price: {estimatedPrice}</Text>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Plus color="#fff" size={20} />
          <Text style={styles.submitButtonText}>Send Package</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 20,         // Reduced from 70
    paddingBottom: 20,      // Reduced from 50
    paddingHorizontal: 25,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,           // Reduced
  },
  backButton: {
    marginRight: 10,
    padding: 6,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 24,           // Reduced
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 100,
  },
  label: {
    fontSize: 18,
    color: '#1a1a1a',
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  chipGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  chip: {
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginRight: 10,
    marginBottom: 8,
  },
  chipSelected: {
    backgroundColor: '#228B22',
  },
  chipText: {
    color: '#1a1a1a',
    fontSize: 15,
  },
  chipTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  estimateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 18,
  },
  estimateText: {
    marginLeft: 8,
    fontSize: 18,
    color: '#228B22',
    fontWeight: 'bold',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#228B22',
    borderRadius: 22,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignSelf: 'center',
    marginTop: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});