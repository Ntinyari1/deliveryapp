import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, MessageCircle, Phone, Mail, FileText, CircleHelp as HelpCircle, ChevronRight } from 'lucide-react-native';

export default function HelpPage() {
  const router = useRouter();

  const faqItems = [
    {
      question: 'How do I track my delivery?',
      answer: 'You can track your delivery in real-time from the tracking page. You\'ll receive notifications at each step.',
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept M-Pesa, Visa, Mastercard, and other major payment methods.',
    },
    {
      question: 'How is delivery cost calculated?',
      answer: 'Delivery cost is based on distance, package size, and current demand in your area.',
    },
    {
      question: 'Can I cancel a delivery?',
      answer: 'Yes, you can cancel a delivery before the rider picks up your package. Cancellation fees may apply.',
    },
  ];

  const contactOptions = [
    {
      title: 'Live Chat',
      subtitle: 'Chat with our support team',
      icon: MessageCircle,
      action: () => Alert.alert('Live Chat', 'Opening chat support...'),
    },
    {
      title: 'Call Support',
      subtitle: '+254 700 123 456',
      icon: Phone,
      action: () => Linking.openURL('tel:+254700123456'),
    },
    {
      title: 'Email Us',
      subtitle: 'support@tumaride.com',
      icon: Mail,
      action: () => Linking.openURL('mailto:support@tumaride.com'),
    },
  ];

  const helpTopics = [
    { title: 'Getting Started', icon: HelpCircle },
    { title: 'Delivery Guidelines', icon: FileText },
    { title: 'Payment & Billing', icon: FileText },
    { title: 'Safety & Security', icon: FileText },
    { title: 'Terms of Service', icon: FileText },
    { title: 'Privacy Policy', icon: FileText },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1a1a', '#2d2d2d']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft color="#ffffff" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>🆘 Help & Support</Text>
          <Text style={styles.headerSubtitle}>Get help and contact support</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Contact Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Support</Text>
          {contactOptions.map((option, index) => (
            <TouchableOpacity key={index} style={styles.contactCard} onPress={option.action}>
              <View style={styles.contactIcon}>
                <option.icon color="#FF8C00" size={24} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>{option.title}</Text>
                <Text style={styles.contactSubtitle}>{option.subtitle}</Text>
              </View>
              <ChevronRight color="#999999" size={20} />
            </TouchableOpacity>
          ))}
        </View>

        {/* FAQ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqItems.map((item, index) => (
            <View key={index} style={styles.faqCard}>
              <Text style={styles.faqQuestion}>{item.question}</Text>
              <Text style={styles.faqAnswer}>{item.answer}</Text>
            </View>
          ))}
        </View>

        {/* Help Topics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Help Topics</Text>
          {helpTopics.map((topic, index) => (
            <TouchableOpacity key={index} style={styles.topicCard}>
              <topic.icon color="#666666" size={24} />
              <Text style={styles.topicTitle}>{topic.title}</Text>
              <ChevronRight color="#999999" size={20} />
            </TouchableOpacity>
          ))}
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoTitle}>TumaRide Support</Text>
          <Text style={styles.appInfoText}>
            We're here to help! Our support team is available 24/7 to assist you with any questions or issues.
          </Text>
          <Text style={styles.appVersion}>App Version 1.0.0</Text>
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
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1a1a1a',
    marginBottom: 20,
  },
  contactCard: {
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
  contactIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 140, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  contactSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  faqCard: {
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
  faqQuestion: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1a1a1a',
    marginBottom: 10,
  },
  faqAnswer: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 20,
  },
  topicCard: {
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
  topicTitle: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1a1a1a',
    marginLeft: 15,
  },
  appInfo: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 25,
    marginBottom: 30,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  appInfoTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1a1a1a',
    marginBottom: 10,
  },
  appInfoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 15,
  },
  appVersion: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999999',
  },
});