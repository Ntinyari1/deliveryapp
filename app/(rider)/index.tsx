import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Package, DollarSign, Star, TrendingUp, Play, Clock } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';

const { width } = Dimensions.get('window');

export default function RiderHome() {
  const router = useRouter();
  const { user } = useAuth();

  const stats = [
    { label: 'Total Deliveries', value: '156', icon: Package, color: '#32CD32' },
    { label: 'Today\'s Earnings', value: 'KSh 2,450', icon: DollarSign, color: '#FFD700' },
    { label: 'Rating', value: '4.9', icon: Star, color: '#FF6347' },
    { label: 'This Week', value: '23', icon: TrendingUp, color: '#1E90FF' },
  ];

  const availableDeliveries = [
    {
      id: '1',
      from: 'Westlands Shopping Mall',
      to: 'Karen Shopping Centre',
      distance: '12 km',
      payment: 'KSh 350',
      packageType: 'Document',
      estimatedTime: '25 mins',
    },
    {
      id: '2',
      from: 'CBD - Kencom',
      to: 'Kilimani',
      distance: '5.2 km',
      payment: 'KSh 280',
      packageType: 'Small Package',
      estimatedTime: '15 mins',
    },
    {
      id: '3',
      from: 'Parklands',
      to: 'Lavington',
      distance: '8.5 km',
      payment: 'KSh 420',
      packageType: 'Electronics',
      estimatedTime: '18 mins',
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#228B22', '#32CD32']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.userName}>{user?.name || 'Rider'}</Text>
          <Text style={styles.subtitle}>Ready to earn today?</Text>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Stats Grid */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>📊 Your Performance</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <TouchableOpacity key={index} style={styles.statCard} activeOpacity={0.8}>
                <View style={[styles.statIconContainer, { backgroundColor: stat.color + '15' }]}>
                  <stat.icon color={stat.color} size={28} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Go Online Button */}
        <TouchableOpacity
          style={styles.onlineButton}
          onPress={() => router.push('/(rider)/deliveries')}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#32CD32', '#228B22']}
            style={styles.onlineButtonGradient}
          >
            <Play color="#ffffff" size={24} />
            <Text style={styles.onlineButtonText}>Go Online</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Available Deliveries */}
        <View style={styles.deliveriesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📦 Available Deliveries</Text>
            <TouchableOpacity onPress={() => router.push('/(rider)/deliveries')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {availableDeliveries.map((delivery) => (
            <TouchableOpacity key={delivery.id} style={styles.deliveryCard} activeOpacity={0.8}>
              <View style={styles.deliveryHeader}>
                <View style={styles.routeContainer}>
                  <Text style={styles.routeText}>{delivery.from}</Text>
                  <MapPin color="#999999" size={16} />
                  <Text style={styles.routeText}>{delivery.to}</Text>
                </View>
                <Text style={styles.paymentText}>{delivery.payment}</Text>
              </View>
              
              <View style={styles.deliveryDetails}>
                <View style={styles.detailItem}>
                  <Package color="#666666" size={16} />
                  <Text style={styles.detailText}>{delivery.packageType}</Text>
                </View>
                <View style={styles.detailItem}>
                  <MapPin color="#666666" size={16} />
                  <Text style={styles.detailText}>{delivery.distance}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Clock color="#666666" size={16} />
                  <Text style={styles.detailText}>{delivery.estimatedTime}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.acceptButton}>
                <Text style={styles.acceptButtonText}>Accept Delivery</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
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
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 25,
  },
  headerContent: {
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 20,
    fontFamily: 'regular',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  userName: {
    fontSize: 25,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  scrollContent: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 140,
  },
  statsSection: {
    marginBottom: 35,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#228B22',
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  viewAllText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#228B22',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 70) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    minHeight: 140,
    justifyContent: 'center',
  },
  statIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  statValue: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#228B22',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666666',
    textAlign: 'center',
  },
  onlineButton: {
    marginBottom: 35,
    borderRadius: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  onlineButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 20,
    gap: 12,
  },
  onlineButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  deliveriesSection: {
    marginBottom: 40,
  },
  deliveryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  routeText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#228B22',
    flex: 1,
  },
  paymentText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#32CD32',
  },
  deliveryDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  acceptButton: {
    backgroundColor: '#228B22',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  acceptButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
});