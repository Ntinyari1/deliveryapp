import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, MapPin, Phone, MessageCircle, Star, Clock, Navigation } from 'lucide-react-native';

export default function DeliveryTracking() {
  const router = useRouter();
  const [deliveryStatus, setDeliveryStatus] = useState('rider_assigned');
  const [estimatedTime, setEstimatedTime] = useState('5 mins');

  const statusSteps = [
    { id: 'rider_assigned', title: 'Rider Assigned', completed: true },
    { id: 'pickup_in_progress', title: 'Heading to Pickup', completed: true },
    { id: 'package_picked', title: 'Package Picked Up', completed: false },
    { id: 'in_transit', title: 'In Transit', completed: false },
    { id: 'delivered', title: 'Delivered', completed: false },
  ];

  useEffect(() => {
    // Simulate delivery progress
    const timer = setTimeout(() => {
      setDeliveryStatus('pickup_in_progress');
      setEstimatedTime('3 mins');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleCompleteDelivery = () => {
    Alert.alert(
      'Delivery Complete',
      'Your package has been delivered successfully! Please rate your experience.',
      [
        { text: 'Rate Later', style: 'cancel' },
        { text: 'Rate Now', onPress: () => router.push('/(sender)/rating') }
      ]
    );
  };

  const getStatusIndex = (status: string) => {
    return statusSteps.findIndex(step => step.id === status);
  };

  const currentStatusIndex = getStatusIndex(deliveryStatus);

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
          <Text style={styles.headerTitle}>📍 Track Delivery</Text>
          <Text style={styles.headerSubtitle}>Live tracking of your package</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.mapPlaceholder}>
          <MapPin color="#FF8C00" size={28} />
          <Text style={styles.mapText}>Live Map View</Text>
          <Text style={styles.mapSubtext}>Rider location and route</Text>
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View style={styles.statusIcon}>
              <Navigation color="#FF8C00" size={18} />
            </View>
            <View style={styles.statusInfo}>
              <Text style={styles.statusTitle}>
                {statusSteps[currentStatusIndex]?.title}
              </Text>
              <Text style={styles.statusSubtitle}>
                Estimated time: {estimatedTime}
              </Text>
            </View>
          </View>

          <View style={styles.progressContainer}>
            {statusSteps.map((step, index) => (
              <View key={step.id} style={styles.progressStep}>
                <View style={[
                  styles.progressDot,
                  index <= currentStatusIndex ? styles.progressDotActive : styles.progressDotInactive
                ]}>
                  {index <= currentStatusIndex && (
                    <View style={styles.progressDotInner} />
                  )}
                </View>
                <Text style={[
                  styles.progressText,
                  index <= currentStatusIndex ? styles.progressTextActive : styles.progressTextInactive
                ]}>
                  {step.title}
                </Text>
                {index < statusSteps.length - 1 && (
                  <View style={[
                    styles.progressLine,
                    index < currentStatusIndex ? styles.progressLineActive : styles.progressLineInactive
                  ]} />
                )}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.riderCard}>
          <Text style={styles.riderTitle}>Your Rider</Text>
          <View style={styles.riderInfo}>
            <View style={styles.riderDetails}>
              <Text style={styles.riderName}>James Mwangi</Text>
              <View style={styles.riderRating}>
                <Star color="#FFC107" size={14} fill="#FFC107" />
                <Text style={styles.ratingText}>4.8</Text>
              </View>
              <Text style={styles.vehicleText}>Honda CB 150</Text>
            </View>
            <View style={styles.riderActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Phone color="#FF8C00" size={16} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <MessageCircle color="#FF8C00" size={16} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.tripSummary}>
          <Text style={styles.summaryTitle}>Trip Summary</Text>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>From:</Text>
            <Text style={styles.summaryValue}>Westlands Shopping Mall</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>To:</Text>
            <Text style={styles.summaryValue}>Karen Shopping Centre</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Package:</Text>
            <Text style={styles.summaryValue}>Document • Small</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Amount:</Text>
            <Text style={styles.summaryValue}>KSh 350</Text>
          </View>
        </View>

        {deliveryStatus === 'delivered' && (
          <TouchableOpacity style={styles.completeButton} onPress={handleCompleteDelivery}>
            <LinearGradient
              colors={['#32CD32', '#228B22']}
              style={styles.completeButtonGradient}
            >
              <Text style={styles.completeButtonText}>Delivery Complete</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </ScrollView>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  mapPlaceholder: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mapText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginTop: 12,
  },
  mapSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginTop: 4,
  },
  statusCard: {
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
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 140, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  statusInfo: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
  },
  statusSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginTop: 4,
  },
  progressContainer: {
    paddingLeft: 20,
  },
  progressStep: {
    position: 'relative',
    paddingBottom: 16,
  },
  progressDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressDotActive: {
    backgroundColor: '#FF8C00',
  },
  progressDotInactive: {
    backgroundColor: '#E0E0E0',
  },
  progressDotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff',
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginLeft: 24,
    marginTop: -24,
  },
  progressTextActive: {
    color: '#333333',
  },
  progressTextInactive: {
    color: '#999999',
  },
  progressLine: {
    position: 'absolute',
    left: 7,
    top: 16,
    width: 2,
    height: 16,
  },
  progressLineActive: {
    backgroundColor: '#FF8C00',
  },
  progressLineInactive: {
    backgroundColor: '#E0E0E0',
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
  riderTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: 16,
  },
  riderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  riderDetails: {
    flex: 1,
  },
  riderName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: 4,
  },
  riderRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#333333',
    marginLeft: 4,
  },
  vehicleText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  riderActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 140, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tripSummary: {
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
  summaryTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333333',
    marginBottom: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#333333',
  },
  completeButton: {
    borderRadius: 12,
    marginBottom: 32,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  completeButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 12,
  },
  completeButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
});