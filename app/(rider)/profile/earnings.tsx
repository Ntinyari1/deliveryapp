import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, DollarSign, TrendingUp, Calendar, Download } from 'lucide-react-native';

export default function RiderEarnings() {
  const router = useRouter();

  const earningsData = {
    today: 2450,
    thisWeek: 12800,
    thisMonth: 45600,
    total: 156000,
  };

  const recentPayouts = [
    { id: '1', amount: 12800, date: '2024-01-15', status: 'completed', method: 'M-Pesa' },
    { id: '2', amount: 8900, date: '2024-01-08', status: 'completed', method: 'Bank Transfer' },
    { id: '3', amount: 15600, date: '2024-01-01', status: 'completed', method: 'M-Pesa' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#228B22', '#32CD32']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft color="#ffffff" size={28} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>💰 Earnings & Payouts</Text>
          <Text style={styles.headerSubtitle}>Track your earnings and payments</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Earnings Overview */}
        <View style={styles.overviewSection}>
          <Text style={styles.sectionTitle}>📊 Earnings Overview</Text>
          
          <View style={styles.earningsGrid}>
            <View style={styles.earningsCard}>
              <Text style={styles.earningsLabel}>Today</Text>
              <Text style={styles.earningsAmount}>KSh {earningsData.today.toLocaleString()}</Text>
            </View>
            
            <View style={styles.earningsCard}>
              <Text style={styles.earningsLabel}>This Week</Text>
              <Text style={styles.earningsAmount}>KSh {earningsData.thisWeek.toLocaleString()}</Text>
            </View>
            
            <View style={styles.earningsCard}>
              <Text style={styles.earningsLabel}>This Month</Text>
              <Text style={styles.earningsAmount}>KSh {earningsData.thisMonth.toLocaleString()}</Text>
            </View>
            
            <View style={styles.earningsCard}>
              <Text style={styles.earningsLabel}>Total Earned</Text>
              <Text style={styles.earningsAmount}>KSh {earningsData.total.toLocaleString()}</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <Download color="#32CD32" size={24} />
            </View>
            <Text style={styles.actionText}>Request Payout</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <Calendar color="#32CD32" size={24} />
            </View>
            <Text style={styles.actionText}>View Report</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Payouts */}
        <View style={styles.payoutsSection}>
          <Text style={styles.sectionTitle}>💳 Recent Payouts</Text>
          
          {recentPayouts.map((payout) => (
            <View key={payout.id} style={styles.payoutCard}>
              <View style={styles.payoutInfo}>
                <Text style={styles.payoutAmount}>KSh {payout.amount.toLocaleString()}</Text>
                <Text style={styles.payoutDate}>{payout.date}</Text>
                <Text style={styles.payoutMethod}>{payout.method}</Text>
              </View>
              <View style={styles.payoutStatus}>
                <Text style={styles.payoutStatusText}>Completed</Text>
              </View>
            </View>
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
    paddingTop: 0,
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
  overviewSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#228B22',
    marginBottom: 20,
  },
  earningsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  earningsCard: {
    width: '47%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  earningsLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666666',
    marginBottom: 8,
  },
  earningsAmount: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#32CD32',
  },
  actionsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(50, 205, 50, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#228B22',
  },
  payoutsSection: {
    marginBottom: 140,
  },
  payoutCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  payoutInfo: {
    flex: 1,
  },
  payoutAmount: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#32CD32',
    marginBottom: 4,
  },
  payoutDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginBottom: 2,
  },
  payoutMethod: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999999',
  },
  payoutStatus: {
    backgroundColor: 'rgba(50, 205, 50, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  payoutStatusText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#32CD32',
  },
});