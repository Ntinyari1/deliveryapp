import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Bell, MapPin, Moon, Globe, Volume2, Smartphone, ChevronRight } from 'lucide-react-native';

export default function SettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    locationServices: true,
    darkMode: false,
    soundEffects: true,
    vibration: true,
  });

  const toggleSetting = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const settingsGroups = [
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { key: 'pushNotifications', label: 'Push Notifications', description: 'Receive delivery updates' },
        { key: 'emailNotifications', label: 'Email Notifications', description: 'Get updates via email' },
      ]
    },
    {
      title: 'Privacy & Location',
      icon: MapPin,
      items: [
        { key: 'locationServices', label: 'Location Services', description: 'Allow location access for deliveries' },
      ]
    },
    {
      title: 'Appearance',
      icon: Moon,
      items: [
        { key: 'darkMode', label: 'Dark Mode', description: 'Use dark theme' },
      ]
    },
    {
      title: 'Sound & Haptics',
      icon: Volume2,
      items: [
        { key: 'soundEffects', label: 'Sound Effects', description: 'Play notification sounds' },
        { key: 'vibration', label: 'Vibration', description: 'Vibrate for notifications' },
      ]
    },
  ];

  const actionItems = [
    { title: 'Language', subtitle: 'English', icon: Globe },
    { title: 'App Version', subtitle: '1.0.0', icon: Smartphone },
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
          <Text style={styles.headerTitle}>⚙️ App Settings</Text>
          <Text style={styles.headerSubtitle}>Notifications & preferences</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {settingsGroups.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.settingsGroup}>
            <View style={styles.groupHeader}>
              <group.icon color="#FFD700" size={24} />
              <Text style={styles.groupTitle}>{group.title}</Text>
            </View>

            {group.items.map((item) => (
              <View key={item.key} style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>{item.label}</Text>
                  <Text style={styles.settingDescription}>{item.description}</Text>
                </View>
                <Switch
                  value={settings[item.key as keyof typeof settings] as boolean}
                  onValueChange={() => toggleSetting(item.key)}
                  trackColor={{ false: '#E0E0E0', true: '#32CD32' }}
                  thumbColor={settings[item.key as keyof typeof settings] ? '#ffffff' : '#f4f3f4'}
                />
              </View>
            ))}
          </View>
        ))}

        <View style={styles.settingsGroup}>
          <View style={styles.groupHeader}>
            <Smartphone color="#FFD700" size={24} />
            <Text style={styles.groupTitle}>App Information</Text>
          </View>

          {actionItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.actionItem}>
              <item.icon color="#666666" size={24} />
              <View style={styles.actionInfo}>
                <Text style={styles.actionLabel}>{item.title}</Text>
                <Text style={styles.actionSubtitle}>{item.subtitle}</Text>
              </View>
              <ChevronRight color="#999999" size={20} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.resetButton}
          onPress={() => Alert.alert('Reset Settings', 'Are you sure you want to reset all settings to default?')}
        >
          <Text style={styles.resetButtonText}>Reset to Default Settings</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
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
  settingsGroup: {
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  actionInfo: {
    flex: 1,
    marginLeft: 15,
  },
  actionLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  resetButton: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: '#FFE5E5',
  },
  resetButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FF4444',
  },
});