import { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        if (user) {
          // Navigate to the appropriate role-based route
          if (user.role === 'sender') {
            router.replace('/(sender)');
          } else if (user.role === 'rider') {
            router.replace('/(rider)');
          } else if (user.role === 'admin') {
            router.replace('/(admin)');
          } else {
            router.replace('/auth');
          }
        } else {
          router.replace('/auth');
        }
      }, 1000);
    }
  }, [user, isLoading, router]);

  return (
    <LinearGradient
      colors={['#FF8C00', '#FF6347']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>TR</Text>
          </View>
        </View>
        
        <Text style={styles.title}>TumaRide</Text>
        <Text style={styles.subtitle}>Swift Delivery, Trusted Journey</Text>
        
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logoText: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  title: {
    fontSize: 42,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 60,
  },
  loadingContainer: {
    marginTop: 20,
  },
});