import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Package, Clock, Star, TrendingUp, Plus, ArrowRight } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';

const { width } = Dimensions.get('window');

export default function SenderHome() {
  const router = useRouter();
  const { user } = useAuth();

  const stats = [
    { label: 'Total Deliveries', value: '24', icon: Package, color: '#FF8C00' },
    { label: 'Pending', value: '2', icon: Clock, color: '#FFD700' },
    { label: 'Rating', value: '4.8', icon: Star, color: '#32CD32' },
    { label: 'Saved', value: '15%', icon: TrendingUp, color: '#FF6347' },
  ];

  const recentDeliveries = [
    {
      id: '1',
      from: 'Westlands',
      to: 'Karen',
      status: 'Delivered',
      date: '2 hours ago',
      amount: 'KSh 350',
    },
    {
      id: '2',
      from: 'CBD',
      to: 'Kilimani',
      status: 'In Transit',
      date: '1 day ago',
      amount: 'KSh 280',
    },
    {
      id: '3',
      from: 'Parklands',
      to: 'Lavington',
      status: 'Delivered',
      date: '3 days ago',
      amount: 'KSh 420',
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2E8B57', '#3CB371']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
          <Text style={styles.subtitle}>Ready to send a package?</Text>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Stats Grid */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>📊 Your Overview</Text>
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

        {/* Send Package Button */}
        <TouchableOpacity
          style={styles.sendPackageButton}
          onPress={() => router.push('/(sender)/send')}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#FF8C00', '#FF7F00']}
            style={styles.sendButtonGradient}
          >
            <Plus color="#ffffff" size={24} />
            <Text style={styles.sendButtonText}>Send a Package</Text>
            <ArrowRight color="#ffffff" size={20} />
          </LinearGradient>
        </TouchableOpacity>

        {/* Recent Deliveries */}
        <View style={styles.deliveriesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📦 Recent Deliveries</Text>
            <TouchableOpacity onPress={() => router.push('/(sender)/history')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {recentDeliveries.map((delivery) => (
            <TouchableOpacity key={delivery.id} style={styles.deliveryCard} activeOpacity={0.8}>
              <View style={styles.deliveryHeader}>
                <View style={styles.routeContainer}>
                  <Text style={styles.routeText}>{delivery.from}</Text>
                  <ArrowRight color="#999999" size={16} />
                  <Text style={styles.routeText}>{delivery.to}</Text>
                </View>
                <Text style={styles.amountText}>{delivery.amount}</Text>
              </View>
              
              <View style={styles.deliveryFooter}>
                <View style={[
                  styles.statusBadge,
                  delivery.status === 'Delivered' ? styles.statusDelivered : styles.statusInTransit
                ]}>
                  <Text style={[
                    styles.statusText,
                    delivery.status === 'Delivered' ? styles.statusDeliveredText : styles.statusInTransitText
                  ]}>
                    {delivery.status}
                  </Text>
                </View>
                <Text style={styles.dateText}>{delivery.date}</Text>
              </View>
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
    paddingTop: 70,
    paddingBottom: 40,
    paddingHorizontal: 25,
  },
  headerContent: {
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  userName: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
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
    paddingBottom: 120, // Space for tab bar
  },
  statsSection: {
    marginBottom: 35,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#2E8B57',
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
    color: '#FF8C00',
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
    color: '#2E8B57',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666666',
    textAlign: 'center',
  },
  sendPackageButton: {
    marginBottom: 35,
    borderRadius: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  sendButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 20,
    gap: 12,
  },
  sendButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    flex: 1,
    textAlign: 'center',
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
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2E8B57',
  },
  amountText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FF8C00',
  },
  deliveryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusDelivered: {
    backgroundColor: 'rgba(50, 205, 50, 0.15)',
  },
  statusInTransit: {
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
  },
  statusText: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
  },
  statusDeliveredText: {
    color: '#32CD32',
  },
  statusInTransitText: {
    color: '#FFD700',
  },
  dateText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
});