import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Avatar from '@/components/Avatar';
import { Heading, Subtitle, StatLabel, StatValue } from '@/components/Typography';
import { useThemeStore } from '@/globalStore';

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
   * Time spent (formatted string)
   */
  time?: string;
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
}

/**
 * ProfileCard displays user information and statistics in a card format
 */
const ProfileCard: React.FC<ProfileCardProps> = ({
  fullName,
  company,
  time,
  totalMinutes,
  totalKilometers,
  onPress,
  onAvatarPress,
  style,
  testID = 'profile-card',
}) => {
  const { colors, spacing, 
    // borderRadius,
     shadows } = useThemeStore(state => state.theme);

  const cardContent = (
    <View style={styles.container}>
      {/* Centered avatar and user info */}
      <View style={styles.centeredHeader}>
        <Avatar 
          fullName={fullName} 
          size="large" 
          variant="rounded" 
          onPress={onAvatarPress}
          style={styles.avatar}
        />
        <View style={styles.centeredUserInfo}>
          <Heading style={styles.name} numberOfLines={1}>{fullName}</Heading>
          {company && <Subtitle style={styles.company} numberOfLines={1}>{company}</Subtitle>}
        </View>
      </View>

      {/* Stats in a row with dotted border */}
      {(totalMinutes !== undefined || totalKilometers !== undefined) && (
        <View style={styles.statsRow}>
          {totalMinutes !== undefined && (
            <View style={styles.statBox}>
              <StatLabel style={styles.statValue}>{totalMinutes}</StatLabel>
              <StatValue style={styles.statLabel}>Total Minutes</StatValue>
            </View>
          )}
          
          {totalMinutes !== undefined && totalKilometers !== undefined && (
            <View style={styles.statDivider} />
          )}
          
          {totalKilometers !== undefined && (
            <View style={styles.statBox}>
              <StatLabel style={styles.statValue}>{totalKilometers}</StatLabel>
              <StatValue style={styles.statLabel}>Total Kilometers</StatValue>
            </View>
          )}
        </View>
      )}
    </View>
  );

  const cardStyles = [
    styles.card,
    { 
      backgroundColor: colors.neutral[0],
      // borderRadius: borderRadius.lg,
      ...shadows.md,
    },
    style,
  ];

  return onPress ? (
    <TouchableOpacity 
      style={cardStyles} 
      onPress={onPress}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={`Profile card for ${fullName}`}
    >
      {cardContent}
    </TouchableOpacity>
  ) : (
    <View 
      style={cardStyles}
      testID={testID}
      accessibilityLabel={`Profile card for ${fullName}`}
    >
      {cardContent}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    width: '100%',
  },
  container: {
    padding: 16,
  },
  // New centered layout styles
  centeredHeader: {
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 8,
  },
  avatar: {
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e0e0ff', // Light purple border to match the image
  },
  centeredUserInfo: {
    alignItems: 'center',
  },
  name: {
    textAlign: 'center',
    marginBottom: 4,
  },
  company: {
    textAlign: 'center',
  },
  // Stats row with dotted border
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#e0e0ff', // Light purple border
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e0e0ff', // Light purple divider
    marginHorizontal: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  // Keep original styles for backward compatibility
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userInfo: {
    marginLeft: 12,
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
});

export default ProfileCard; 