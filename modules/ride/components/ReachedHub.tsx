// dependencies
import {View} from 'react-native';
import React from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import SwipeButton from 'rn-swipe-button';

// components
import TickMarkRounded from '@/assets/tick-mark-rounded.svg';
import {Divider, H2, H3, P2, P3} from '@/components';

// store
import {useThemeStore} from '@/globalStore';

const {
  theme: {colors},
} = useThemeStore.getState();

const ReachedHub: React.FC = () => {
  return (
    <View style={styles.reachedHubWrapper}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 8,
          justifyContent: 'center',
        }}>
        <TickMarkRounded />
        <H2 customStyles={{textAlign: 'center'}}>Reached Hub</H2>
      </View>
      <Divider height={6} />
      <P2 textColor="textSecondary">
        Please park your scooter and confirm the payment
      </P2>
      <Divider height={28} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <H3>Car Parking</H3>
          <P3 textColor="textSecondary">10:04 Minutes</P3>
        </View>
        <H3 textColor="highlight">XXX</H3>
      </View>
      <Divider height={28} />
      <SwipeButton
        disableResetOnTap
        // forceReset={(reset: any) => {
        //   forceResetLastButton = reset;
        // }}
        // finishRemainingSwipeAnimationDuration={finishSwipeAnimDuration}
        // forceCompleteSwipe={(forceComplete: any) => {
        //   forceCompleteCallback = forceComplete;
        // }}
        railBackgroundColor={colors.alert}
        railStyles={{
          borderWidth: 0,
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        // thumbIconHeight={60}
        // thumbIconWidth={60}
        thumbIconBackgroundColor={colors.error}
        thumbIconStyles={{
          borderWidth: 0,
          borderRadius: '100%',
          height: 60,
          width: 60,
        }}
        // thumbIconImageSource={require('@/assets/swipe-btn-img.png')}
        title=""
      />
    </View>
  );
};

export default ReachedHub;

const styles = ScaledSheet.create({
  reachedHubWrapper: {
    padding: '18@ms',
    paddingTop: '41.6@vs',
  },
});
