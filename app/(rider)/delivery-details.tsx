import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useDeliveryContext, Delivery } from '../../context/DeliveryContext';

export default function DeliveryDetails() {
  const { id } = useLocalSearchParams();
  const { deliveries, completeDelivery, cancelDelivery } = useDeliveryContext();
  const router = useRouter();
  const delivery = deliveries.find((d: Delivery) => d.id === id);

  if (!delivery) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Delivery Not Found</Text>
        <Text style={styles.detail}>No delivery found with ID: {id}</Text>
      </View>
    );
  }

  const handleComplete = () => {
    completeDelivery(delivery.id);
    Alert.alert('Delivery Completed', 'This delivery has been marked as completed.');
    router.back();
  };

  const handleCancel = () => {
    cancelDelivery(delivery.id);
    Alert.alert('Delivery Cancelled', 'This delivery has been cancelled.');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery Details</Text>
      <Text style={styles.detail}><Text style={styles.label}>From:</Text> {delivery.from}</Text>
      <Text style={styles.detail}><Text style={styles.label}>To:</Text> {delivery.to}</Text>
      <Text style={styles.detail}><Text style={styles.label}>Distance:</Text> {delivery.distance}</Text>
      <Text style={styles.detail}><Text style={styles.label}>Payment:</Text> {delivery.payment}</Text>
      <Text style={styles.detail}><Text style={styles.label}>Package Type:</Text> {delivery.packageType}</Text>
      <Text style={styles.detail}><Text style={styles.label}>Estimated Time:</Text> {delivery.estimatedTime}</Text>
      <Text style={styles.detail}><Text style={styles.label}>Status:</Text> {delivery.status}</Text>
      {delivery.status === 'accepted' && (
        <View style={styles.buttonRow}>
          <View style={styles.buttonContainer}>
            <Button title="Complete" color="#228B22" onPress={handleComplete} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Cancel" color="#FF6347" onPress={handleCancel} />
          </View>
        </View>
      )}
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
  buttonRow: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 16,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
}); 