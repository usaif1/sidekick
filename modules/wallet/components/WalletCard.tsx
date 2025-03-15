// dependencies
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

// store
import {useThemeStore} from '@/globalStore';

// components
import {H1, P1, Divider} from '@/components';

interface WalletCardProps {
  balance: number;
  testID?: string;
}

const {colors} = useThemeStore.getState().theme;

const WalletCard: React.FC<WalletCardProps> = ({
  balance,
  testID = 'wallet-card',
}) => {
  return (
    <View style={[styles.container]} testID={testID}>
      <Image
        source={require('../assets/wallet-texture.png')}
        style={styles.backgroundImage}
      />
      <P1 textColor="textSecondary">Current Balance</P1>
      <Divider height={4} />
      <H1>₹{balance.toFixed(1)}</H1>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden' as const,
    position: 'relative' as const,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    height: '30%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: colors.highlight,
    backgroundColor: colors.lightGray,
  },
  backgroundImage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    resizeMode: 'cover', // Ensures image covers width/height without stretching
  },
});

export default WalletCard;
