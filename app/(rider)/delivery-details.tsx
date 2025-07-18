import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const deliveries = [
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
  {
    id: '4',
    from: 'Gigiri',
    to: 'Runda',
    distance: '6.8 km',
    payment: 'KSh 300',
    packageType: 'Fragile Item',
    estimatedTime: '20 mins',
  },
];

export default function DeliveryDetails() {
  const { id } = useLocalSearchParams();
  const delivery = deliveries.find((d) => d.id === id);

  if (!delivery) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Delivery Not Found</Text>
        <Text style={styles.detail}>No delivery found with ID: {id}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery Details</Text>
      <Text style={styles.detail}><Text style={styles.label}>From:</Text> {delivery.from}</Text>
      <Text style={styles.detail}><Text style={styles.label}>To:</Text> {delivery.to}</Text>
      <Text style={styles.detail}><Text style={styles.label}>Distance:</Text> {delivery.distance}</Text>
      <Text style={styles.detail}><Text style={styles.label}>Payment:</Text> {delivery.payment}</Text>
      <Text style={styles.detail}><Text style={styles.label}>Package Type:</Text> {delivery.packageType}</Text>
      <Text style={styles.detail}><Text style={styles.label}>Estimated Time:</Text> {delivery.estimatedTime}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#228B22',
  },
  detail: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    color: '#228B22',
  },
}); 