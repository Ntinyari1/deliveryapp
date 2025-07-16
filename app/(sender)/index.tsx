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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#228B22', '#32CD32']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
          <Text style={styles.subtitle}>Ready to send a package?</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Your Statistics</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, idx) => (
              <View key={idx} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: stat.color + '15' }]}>
                  <stat.icon color={stat.color} size={24} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Deliveries Section */}
        <View style={styles.recentContainer}>
          <View style={styles.recentHeader}>
            <Text style={styles.sectionTitle}>Recent Deliveries</Text>
            <TouchableOpacity onPress={() => router.push('/(sender)/history')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {recentDeliveries.map((delivery) => (
            <View key={delivery.id} style={styles.deliveryCard}>
              <View style={styles.deliveryInfo}>
                <Text style={styles.deliveryRoute}>{delivery.from} → {delivery.to}</Text>
                <Text style={styles.deliveryStatus}>{delivery.status}</Text>
              </View>
              <View style={styles.deliveryMeta}>
                <Text style={styles.deliveryDate}>{delivery.date}</Text>
                <Text style={styles.deliveryAmount}>{delivery.amount}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* New Delivery Button */}
        <TouchableOpacity
          style={styles.newDeliveryButton}
          onPress={() => router.push('/(sender)/send')}
          activeOpacity={0.8}
        >
          <Plus color="#fff" size={22} />
          <Text style={styles.newDeliveryText}>New Delivery</Text>
          <ArrowRight color="#fff" size={20} />
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
    marginTop: 0,           // Reduced from 30 or more
  },
  greeting: {
    fontSize: 18,           // Reduced
    color: '#fff',
    marginBottom: 2,
  },
  userName: {
    fontSize: 25,           // Reduced
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 18,           // Reduced
    color: '#e0e0e0',
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 40,
  },
  statsContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 18,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    width: width / 2 - 32,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  statIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  recentContainer: {
    marginBottom: 30,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 16,
    color: '#228B22',
    fontWeight: 'bold',
  },
  deliveryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 1,
  },
  deliveryInfo: {
    flex: 2,
  },
  deliveryRoute: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  deliveryStatus: {
    fontSize: 15,
    color: '#32CD32',
  },
  deliveryMeta: {
    flex: 1,
    alignItems: 'flex-end',
  },
  deliveryDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 2,
  },
  deliveryAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#228B22',
  },
  newDeliveryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#228B22',
    borderRadius: 22,
    paddingVertical: 14,
    paddingHorizontal: 28,
    alignSelf: 'center',
    marginTop: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
  },
  newDeliveryText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});