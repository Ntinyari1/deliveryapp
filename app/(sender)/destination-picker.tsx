import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, MapPin, Search, Navigation, Clock } from 'lucide-react-native';

export default function DestinationPicker() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  // Popular destinations in Nairobi
  const popularDestinations = [
    { id: '1', name: 'Westlands Shopping Mall', area: 'Westlands', distance: '2.5 km', eta: '8 mins' },
    { id: '2', name: 'Karen Shopping Centre', area: 'Karen', distance: '12 km', eta: '25 mins' },
    { id: '3', name: 'Sarit Centre', area: 'Westlands', distance: '3.2 km', eta: '12 mins' },
    { id: '4', name: 'Junction Mall', area: 'Ngong Road', distance: '8.5 km', eta: '18 mins' },
    { id: '5', name: 'Village Market', area: 'Gigiri', distance: '15 km', eta: '30 mins' },
    { id: '6', name: 'Yaya Centre', area: 'Kilimani', distance: '5.2 km', eta: '15 mins' },
    { id: '7', name: 'ABC Place', area: 'Waiyaki Way', distance: '4.8 km', eta: '14 mins' },
    { id: '8', name: 'Galleria Mall', area: 'Langata', distance: '10 km', eta: '22 mins' },
  ];

  const recentDestinations = [
    { id: 'r1', name: 'Karen Shopping Centre', area: 'Karen', lastUsed: '2 days ago' },
    { id: 'r2', name: 'Westlands Shopping Mall', area: 'Westlands', lastUsed: '1 week ago' },
    { id: 'r3', name: 'Junction Mall', area: 'Ngong Road', lastUsed: '2 weeks ago' },
  ];

  const filteredDestinations = popularDestinations.filter(dest =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLocationSelect = (location: any) => {
    setSelectedLocation(location);
  };

  const handleConfirmDestination = () => {
    if (!selectedLocation) {
      Alert.alert('Select Destination', 'Please select a destination to continue');
      return;
    }

    // Navigate back to send page with selected destination
    router.push({
      pathname: '/(sender)/send',
      params: { 
        destination: selectedLocation.name,
        destinationArea: selectedLocation.area 
      }
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#228B22', '#32CD32']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft color="#ffffff" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>📍 Select Destination</Text>
          <Text style={styles.headerSubtitle}>Choose where to send your package</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search color="#666666" size={20} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search for a location..."
            placeholderTextColor="#999999"
          />
        </View>

        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Current Location */}
          <TouchableOpacity style={styles.currentLocationButton}>
            <View style={styles.currentLocationIcon}>
              <Navigation color="#32CD32" size={20} />
            </View>
            <View style={styles.locationInfo}>
              <Text style={styles.locationName}>Use Current Location</Text>
              <Text style={styles.locationSubtext}>Automatically detect your location</Text>
            </View>
          </TouchableOpacity>

          {/* Recent Destinations */}
          {searchQuery === '' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🕒 Recent Destinations</Text>
              {recentDestinations.map((dest) => (
                <TouchableOpacity
                  key={dest.id}
                  style={[
                    styles.destinationCard,
                    selectedLocation?.id === dest.id && styles.selectedCard
                  ]}
                  onPress={() => handleLocationSelect(dest)}
                >
                  <View style={styles.destinationIcon}>
                    <Clock color="#666666" size={18} />
                  </View>
                  <View style={styles.destinationInfo}>
                    <Text style={styles.destinationName}>{dest.name}</Text>
                    <Text style={styles.destinationArea}>{dest.area} • {dest.lastUsed}</Text>
                  </View>
                  {selectedLocation?.id === dest.id && (
                    <View style={styles.selectedIndicator}>
                      <View style={styles.selectedDot} />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Popular Destinations */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {searchQuery ? `🔍 Search Results (${filteredDestinations.length})` : '🏢 Popular Destinations'}
            </Text>
            {filteredDestinations.map((dest) => (
              <TouchableOpacity
                key={dest.id}
                style={[
                  styles.destinationCard,
                  selectedLocation?.id === dest.id && styles.selectedCard
                ]}
                onPress={() => handleLocationSelect(dest)}
              >
                <View style={styles.destinationIcon}>
                  <MapPin color="#32CD32" size={18} />
                </View>
                <View style={styles.destinationInfo}>
                  <Text style={styles.destinationName}>{dest.name}</Text>
                  <Text style={styles.destinationArea}>{dest.area}</Text>
                  <Text style={styles.destinationMeta}>{dest.distance} • {dest.eta}</Text>
                </View>
                {selectedLocation?.id === dest.id && (
                  <View style={styles.selectedIndicator}>
                    <View style={styles.selectedDot} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {filteredDestinations.length === 0 && searchQuery !== '' && (
            <View style={styles.noResults}>
              <MapPin color="#999999" size={48} />
              <Text style={styles.noResultsText}>No locations found</Text>
              <Text style={styles.noResultsSubtext}>Try searching with different keywords</Text>
            </View>
          )}
        </ScrollView>

        {/* Confirm Button */}
        {selectedLocation && (
          <View style={styles.confirmContainer}>
            <View style={styles.selectedLocationInfo}>
              <Text style={styles.selectedLocationName}>{selectedLocation.name}</Text>
              <Text style={styles.selectedLocationArea}>{selectedLocation.area}</Text>
            </View>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirmDestination}
            >
              <LinearGradient
                colors={['#32CD32', '#228B22']}
                style={styles.confirmButtonGradient}
              >
                <Text style={styles.confirmButtonText}>Confirm Destination</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 30,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333333',
    marginLeft: 12,
  },
  scrollContent: {
    flex: 1,
  },
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: '#32CD32',
  },
  currentLocationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(50, 205, 50, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#32CD32',
    marginBottom: 4,
  },
  locationSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#228B22',
    marginBottom: 15,
  },
  destinationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#32CD32',
    backgroundColor: 'rgba(50, 205, 50, 0.05)',
  },
  destinationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  destinationInfo: {
    flex: 1,
  },
  destinationName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: 4,
  },
  destinationArea: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginBottom: 2,
  },
  destinationMeta: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999999',
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#32CD32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff',
  },
  noResults: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#666666',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#999999',
    textAlign: 'center',
  },
  confirmContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  selectedLocationInfo: {
    marginBottom: 20,
  },
  selectedLocationName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#228B22',
    marginBottom: 4,
  },
  selectedLocationArea: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  confirmButton: {
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  confirmButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 15,
  },
  confirmButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
});