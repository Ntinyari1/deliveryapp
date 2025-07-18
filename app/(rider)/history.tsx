import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Filter, Star, Clock, Package, MapPin, DollarSign } from 'lucide-react-native';

export default function RiderHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const deliveries = [
    {
      id: '1',
      from: 'Westlands Shopping Mall',
      to: 'Karen Shopping Centre',
      date: '2024-01-15',
      time: '14:30',
      status: 'completed',
      earnings: 'KSh 350',
      packageType: 'Document',
      rating: 5,
    },
    {
      id: '2',
      from: 'CBD - Kencom',
      to: 'Kilimani',
      date: '2024-01-14',
      time: '10:15',
      status: 'completed',
      earnings: 'KSh 280',
      packageType: 'Small Package',
      rating: 4,
    },
    {
      id: '3',
      from: 'Parklands',
      to: 'Lavington',
      date: '2024-01-13',
      time: '16:45',
      status: 'completed',
      earnings: 'KSh 420',
      packageType: 'Electronics',
      rating: 5,
    },
    {
      id: '4',
      from: 'Gigiri',
      to: 'Runda',
      date: '2024-01-12',
      time: '09:20',
      status: 'cancelled',
      earnings: 'KSh 0',
      packageType: 'Fragile Item',
      rating: null,
    },
  ];

  const filters = [
    { key: 'all', label: 'All', count: deliveries.length },
    { key: 'completed', label: 'Completed', count: deliveries.filter(d => d.status === 'completed').length },
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
      case 'completed': return '#32CD32';
      case 'cancelled': return '#FF6347';
      default: return '#666666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
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
      </View>

      <View style={styles.deliveryFooter}>
        <View style={styles.earningsContainer}>
          <DollarSign color="#32CD32" size={16} />
          <Text style={styles.earningsText}>{item.earnings}</Text>
        </View>
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
        colors={['#228B22', '#32CD32']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>📋 Delivery History</Text>
          <Text style={styles.headerSubtitle}>Track your completed deliveries</Text>
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
            <Filter color="#32CD32" size={20} />
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
    paddingTop: 20,
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
    padding: 10,
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
    paddingHorizontal: 13,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  filterChipActive: {
    backgroundColor: '#32CD32',
  },
  filterChipText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#32CD32',
  },
  filterChipTextActive: {
    color: '#ffffff',
  },
  deliveryList: {
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
    marginBottom: 15,
  },
  routeContainer: {
    marginBottom: 12,
    gap: 8,
  },
  locationPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#32CD32',
    flex: 1,
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
  deliveryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  earningsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  earningsText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#32CD32',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#32CD32',
  },
});