import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Shield, Eye, MapPin, Bell, Database, Trash2, Download, ChevronRight } from 'lucide-react-native';

export default function PrivacyPage() {
  const router = useRouter();
  const [privacySettings, setPrivacySettings] = useState({
    shareLocation: true,
    dataCollection: false,
    marketingEmails: false,
    profileVisibility: true,
    activityTracking: true,
  });

  const toggleSetting = (key: string) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const privacyGroups = [
    {
      title: 'Location & Tracking',
      icon: MapPin,
      items: [
        { 
          key: 'shareLocation', 
          label: 'Share Location', 
          description: 'Allow riders to see your location for deliveries' 
        },
        { 
          key: 'activityTracking', 
          label: 'Activity Tracking', 
          description: 'Track app usage for better experience' 
        },
      ]
    },
    {
      title: 'Data & Privacy',
      icon: Database,
      items: [
        { 
          key: 'dataCollection', 
          label: 'Data Collection', 
          description: 'Allow collection of usage analytics' 
        },
        { 
          key: 'profileVisibility', 
          label: 'Profile Visibility', 
          description: 'Make your profile visible to riders' 
        },
      ]
    },
    {
      title: 'Communications',
      icon: Bell,
      items: [
        { 
          key: 'marketingEmails', 
          label: 'Marketing Emails', 
          description: 'Receive promotional emails and offers' 
        },
      ]
    },
  ];

  const dataActions = [
    {
      title: 'Download My Data',
      subtitle: 'Get a copy of your personal data',
      icon: Download,
      action: () => Alert.alert('Download Data', 'Your data export will be sent to your email within 24 hours.'),
    },
    {
      title: 'Delete Account',
      subtitle: 'Permanently delete your account',
      icon: Trash2,
      action: () => Alert.alert(
        'Delete Account',
        'Are you sure? This action cannot be undone.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive' }
        ]
      ),
      isDestructive: true,
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#228B22', '#32CD32']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft color="#ffffff" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>🔒 Privacy & Security</Text>
          <Text style={styles.headerSubtitle}>Manage your privacy settings</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Privacy Settings */}
        {privacyGroups.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.privacyGroup}>
            <View style={styles.groupHeader}>
              <group.icon color="#FFD700" size={24} />
              <Text style={styles.groupTitle}>{group.title}</Text>
            </View>
            
            {group.items.map((item) => (
              <View key={item.key} style={styles.privacyItem}>
                <View style={styles.privacyInfo}>
                  <Text style={styles.privacyLabel}>{item.label}</Text>
                  <Text style={styles.privacyDescription}>{item.description}</Text>
                </View>
                <Switch
                  value={privacySettings[item.key as keyof typeof privacySettings] as boolean}
                  onValueChange={() => toggleSetting(item.key)}
                trackColor={{ false: '#E0E0E0', true: '#32CD32' }}
                  thumbColor={privacySettings[item.key as keyof typeof privacySettings] ? '#ffffff' : '#f4f3f4'}
                />
              </View>
            ))}
          </View>
        ))}

        {/* Data Management */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Shield color="#FFD700" size={24} />
            <Text style={styles.sectionTitle}>Data Management</Text>
          </View>
          
          {dataActions.map((action, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.actionCard,
                action.isDestructive && styles.destructiveCard
              ]} 
              onPress={action.action}
            >
              <View style={[
                styles.actionIcon,
                action.isDestructive && styles.destructiveIcon
              ]}>
                <action.icon 
                  color={action.isDestructive ? "#FF4444" : "#666666"} 
                  size={24} 
                />
              </View>
              <View style={styles.actionInfo}>
                <Text style={[
                  styles.actionTitle,
                  action.isDestructive && styles.destructiveText
                ]}>
                  {action.title}
                </Text>
                <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
              </View>
              <ChevronRight 
                color={action.isDestructive ? "#FF4444" : "#999999"} 
                size={20} 
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Privacy Notice */}
        <View style={styles.privacyNotice}>
          <Eye color="#FFD700" size={28} />
          <Text style={styles.noticeTitle}>Your Privacy Matters</Text>
          <Text style={styles.noticeText}>
            We are committed to protecting your privacy and ensuring your data is secure. 
            You have full control over what information you share with us.
          </Text>
          <TouchableOpacity style={styles.policyButton}>
            <Text style={styles.policyButtonText}>Read Privacy Policy</Text>
          </TouchableOpacity>
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
  privacyGroup: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  groupTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1a1a1a',
    marginLeft: 12,
  },
  privacyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  privacyInfo: {
    flex: 1,
    marginRight: 15,
  },
  privacyLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  privacyDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1a1a1a',
    marginLeft: 12,
  },
  actionCard: {
    flexDirection: 'row',
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
  destructiveCard: {
    borderWidth: 2,
    borderColor: '#FFE5E5',
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  destructiveIcon: {
    backgroundColor: '#FFE5E5',
  },
  actionInfo: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  destructiveText: {
    color: '#FF4444',
  },
  actionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  privacyNotice: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 25,
    marginBottom: 30,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  noticeTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1a1a1a',
    marginTop: 15,
    marginBottom: 15,
  },
  noticeText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  policyButton: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  policyButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFD700',
  },
});