import {
  // Text,
  SafeAreaView,
  View,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {
  H2,
  Divider,
  //  P1,
  P2,
} from '@/components';

const HorizontalLine = () => <View style={styles.horizontalLine} />;

const TNC: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <H2>Privacy Policy</H2>
        <Divider height={6} />
        <P2>
          This Privacy Policy (“Privacy Policy”) governs your use of the
          websites, mobile applications, and technology operated by FLYT MICRO
          MOBILITY PRIVATE LIMITED under the brand name Sidekick (“Sidekick, ”
          “we, ” “us, ” or “our”). We, Sidekick, want our users to understand
          how we collect and use your personal information. This Privacy Policy
          applies to data and information collected when you use any of the
          following
        </P2>

        <View style={styles.bullet}>
          <P2>• </P2>
          <P2>
            The Sidekick website(s), including any versions optimized for mobile
            or tablet devices
          </P2>
        </View>
        <View style={styles.bullet}>
          <P2>• </P2>
          <P2>
            Any email communications or newsletters distributed by Sidekick
          </P2>
        </View>
        <View style={styles.bullet}>
          <P2>• </P2>
          <P2>The Sidekick mobile application (“App”)</P2>
        </View>
        <View style={styles.bullet}>
          <P2>• </P2>
          <P2>Any other services provided by Sidekick (“Service”)</P2>
        </View>
        <View style={styles.bullet}>
          <P2>• </P2>
          <P2>
            All interactive features, communications, or functionalities
            operated or maintained by Sidekick and its related companies
          </P2>
        </View>
        <Divider height={6} />
        <P2>
          We have established this Privacy Policy to explain what types of
          personal information we may gather during your use of our Service, why
          we collect your information, how we use it, when and with whom we
          might share it, and how you can manage your personal information.
          Please note that the practices described in this Privacy Policy apply
          to information collected online through our App and websites and by
          our customer support personnel. This Privacy Policy does not apply to
          information you provide to other organizations (including those linked
          to our Service) or that we may receive from third parties. By using
          our App or any Sidekick Service, you accept the practices described in
          this Privacy Policy. If you do not agree with the terms herein, please
          do not use our App or Services. We reserve the right to revise the
          terms of this Privacy Policy from time to time without prior notice.
          Your continued use of our App or Services after any changes indicates
          your acceptance of those changes. Should we apply changes
          retroactively or to personal information already in our possession, we
          will notify you as required by applicable law. This Privacy Policy is
          incorporated by reference into our User Agreement, which is available
          on our website, unless otherwise noted. If you have any questions
          about this Privacy Policy or if your concerns are not addressed here,
          please contact us by email at team@flytmobility.in.
        </P2>

        {/* Section 1 */}
        <View style={styles.section}>
          <H2>1. Information Collection and Use</H2>
          <Divider height={6} />
          <P2>
            We may ask you to provide personally identifiable information to
            enhance your experience while using our Service. This information
            may include, but is not limited to, your location, name, and
            address. We collect two main types of information: personal
            information and non-personal information. The information you share
            with us will be retained and used as described in this Privacy
            Policy. The App also employs third-party services for user
            verification (such as KYC processes), which may collect data to help
            identify you.
          </P2>
          <View style={styles.bullet}>
            <P2>• </P2>
            <P2>Your location, name, and address</P2>
          </View>
          <View>
            <P2>We collect two main types of information:</P2>
            <P2>• Personal information</P2>
            <P2>• Non-personal information</P2>
            <P2>
              The App employs third-party services for user verification (KYC
              processes) which may collect data to help identify you.
            </P2>
          </View>
        </View>
        <HorizontalLine />

        {/* Section 2 */}
        <View style={styles.section}>
          <H2>2. Children's Privacy</H2>
          <P2>
            Our Services are not intended for children under the age of 13. We
            do not knowingly collect personal information from children under
            13. If we become aware that a child under 13 has provided personal
            information, we will promptly delete it. If you are a parent or
            guardian and believe your child has provided us with personal
            information, please contact us so we can take appropriate action.
          </P2>
        </View>
        <HorizontalLine />

        {/* Section 3 */}
        <View style={styles.section}>
          <H2>3. Cookies and Tracking Technologies</H2>
          <P2>
            Cookies are small data files that are stored on your device and help
            us recognize you. While our Service does not rely exclusively on
            cookies, we may use third-party code and libraries that utilize
            cookies for various purposes. You may choose to accept or decline
            cookies through your browser settings; however, some features of our
            Service may not function properly if you disable cookies.
          </P2>
          <P2>We use cookies for purposes such as:</P2>
          <View style={styles.bullet}>
            <P2>•</P2>
            <P2>Recognizing you and providing a personalized experience</P2>
          </View>
          <View style={styles.bullet}>
            <P2>•</P2>
            <P2>Keeping you logged in during subsequent visits</P2>
          </View>
          <View style={styles.bullet}>
            <P2>•</P2>
            <P2>Gathering analytics on user traffic and usage</P2>
          </View>
          <View style={styles.bullet}>
            <P2>•</P2>
            <P2>Supporting email communications and newsletters</P2>
          </View>
          <View style={styles.bullet}>
            <P2>•</P2>
            <P2>Facilitating targeted advertising from our partners</P2>
          </View>
        </View>
        <HorizontalLine />

        {/* Section 4 */}
        <View style={styles.section}>
          <H2>4. How We Use Your Information</H2>
          <P2>
            We use the information we collect for multiple purposes, including:
          </P2>
          <View style={styles.bullet}>
            <P2>• </P2>
            <P2>Processing your registration and managing your account</P2>
          </View>
          <View style={styles.bullet}>
            <P2>• </P2>
            <P2>Providing and improving Sidekick Services as requested</P2>
          </View>
          <View style={styles.bullet}>
            <P2>• </P2>
            <P2>
              Tracking usage of the vehicles and monitoring Service performance
            </P2>
          </View>
          <View style={styles.bullet}>
            <P2>• </P2>
            <P2>
              Personalizing content and providing you with recommendations
            </P2>
          </View>
          <View style={styles.bullet}>
            <P2>• </P2>
            <P2>
              Sending notifications and alerts about changes to our policies or
              features
            </P2>
          </View>
          <View style={styles.bullet}>
            <P2>• </P2>
            <P2>
              Conducting statistical and demographic analysis to improve our
              Service
            </P2>
          </View>
          <View style={styles.bullet}>
            <P2>• </P2>
            <P2>
              Detecting, preventing, and addressing technical issues or
              fraudulent activities
            </P2>
          </View>
          <View style={styles.bullet}>
            <P2>• </P2>
            <P2>
              Complying with legal requirements and protecting our rights,
              property, and safety
            </P2>
          </View>
        </View>
        <HorizontalLine />

        {/* Section 5 */}
        <View style={styles.section}>
          <H2>5. Sharing Your Information</H2>
          <P2>
            We do not sell or rent your personal information. We may share your
            information with:
          </P2>
          <View style={styles.bullet}>
            <P2>• </P2>
            <P2>Our subsidiaries, affiliates, and related companies</P2>
          </View>
          <View style={styles.bullet}>
            <P2>• </P2>
            <P2>
              Third-party service providers who perform functions on our behalf
              (such as hosting, billing, analytics, customer support, and fraud
              protection). These providers are contractually obligated to
              protect your data and use it only for the purposes we specify.
            </P2>
          </View>
          <View style={styles.bullet}>
            <P2>• </P2>
            <P2>
              In emergency situations or as required by law (e.g., to comply
              with legal processes, protect our rights, or ensure safety)
            </P2>
          </View>
          <View style={styles.bullet}>
            <P2>• </P2>
            <P2>
              In connection with any merger, acquisition, or sale of assets,
              provided that the acquiring party agrees to honor this Privacy
              Policy
            </P2>
          </View>
          <P2>
            If you subscribe to additional features (such as location-based
            services), we may share relevant information with our partners
            solely to facilitate those services.
          </P2>
        </View>
        <HorizontalLine />

        {/* Section 6 */}
        <View style={styles.section}>
          <H2>6. International Data Transfer</H2>
          <P2>
            Your personal information may be stored and processed in India or
            other countries where Sidekick, its affiliates, or service providers
            maintain facilities. By using our Service, you consent to the
            transfer of your information to these locations, which may have
            different data protection laws than your jurisdiction. We take
            reasonable steps to ensure your data is treated securely and in
            accordance with this Privacy Policy.
          </P2>
        </View>
        <HorizontalLine />

        {/* Section 7 */}
        <View style={styles.section}>
          <H2>7. Data Security</H2>
          <P2>
            We are committed to protecting your personal information and take
            appropriate security measures to safeguard your data during
            transmission and storage. Although we strive to secure your
            information, please note that no method of data transmission or
            storage is 100% secure. In some cases, we may require proof of
            identity before disclosing any personal information.
          </P2>
        </View>
        <HorizontalLine />

        {/* Section 8 */}
        <View style={styles.section}>
          <H2>8. Links to Other Apps and Services</H2>
          <P2>
            Our App may contain links to third-party websites or services that
            are not operated by Sidekick. This Privacy Policy does not apply to
            those third-party services. We encourage you to review the privacy
            policies of any third-party sites or apps you visit.
          </P2>
        </View>
        <HorizontalLine />

        {/* Section 9 */}
        <View style={styles.section}>
          <H2>9. Your Choices and How to Opt-Out</H2>
          <P2>
            While some data collection is necessary for the operation of our
            Service, you have choices regarding your personal information:
          </P2>
          <View style={styles.bullet}>
            <P2>• </P2>
            <P2>
              Providing Personal Information: Participation in features that
              require personal information is voluntary. However, withholding
              information may limit your access to certain Service
              functionalities.
            </P2>
          </View>
          <View style={styles.bullet}>
            <P2>• </P2>
            <P2>
              Cookie Preferences: You can adjust your browser settings to refuse
              cookies. Be aware that doing so may affect the functionality of
              our Service.
            </P2>
          </View>
          <View style={styles.bullet}>
            <P2>
              • Communication Preferences: You can update your communication
              preferences within your account settings to opt-out of promotional
              emails. Note that you may still receive essential Service
              communications.
            </P2>
          </View>
        </View>
        <HorizontalLine />

        {/* Section 10 */}
        <View style={styles.section}>
          <H2>10. Accessing and Updating Your Information</H2>
          <P2>
            You may review and update your personal information by logging into
            your Sidekick account. Please note that we may not be able to delete
            certain information without also deleting your account. For requests
            to access, update, or delete your personal information, please
            contact us. We may request additional verification to process your
            request.
          </P2>
        </View>
        <HorizontalLine />

        {/* Section 11 */}
        <View style={styles.section}>
          <H2>11. Governing Law</H2>
          <P2>
            This Privacy Policy is governed by and construed in accordance with
            the laws of India. Our Services are targeted at users in India, and
            we strive to comply with applicable local data protection laws.
          </P2>
        </View>
        <HorizontalLine />

        {/* Section 12 */}
        <View style={styles.section}>
          <H2>12. Changes to This Privacy Policy</H2>
          <P2>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or applicable laws. Any changes will be
            posted on our website and within our App. We encourage you to review
            this Privacy Policy periodically. Your continued use of the App
            following any changes constitutes your acceptance of the updated
            Privacy Policy.
          </P2>
        </View>
        <HorizontalLine />

        {/* Section 13 */}
        <View style={styles.section}>
          <H2>13. Contact Us</H2>
          <P2>
            If you have any questions or concerns about this Privacy Policy or
            our data practices, please contact us by email at
            team@flytmobility.in.
          </P2>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#2c3e50',
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 8,
  },
  horizontalLine: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginVertical: 16,
  },
  bullet: {
    flexDirection: 'row',
    marginVertical: 4,
    alignItems: 'flex-start',
  },
  bulletText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginLeft: 8,
    flex: 1,
  },
});

export default TNC;
