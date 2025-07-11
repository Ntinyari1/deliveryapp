import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Wallet, Settings, CircleHelp as HelpCircle, Shield, LogOut, CreditCard as Edit, Star, Package, Clock, TrendingUp, ChevronRight } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';

export default function SenderProfile() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const stats = [
    { label: 'Total Deliveries', value: '24', icon: Package, color: '#FF8C00' },
    { label: 'Average Rating', value: '4.8', icon: Star, color: '#32CD32' },
    { label: 'This Month', value: '8', icon: Clock, color: '#FFD700' },
    { label: 'Money Saved', value: '15%', icon: TrendingUp, color: '#FF6347' },
  ];

  const menuItems = [
    { 
      id: 'wallet', 
      title: 'Wallet & Payments', 
      subtitle: 'Manage your payment methods', 
      icon: Wallet, 
      color: '#FF8C00',
      route: 'wallet'
    },
    { 
      id: 'settings', 
      title: 'App Settings', 
      subtitle: 'Notifications & preferences', 
      icon: Settings, 
      color: '#32CD32',
      route: 'settings'
    },
    { 
      id: 'help', 
      title: 'Help & Support', 
      subtitle: 'Get help and contact support', 
      icon: HelpCircle, 
      color: '#1E90FF',
      route: 'help'
    },
    { 
      id: 'privacy', 
      title: 'Privacy & Security', 
      subtitle: 'Manage your privacy settings', 
      icon: Shield, 
      color: '#9370DB',
      route: 'privacy'
    },
  ];

  const handleMenuPress = (item: any) => {
    router.push(`/(sender)/${item.route}`);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to logout from your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => logout() }
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert(
      'Edit Profile',
      'Opening profile editor...',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#1a1a1a', '#2d2d2d']}
        style={styles.header}
      >
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: user?.profileImage || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Edit color="#1a1a1a" size={18} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{user?.name || 'John Doe'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'john@example.com'}</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📊 Your Statistics</Text>
          </View>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <TouchableOpacity key={index} style={styles.statCard} activeOpacity={0.8}>
                <View style={[styles.statIcon, { backgroundColor: stat.color + '15' }]}>
                  <stat.icon color={stat.color} size={24} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.menuSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>⚙️ Account Settings</Text>
          </View>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem}
              onPress={() => handleMenuPress(item)}
              activeOpacity={0.7}
            >
              <View style={[styles.menuIcon, { backgroundColor: item.color + '15' }]}>
                <item.icon color={item.color} size={24} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <ChevronRight color="#999999" size={22} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <View style={styles.logoutIcon}>
            <LogOut color="#FF4444" size={22} />
          </View>
          <Text style={styles.logoutText}>Logout from Account</Text>
          <ChevronRight color="#FF4444" size={20} />
        </TouchableOpacity>

        <Text style={styles.versionText}>TumaRide Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingBottom: 100, // Add space for tab bar
  },
  header: {
    paddingTop: 70,
    paddingBottom: 50,
    paddingHorizontal: 25,
  },
  profileSection: {
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 25,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  editButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#ffffff',
    borderRadius: 22,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  userName: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 35,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#1a1a1a',
  },
  sectionHeader: {
    marginBottom: 25,
  },
  statsContainer: {
    marginBottom: 45,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '47%',
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
  statIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  statValue: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
  menuSection: {
    marginBottom: 45,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 25,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    minHeight: 90,
  },
  menuIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  menuContent: {
    flex: 1,
    paddingRight: 15,
  },
  menuTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  menuSubtitle: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 22,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 25,
    marginBottom: 35,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: '#FFE5E5',
    minHeight: 90,
  },
  logoutIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFE5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  logoutText: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FF4444',
  },
  versionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#999999',
    textAlign: 'center',
    marginBottom: 50,
  },
});