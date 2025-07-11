import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Star, Phone, MessageCircle, Navigation } from 'lucide-react-native';

export default function RiderMatching() {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(true);
  const [matchedRider, setMatchedRider] = useState<any>(null);

  useEffect(() => {
    // Simulate rider matching process
    const timer = setTimeout(() => {
      setIsSearching(false);
      setMatchedRider({
        id: '1',
        name: 'James Mwangi',
        rating: 4.8,
        completedRides: 234,
        vehicle: 'Honda CB 150',
        estimatedTime: '5 mins',
        profileImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
        phone: '+254712345678',
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleAcceptRider = () => {
    Alert.alert(
      'Confirm Rider',
      'Are you sure you want to proceed with this rider?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', onPress: () => router.push('/(sender)/tracking') }
      ]
    );
  };

  const handleDeclineRider = () => {
    setIsSearching(true);
    setMatchedRider(null);
    
    // Simulate finding another rider
    setTimeout(() => {
      setIsSearching(false);
      setMatchedRider({
        id: '2',
        name: 'Mary Wanjiku',
        rating: 4.9,
        completedRides: 189,
        vehicle: 'Yamaha YBR 125',
        estimatedTime: '7 mins',
        profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
        phone: '+254723456789',
      });
    }, 2000);
  };

  if (isSearching) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#1a1a1a', '#2d2d2d']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <ArrowLeft color="#ffffff" size={24} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>🔍 Finding a Rider</Text>
            <Text style={styles.headerSubtitle}>Searching for nearby riders</Text>
          </View>
        </LinearGradient>

        <View style={styles.searchingContainer}>
          <View style={styles.searchingAnimation}>
            <View style={styles.pulse} />
            <View style={styles.pulseInner} />
          </View>
          <Text style={styles.searchingText}>🔍 Searching for nearby riders...</Text>
          <Text style={styles.searchingSubtext}>This usually takes a few seconds</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FF8C00', '#FF6347']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft color="#ffffff" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>🎉 Rider Found!</Text>
          <Text style={styles.headerSubtitle}>Review and confirm your rider</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.riderCard}>
          <View style={styles.riderHeader}>
            <Image
              source={{ uri: matchedRider.profileImage }}
              style={styles.riderImage}
            />
            <View style={styles.riderInfo}>
              <Text style={styles.riderName}>{matchedRider.name}</Text>
              <View style={styles.riderRating}>
                <Star color="#FFC107" size={16} fill="#FFC107" />
                <Text style={styles.ratingText}>{matchedRider.rating}</Text>
                <Text style={styles.ridesText}>({matchedRider.completedRides} rides)</Text>
              </View>
              <Text style={styles.vehicleText}>{matchedRider.vehicle}</Text>
            </View>
          </View>

          <View style={styles.riderDetails}>
            <View style={styles.detailItem}>
              <Navigation color="#FF8C00" size={20} />
              <Text style={styles.detailText}>Arrives in {matchedRider.estimatedTime}</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.contactButton}>
              <Phone color="#FF8C00" size={20} />
              <Text style={styles.contactButtonText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton}>
              <MessageCircle color="#FF8C00" size={20} />
              <Text style={styles.contactButtonText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tripDetails}>
          <Text style={styles.tripTitle}>Trip Details</Text>
          <View style={styles.tripRoute}>
            <View style={styles.routePoint}>
              <View style={styles.routeIcon} />
              <Text style={styles.routeText}>Westlands Shopping Mall</Text>
            </View>
            <View style={styles.routeLine} />
            <View style={styles.routePoint}>
              <View style={[styles.routeIcon, styles.routeIconDestination]} />
              <Text style={styles.routeText}>Karen Shopping Centre</Text>
            </View>
          </View>
          <View style={styles.tripMeta}>
            <Text style={styles.tripMetaText}>Document • Small • KSh 350</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.declineButton} onPress={handleDeclineRider}>
            <Text style={styles.declineButtonText}>Find Another Rider</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptButton} onPress={handleAcceptRider}>
            <LinearGradient
              colors={['#FF8C00', '#FF7F00']}
              style={styles.acceptButtonGradient}
            >
              <Text style={styles.acceptButtonText}>Accept Rider</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'flex-start',
  },
  backButton: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  searchingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  searchingAnimation: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  pulse: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 140, 0, 0.2)',
    position: 'absolute',
  },
  pulseInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF8C00',
  },
  searchingText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: 8,
  },
  searchingSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  riderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  riderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  riderImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  riderInfo: {
    flex: 1,
  },
  riderName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: 6,
  },
  riderRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#333333',
    marginLeft: 6,
  },
  ridesText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginLeft: 6,
  },
  vehicleText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginTop: 2,
  },
  riderDetails: {
    marginBottom: 20,
    paddingVertical: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#333333',
    marginLeft: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 140, 0, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 80,
    justifyContent: 'center',
  },
  contactButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FF8C00',
    marginLeft: 6,
  },
  tripDetails: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tripTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: 20,
  },
  tripRoute: {
    marginBottom: 20,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  routeIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF8C00',
    marginRight: 16,
  },
  routeIconDestination: {
    backgroundColor: '#32CD32',
  },
  routeText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#333333',
    flex: 1,
  },
  routeLine: {
    width: 2,
    height: 24,
    backgroundColor: '#E0E0E0',
    marginLeft: 6,
    marginVertical: 6,
  },
  tripMeta: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  tripMetaText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
    paddingHorizontal: 4,
  },
  declineButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  declineButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#333333',
  },
  acceptButton: {
    flex: 1,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  acceptButtonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  acceptButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
});