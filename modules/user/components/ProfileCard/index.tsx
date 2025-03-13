import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Text,
  Image,
} from 'react-native';
import Avatar from '@/components/Avatar';
import {StatLabel, StatValue} from '@/components/Typography';
import {useThemeStore} from '@/globalStore';
import {H3} from '@/components';

interface ProfileCardProps {
  /**
   * User's full name
   */
  fullName: string;
  /**
   * User's company or organization
   */
  company?: string;
  /**
   * Total minutes
   */
  totalMinutes?: number;
  /**
   * Total kilometers
   */
  totalKilometers?: number;
  /**
   * Optional callback when card is pressed
   */
  onPress?: () => void;
  /**
   * Optional callback when avatar is pressed
   */
  onAvatarPress?: () => void;
  /**
   * Custom styles to override default container styles
   */
  style?: ViewStyle;
  /**
   * Optional test ID for testing
   */
  testID?: string;
  /**
   * Optional profile image
   */
  profileImage?: any;
}

/**
 * ProfileCard displays user information and statistics
 */
const ProfileCard: React.FC<ProfileCardProps> = ({
  fullName,
  company,
  totalMinutes,
  totalKilometers,
  onPress,
  onAvatarPress,
  style,
  testID = 'profile-card',
  profileImage,
}) => {
  const {colors, typography} = useThemeStore(state => state.theme);

  return (
    <View
      style={[styles.container, {backgroundColor: colors.lightGray}, style]}
      testID={testID}>
      {/* Centered avatar and user info */}
      <View style={styles.centeredHeader}>
        {profileImage ? (
          <View style={styles.avatarContainer}>
            <Image source={profileImage} style={styles.avatarImage} />
          </View>
        ) : (
          <Avatar
            fullName={fullName}
            size="large"
            variant="rounded"
            onPress={onAvatarPress}
            style={styles.avatar}
            testID="profile-avatar"
          />
        )}

        <View style={styles.centeredUserInfo}>
          <H3>{fullName}</H3>
          {company && (
            <Text
              style={[
                styles.company,
                {
                  fontSize: typography.skH3.fontSize,
                  color: colors.textSecondary,
                },
              ]}>
              {company}
            </Text>
          )}
        </View>
      </View>

      {/* Stats in a row */}
      {(totalMinutes !== undefined || totalKilometers !== undefined) && (
        <View style={styles.statsRow}>
          {totalMinutes !== undefined && (
            <View style={styles.statBox}>
              <StatValue>{totalMinutes}</StatValue>
              <StatLabel>Total Minutes</StatLabel>
            </View>
          )}

          {totalKilometers !== undefined && (
            <View style={styles.statBox}>
              <StatValue>{totalKilometers}</StatValue>
              <StatLabel>Total Kilometers</StatLabel>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    paddingBottom: 24,
  },
  centeredHeader: {
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 8,
  },
  avatar: {
    marginBottom: 12,
    width: 80,
    height: 80,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 12,
    backgroundColor: '#f0f0f0',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  centeredUserInfo: {
    alignItems: 'center',
  },
  name: {
    textAlign: 'center',
    marginBottom: 4,
    fontWeight: '600',
  },
  company: {
    textAlign: 'center',
    fontWeight: '400',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 16,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
});

export default ProfileCard;
