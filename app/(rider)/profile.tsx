import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { User, DollarSign, Settings, CircleHelp as HelpCircle, Shield, LogOut, CreditCard as Edit, Star, Package, Clock, TrendingUp, ChevronRight, Menu, X } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';

export default function RiderProfile() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);

  const stats = [
    { label: 'Total Deliveries', value: '156', icon: Package, color: '#32CD32' },
    { label: 'Average Rating', value: '4.9', icon: Star, color: '#FFD700' },
    { label: 'This Month', value: '23', icon: Clock, color: '#1E90FF' },
    { label: 'Total Earnings', value: 'KSh 45,600', icon: TrendingUp, color: '#FF6347' },
  ];

  const menuItems = [
    { 
      id: 'earnings', 
      title: 'Earnings & Payouts', 
      subtitle: 'View your earnings and payment history', 
      icon: DollarSign, 
      color: '#32CD32',
      route: 'profile/earnings'
    },
    { 
      id: 'settings', 
      title: 'App Settings', 
      subtitle: 'Notifications & preferences', 
      icon: Settings, 
      color: '#1E90FF',
      route: 'profile/settings'
    },
    { 
      id: 'help', 
      title: 'Help & Support', 
      subtitle: 'Get help and contact support', 
      icon: HelpCircle, 
      color: '#FFD700',
      route: 'profile/help'
    },
    { 
      id: 'privacy', 
      title: 'Privacy & Security', 
      subtitle: 'Manage your privacy settings', 
      icon: Shield, 
      color: '#9370DB',
      route: 'profile/privacy'
    },
  ];

  const handleMenuPress = (item: any) => {
    setMenuVisible(false);
    router.push({ pathname: `/(rider)/${item.route}` } as any);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to logout from your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive', 
          onPress: () => {
            logout();
            router.replace('/auth');
          }
        }
      ]
    );
  };

  const handleEditProfile = () => {
    router.push('/(rider)/profile/edit-profile' as any);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#228B22', '#32CD32']}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity 
            style={styles.menuButton} 
            onPress={() => setMenuVisible(true)}
          >
            <Menu color="#ffffff" size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: user?.profileImage || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Edit color="#228B22" size={18} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{user?.name || 'Rider Name'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'rider@example.com'}</Text>
          <View style={styles.riderBadge}>
            <Text style={styles.riderBadgeText}>Verified Rider</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📊 Your Performance</Text>
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

        <Text style={styles.versionText}>TumaRide Rider Version 1.0.0</Text>
      </View>

      {/* Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Settings Menu</Text>
              <TouchableOpacity onPress={() => setMenuVisible(false)}>
                <X color="#228B22" size={24} />
              </TouchableOpacity>
            </View>
            {menuItems.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.modalMenuItem}
                onPress={() => handleMenuPress(item)}
                activeOpacity={0.7}
              >
                <View style={[styles.modalMenuIcon, { backgroundColor: item.color + '15' }]}> 
                  <item.icon color={item.color} size={24} />
                </View>
                <View style={styles.modalMenuContent}>
                  <Text style={styles.modalMenuTitle}>{item.title}</Text>
                  <Text style={styles.modalMenuSubtitle}>{item.subtitle}</Text>
                </View>
                <ChevronRight color="#999999" size={22} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 25,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  menuButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 12,
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
    marginBottom: 15,
  },
  riderBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  riderBadgeText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 35,
    paddingBottom: 140,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#228B22',
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
    color: '#228B22',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 25,
    paddingTop: 25,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#228B22',
  },
  modalMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  modalMenuIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  modalMenuContent: {
    flex: 1,
    paddingRight: 15,
  },
  modalMenuTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#228B22',
    marginBottom: 4,
  },
  modalMenuSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 20,
  },
});