import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Filter, Star, Clock, Package, MapPin, ArrowLeft, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function DeliveryHistory() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const deliveries = [
    {
      id: '1',
      from: 'Westlands Shopping Mall',
      to: 'Karen Shopping Centre',
      date: '2024-01-15',
      time: '14:30',
      status: 'delivered',
      amount: 'KSh 350',
      riderName: 'James Mwangi',
      rating: 5,
      packageType: 'Document',
    },
    {
      id: '2',
      from: 'CBD - Kencom',
      to: 'Kilimani',
      date: '2024-01-14',
      time: '10:15',
      status: 'delivered',
      amount: 'KSh 280',
      riderName: 'Mary Wanjiku',
      rating: 4,
      packageType: 'Small Package',
    },
    {
      id: '3',
      from: 'Parklands',
      to: 'Lavington',
      date: '2024-01-13',
      time: '16:45',
      status: 'delivered',
      amount: 'KSh 420',
      riderName: 'John Kimani',
      rating: 5,
      packageType: 'Electronics',
    },
    {
      id: '4',
      from: 'Gigiri',
      to: 'Runda',
      date: '2024-01-12',
      time: '09:20',
      status: 'cancelled',
      amount: 'KSh 300',
      riderName: null,
      rating: null,
      packageType: 'Fragile Item',
    },
  ];

  const filters = [
    { key: 'all', label: 'All', count: deliveries.length },
    { key: 'delivered', label: 'Delivered', count: deliveries.filter(d => d.status === 'delivered').length },
    { key: 'cancelled', label: 'Cancelled', count: deliveries.filter(d => d.status === 'cancelled').length },
  ];

  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesFilter = selectedFilter === 'all' || delivery.status === selectedFilter;
    const matchesSearch = searchQuery === '' || 
      delivery.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.to.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return '#32CD32';
      case 'cancelled': return '#FF6347';
      default: return '#666666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const renderDeliveryItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.deliveryCard} activeOpacity={0.8}>
      <View style={styles.deliveryHeader}>
        <View style={styles.routeContainer}>
          <View style={styles.locationPoint}>
            <MapPin color="#32CD32" size={16} />
            <Text style={styles.locationText} numberOfLines={1}>{item.from}</Text>
          </View>
          <ArrowRight color="#999999" size={16} style={styles.routeArrow} />
          <View style={styles.locationPoint}>
            <MapPin color="#FF6347" size={16} />
            <Text style={styles.locationText} numberOfLines={1}>{item.to}</Text>
          </View>
        </View>

        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '15' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>

      <View style={styles.deliveryDetails}>
        <View style={styles.detailRow}>
          <Package color="#666666" size={16} />
          <Text style={styles.detailText}>{item.packageType}</Text>
        </View>
        <View style={styles.detailRow}>
          <Clock color="#666666" size={16} />
          <Text style={styles.detailText}>{item.date} at {item.time}</Text>
        </View>
        {item.riderName && (
          <View style={styles.detailRow}>
            <Text style={styles.riderLabel}>Rider:</Text>
            <Text style={styles.riderName}>{item.riderName}</Text>
          </View>
        )}
      </View>

      <View style={styles.deliveryFooter}>
        <Text style={styles.amountText}>{item.amount}</Text>
        {item.rating && (
          <View style={styles.ratingContainer}>
            <Star color="#FFD700" size={16} fill="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#800000', '#B22222']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft color="#ffffff" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Delivery History</Text>
          <Text style={styles.headerSubtitle}>Track your past deliveries</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Search color="#666666" size={18} />
            <Text style={styles.searchPlaceholder}>Search deliveries...</Text>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter color="#FF8C00" size={20} />
          </TouchableOpacity>
        </View>

        {/* Filter Chips */}
        <View style={styles.filtersContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterChip,
                selectedFilter === filter.key && styles.filterChipActive
              ]}
              onPress={() => setSelectedFilter(filter.key)}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.filterChipText,
                selectedFilter === filter.key && styles.filterChipTextActive
              ]}>
                {filter.label} ({filter.count})
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Deliveries List */}
        <FlatList
          data={filteredDeliveries}
          renderItem={renderDeliveryItem}
          keyExtractor={(item) => item.id}
          style={styles.deliveryList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
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
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 15,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchPlaceholder: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginLeft: 12,
  },
  filterButton: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  filtersContainer: {
    flexDirection: 'row',
    marginBottom: 25,
    gap: 12,
  },
  filterChip: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  filterChipActive: {
    backgroundColor: '#FF8C00',
  },
  filterChipText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FF8C00',
  },
  filterChipTextActive: {
    color: '#ffffff',
  },
  deliveryList: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 120,
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
    marginBottom: 15,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  locationPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 6,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FF8C00',
    flex: 1,
  },
  routeArrow: {
    marginHorizontal: 5,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  deliveryDetails: {
    marginBottom: 15,
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  riderLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666666',
  },
  riderName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FF8C00',
  },
  deliveryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  amountText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FF8C00',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FF8C00',
  },
});