import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Package, Clock, ArrowLeft, Plus } from 'lucide-react-native';

export default function SendPackage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    parcelType: '',
    size: '',
    pickupTime: 'immediate',
    specialInstructions: '',
  });

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
    if (!formData.pickupLocation || !formData.dropoffLocation || !formData.parcelType || !formData.size) {
      Alert.alert('Missing Information', 'Please fill in all required fields to continue');
      return;
    }
    router.push('/(sender)/matching');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#8B7D6B', '#A0826D']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft color="#ffffff" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Send Package</Text>
          <Text style={styles.headerSubtitle}>Fill in delivery details</Text>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Location Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📍 Pickup & Drop-off</Text>

          <View style={styles.locationCard}>
            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <MapPin color="#32CD32" size={20} />
                <Text style={styles.inputLabel}>Pickup Location</Text>
              </View>
              <TextInput
                style={styles.textInput}
                value={formData.pickupLocation}
                onChangeText={(value) => handleInputChange('pickupLocation', value)}
                placeholder="Enter pickup address"
                placeholderTextColor="#999999"
              />
            </View>

            <View style={styles.routeDivider}>
              <View style={styles.routeLine} />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <MapPin color="#FF6347" size={20} />
                <Text style={styles.inputLabel}>Drop-off Location</Text>
              </View>
              <TextInput
                style={styles.textInput}
                value={formData.dropoffLocation}
                onChangeText={(value) => handleInputChange('dropoffLocation', value)}
                placeholder="Enter drop-off address"
                placeholderTextColor="#999999"
              />
            </View>
          </View>
        </View>

        {/* Package Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📦 Package Details</Text>

          <View style={styles.card}>
            <Text style={styles.cardSubtitle}>What are you sending?</Text>
            <View style={styles.optionsGrid}>
              {parcelTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.optionChip,
                    formData.parcelType === type && styles.optionChipSelected
                  ]}
                  onPress={() => handleInputChange('parcelType', type)}
                  activeOpacity={0.8}
                >
                  <Text style={[
                    styles.optionText,
                    formData.parcelType === type && styles.optionTextSelected
                  ]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardSubtitle}>Package Size</Text>
            <View style={styles.optionsGrid}>
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.optionChip,
                    formData.size === size && styles.optionChipSelected
                  ]}
                  onPress={() => handleInputChange('size', size)}
                  activeOpacity={0.8}
                >
                  <Text style={[
                    styles.optionText,
                    formData.size === size && styles.optionTextSelected
                  ]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Pickup Time */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⏰ Pickup Time</Text>

          <View style={styles.card}>
            <View style={styles.timeOptions}>
              <TouchableOpacity
                style={[
                  styles.timeOption,
                  formData.pickupTime === 'immediate' && styles.timeOptionSelected
                ]}
                onPress={() => handleInputChange('pickupTime', 'immediate')}
                activeOpacity={0.8}
              >
                <Clock color={formData.pickupTime === 'immediate' ? '#ffffff' : '#FF8C00'} size={20} />
                <Text style={[
                  styles.timeOptionText,
                  formData.pickupTime === 'immediate' && styles.timeOptionTextSelected
                ]}>
                  Immediate Pickup
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.timeOption,
                  formData.pickupTime === 'scheduled' && styles.timeOptionSelected
                ]}
                onPress={() => handleInputChange('pickupTime', 'scheduled')}
                activeOpacity={0.8}
              >
                <Clock color={formData.pickupTime === 'scheduled' ? '#ffffff' : '#FF8C00'} size={20} />
                <Text style={[
                  styles.timeOptionText,
                  formData.pickupTime === 'scheduled' && styles.timeOptionTextSelected
                ]}>
                  Schedule Later
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Special Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Special Instructions</Text>

          <View style={styles.card}>
            <TextInput
              style={styles.textArea}
              value={formData.specialInstructions}
              onChangeText={(value) => handleInputChange('specialInstructions', value)}
              placeholder="Any special handling instructions... (Optional)"
              placeholderTextColor="#999999"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Price Summary */}
        <View style={styles.priceCard}>
          <View style={styles.priceHeader}>
            <Text style={styles.priceLabel}>Estimated Price</Text>
            <Text style={styles.priceAmount}>{estimatedPrice}</Text>
          </View>
          <Text style={styles.priceNote}>Final price may vary based on distance and package details</Text>
        </View>

        {/* Submit Button */}
        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={handleSubmit}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#FF8C00', '#FF7F00']}
            style={styles.submitGradient}
          >
            <Text style={styles.submitText}>Find a Rider</Text>
            <Package color="#ffffff" size={20} />
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 70,
    paddingBottom: 30,
    paddingHorizontal: 25,
  },
  headerContent: {
    alignItems: 'flex-start',
  },
  backButton: {
    marginBottom: 20,
    padding: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  scrollContent: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 120,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#B8860B',
    marginBottom: 20,
  },
  locationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  inputContainer: {
    marginBottom: 5,
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2E8B57',
    marginLeft: 10,
  },
  textInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2E8B57',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  routeDivider: {
    alignItems: 'center',
    marginVertical: 15,
  },
  routeLine: {
    width: 2,
    height: 30,
    backgroundColor: '#dee2e6',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 25,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  cardSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2E8B57',
    marginBottom: 15,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionChip: {
    backgroundColor: '#f8f9fa',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  optionChipSelected: {
    backgroundColor: '#FF8C00',
    borderColor: '#FF8C00',
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#2E8B57',
  },
  optionTextSelected: {
    color: '#ffffff',
  },
  timeOptions: {
    gap: 15,
  },
  timeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 20,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  timeOptionSelected: {
    backgroundColor: '#FF8C00',
    borderColor: '#FF8C00',
  },
  timeOptionText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2E8B57',
    marginLeft: 12,
  },
  timeOptionTextSelected: {
    color: '#ffffff',
  },
  textArea: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#2E8B57',
    borderWidth: 1,
    borderColor: '#e9ecef',
    minHeight: 100,
  },
  priceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 25,
    marginBottom: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    borderWidth: 2,
    borderColor: '#FF8C00',
  },
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  priceLabel: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#2E8B57',
  },
  priceAmount: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FF8C00',
  },
  priceNote: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    textAlign: 'center',
  },
  submitButton: {
    borderRadius: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    marginBottom: 20,
  },
  submitGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 20,
    gap: 12,
  },
  submitText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
});