import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Package, Clock, DollarSign, Navigation } from 'lucide-react-native';

export default function RiderDeliveries() {
  const [isOnline, setIsOnline] = useState(false);

  const availableDeliveries = [
    {
      id: '1',
      from: 'Westlands Shopping Mall',
      to: 'Karen Shopping Centre',
      distance: '12 km',
      payment: 'KSh 350',
      packageType: 'Document',
      estimatedTime: '25 mins',
      priority: 'high',
    },
    {
      id: '2',
      from: 'CBD - Kencom',
      to: 'Kilimani',
      distance: '5.2 km',
      payment: 'KSh 280',
      packageType: 'Small Package',
      estimatedTime: '15 mins',
      priority: 'medium',
    },
    {
      id: '3',
      from: 'Parklands',
      to: 'Lavington',
      distance: '8.5 km',
      payment: 'KSh 420',
      packageType: 'Electronics',
      estimatedTime: '18 mins',
      priority: 'high',
    },
    {
      id: '4',
      from: 'Gigiri',
      to: 'Runda',
      distance: '6.8 km',
      payment: 'KSh 300',
      packageType: 'Fragile Item',
      estimatedTime: '20 mins',
      priority: 'low',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#FF6347';
      case 'medium': return '#FFD700';
      case 'low': return '#32CD32';
      default: return '#999999';
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#228B22', '#32CD32']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>🚚 Available Deliveries</Text>
          <Text style={styles.headerSubtitle}>Accept deliveries to start earning</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Online Status */}
        <View style={styles.statusCard}>
          <View style={styles.statusInfo}>
            <Text style={styles.statusTitle}>You are {isOnline ? 'Online' : 'Offline'}</Text>
            <Text style={styles.statusSubtitle}>
              {isOnline ? 'Ready to receive delivery requests' : 'Turn on to start receiving requests'}
            </Text>
          </View>
          <Switch
            value={isOnline}
            onValueChange={setIsOnline}
            trackColor={{ false: '#E0E0E0', true: '#32CD32' }}
            thumbColor={isOnline ? '#ffffff' : '#f4f3f4'}
          />
        </View>

        {/* Deliveries List */}
        <ScrollView 
          style={styles.deliveriesList} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        >
          {isOnline ? (
            availableDeliveries.map((delivery) => (
              <TouchableOpacity key={delivery.id} style={styles.deliveryCard} activeOpacity={0.8}>
                <View style={styles.deliveryHeader}>
                  <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(delivery.priority) + '15' }]}>
                    <Text style={[styles.priorityText, { color: getPriorityColor(delivery.priority) }]}>
                      {delivery.priority.toUpperCase()}
                    </Text>
                  </View>
                  <Text style={styles.paymentText}>{delivery.payment}</Text>
                </View>

                <View style={styles.routeSection}>
                  <View style={styles.routePoint}>
                    <View style={styles.routeIconPickup} />
                    <Text style={styles.routeText}>{delivery.from}</Text>
                  </View>
                  <View style={styles.routeLine} />
                  <View style={styles.routePoint}>
                    <View style={styles.routeIconDropoff} />
                    <Text style={styles.routeText}>{delivery.to}</Text>
                  </View>
                </View>

                <View style={styles.deliveryDetails}>
                  <View style={styles.detailItem}>
                    <Package color="#666666" size={16} />
                    <Text style={styles.detailText}>{delivery.packageType}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Navigation color="#666666" size={16} />
                    <Text style={styles.detailText}>{delivery.distance}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Clock color="#666666" size={16} />
                    <Text style={styles.detailText}>{delivery.estimatedTime}</Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.acceptButton}>
                  <LinearGradient
                    colors={['#32CD32', '#228B22']}
                    style={styles.acceptButtonGradient}
                  >
                    <Text style={styles.acceptButtonText}>Accept Delivery</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.offlineMessage}>
              <Text style={styles.offlineTitle}>You're Offline</Text>
              <Text style={styles.offlineSubtitle}>Turn on your status to start receiving delivery requests</Text>
            </View>
          )}
        </ScrollView>
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
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 25,
    marginBottom: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  statusInfo: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#228B22',
    marginBottom: 4,
  },
  statusSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  deliveriesList: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 140,
  },
  deliveryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  paymentText: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#32CD32',
  },
  routeSection: {
    marginBottom: 20,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  routeIconPickup: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#228B22',
    marginRight: 16,
  },
  routeIconDropoff: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#32CD32',
    marginRight: 16,
  },
  routeText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#228B22',
    flex: 1,
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: '#E0E0E0',
    marginLeft: 6,
    marginVertical: 4,
  },
  deliveryDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  acceptButton: {
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  acceptButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 12,
  },
  acceptButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  offlineMessage: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  offlineTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#666666',
    marginBottom: 8,
  },
  offlineSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#999999',
    textAlign: 'center',
  },
});