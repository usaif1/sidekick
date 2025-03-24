import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {ms, ScaledSheet} from 'react-native-size-matters';

// store
import {useGlobalStore, useThemeStore, useWalletStore} from '@/globalStore';

// components
import {B1, B2, Divider, GlobalModal} from '@/components';
import ButtonText from '@/components/ButtonText';
import {WalletService} from '@/globalService';
import PaymentSuccess from '../components/PaymentSuccess';

const {colors} = useThemeStore.getState().theme;

// Quick amount options
const QUICK_AMOUNTS = [100, 200, 500, 1000];

const AddFundsScreen = () => {
  const {openModal, setModalComponent} = useGlobalStore();
  const {userWallet, rechargeAmount, setRechargeAmount} = useWalletStore();

  // State for amount and payment method

  const [securityDeposit, setSecurityDeposit] = useState<number>(0);

  // Handle quick amount selection
  const handleQuickAmountSelect = (value: number) => {
    setRechargeAmount(value.toString());
  };

  // Handle pay button press
  const handlePay = () => {
    // Validate amount
    if (!rechargeAmount || parseFloat(rechargeAmount) <= 0) {
      // Show error
      return;
    }

    if (securityDeposit) {
      WalletService.updateWalletSecurityDeposit({
        id: userWallet?.id,
        security_deposit: securityDeposit,
      });
    }

    WalletService.updateWalletBalance({
      id: userWallet?.id,
      balance: parseFloat(rechargeAmount),
    }).then(() => {
      WalletService.fetchUserWallet();
      openModal();
    });
  };

  useEffect(() => {
    setModalComponent(PaymentSuccess);

    if (!userWallet?.security_deposit) {
      setSecurityDeposit(200);
    }

    return () => {
      setRechargeAmount('0');
      setSecurityDeposit(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Amount input section */}
        <View style={styles.section}>
          <View>
            <B2 textColor="highlight">
              Available Balance: {userWallet?.balance.toFixed(1) || 0}
            </B2>
            <Divider height={9.6} />
            <View style={styles.amountInput}>
              <B1 textColor="highlight">₹</B1>
              <TextInput
                numberOfLines={1}
                keyboardType="numeric"
                placeholder="00.0"
                value={rechargeAmount}
                onChangeText={text => {
                  setRechargeAmount(text);
                }}
                placeholderTextColor={colors.textPrimary}
                style={{
                  width: '50%',
                  fontSize: ms(23),
                  textAlign: 'right',
                  fontWeight: '600',
                }}
              />
            </View>
          </View>

          {/* Quick amount options */}
          <Divider height={9.6} />
          <View style={styles.quickAmounts}>
            {QUICK_AMOUNTS.map(value => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.quickAmountButton,
                  {
                    backgroundColor:
                      rechargeAmount === value.toString()
                        ? colors.highlight
                        : colors.lightGray,
                    borderColor:
                      rechargeAmount === value.toString()
                        ? colors.highlight
                        : colors.textSecondary,
                  },
                ]}
                onPress={() => handleQuickAmountSelect(value)}>
                <Text
                  style={[
                    styles.quickAmountText,
                    {
                      color:
                        rechargeAmount === value.toString()
                          ? colors.white
                          : colors.textPrimary,
                    },
                  ]}>
                  + {value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Divider height={16} />
          <View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <B2>Amount</B2>
              <B2>₹ {rechargeAmount}</B2>
            </View>
            <Divider height={6} />
            {!userWallet?.security_deposit ? (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <B2>Security Deposit</B2>
                  <B2>₹ {securityDeposit}</B2>
                </View>
                <Divider height={6} />
              </>
            ) : null}
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <B2>Total</B2>
              <B2>₹ {securityDeposit + parseFloat(rechargeAmount)}</B2>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Pay button */}

      <View style={styles.buttonContainer}>
        <ButtonText variant="primary" onPress={handlePay}>
          Pay ₹{' '}
          {securityDeposit
            ? rechargeAmount
            : parseFloat(rechargeAmount) + securityDeposit}
        </ButtonText>
      </View>

      <GlobalModal />
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 12,
  },
  amountInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: colors.textSecondary,
    padding: '19@ms',
    borderRadius: 20,
  },
  quickAmounts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  quickAmountButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderWidth: 1,
    borderRadius: 12,
    width: '22%',
  },
  quickAmountText: {
    fontWeight: '500',
    textAlign: 'center',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  paymentOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentOptionText: {
    fontWeight: '500',
  },
  summarySection: {
    padding: 16,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryDivider: {
    height: 1,
    marginVertical: 8,
  },
  buttonContainer: {
    padding: 16,
    paddingHorizontal: 96,
  },
});

export default AddFundsScreen;
