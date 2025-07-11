import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Package, Car, Settings } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function AuthIndex() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/auth/role-selection');
  };

  return (
    <LinearGradient
      colors={['#800000', '#B22222']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>TR</Text>
          </View>
          <Text style={styles.title}>TumaRide</Text>
          <Text style={styles.subtitle}>Swift Delivery, Trusted Journey</Text>
        </View>

        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Package color="#ffffff" size={32} />
            </View>
            <Text style={styles.featureTitle}>Send Parcels</Text>
            <Text style={styles.featureDescription}>
              Quick and reliable delivery service
            </Text>
          </View>
          
          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Car color="#ffffff" size={32} />
            </View>
            <Text style={styles.featureTitle}>Earn Money</Text>
            <Text style={styles.featureDescription}>
              Become a rider and earn on your schedule
            </Text>
          </View>
          
          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Settings color="#ffffff" size={32} />
            </View>
            <Text style={styles.featureTitle}>Manage Platform</Text>
            <Text style={styles.featureDescription}>
              Administrative control and oversight
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
          <Text style={styles.getStartedButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 80,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  title: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  featuresContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  feature: {
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 20,
  },
  getStartedButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 40,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  getStartedButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#800000',
  },
});