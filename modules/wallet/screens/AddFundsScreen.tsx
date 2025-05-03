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
import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';

// store
import {
  useGlobalStore,
  useThemeStore,
  useUserStore,
  useWalletStore,
} from '@/globalStore';

// components
import {B1, B2, Divider, GlobalModal, showToast} from '@/components';
import ButtonText from '@/components/ButtonText';
import {WalletService, UserService} from '@/globalService';
import PaymentSuccess from '../components/PaymentSuccess';
import PaymentFailure from '../components/PaymentFailure';

// config
import {config} from '@/config';
import {showCredits} from '@/utils/user';
import {useNavigation} from '@react-navigation/native';

// Constants
const MIN_AMOUNT = 20;
const DEFAULT_SECURITY_DEPOSIT = 200;
const QUICK_AMOUNTS = [100, 200, 500, 1000];

// Types
interface PaymentResponse {
  amount: number;
  id: string;
  currency: string;
}

interface RazorpayError {
  code: string;
  description: string;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
}

interface CheckoutOptions {
  amount: number;
  currency: string;
  key: string;
  description: string;
  name: string;
  order_id: string;
  prefill: {
    email?: string;
    contact?: string;
  };
}

// Validation functions
const validateAmount = (amount: string): boolean => {
  const numAmount = parseFloat(amount);
  return !isNaN(numAmount) && numAmount >= MIN_AMOUNT;
};

const validateUserDetails = (user: any): boolean => {
  return Boolean(user?.email && user?.phone_number && user?.full_name);
};

const AddFundsScreen = () => {
  const navigation = useNavigation();
  const colors = useThemeStore(state => state.theme.colors);

  const {openModal, setModalComponent} = useGlobalStore();
  const {
    userWallet,
    rechargeAmount,
    setRechargeAmount,
    startLoading,
    stopLoading,
    walletLoaders,
  } = useWalletStore();
  const {user} = useUserStore();

  const [securityDeposit, setSecurityDeposit] = useState<number>(0);

  // Handle quick amount selection
  const handleQuickAmountSelect = (value: number) => {
    setRechargeAmount(value.toString());
  };

  const handleCreditRequest = async () => {
    if (!validateAmount(rechargeAmount)) {
      showToast({
        type: 'error',
        text1: 'Invalid amount',
        text2: `Amount must be at least ₹${MIN_AMOUNT}`,
      });
      return;
    }

    showToast({
      type: 'success',
      text1: 'Credit request raised',
    });

    setTimeout(() => {
      navigation.goBack();
    }, 300);
  };

  // Handle pay button press
  const handlePay = async () => {
    try {
      if (!validateAmount(rechargeAmount)) {
        showToast({
          type: 'error',
          text1: 'Invalid amount',
          text2: `Amount must be at least ₹${MIN_AMOUNT}`,
        });
        return;
      }

      if (!validateUserDetails(user)) {
        showToast({
          type: 'error',
          text1: 'Missing user details',
          text2: 'Please update your profile with complete information',
        });
        return;
      }

      startLoading('add-funds');

      const paymentData = {
        amount: parseFloat(rechargeAmount) * 100, // Convert to paise
        email: user?.email,
        phone: user?.phone_number?.replace(/^\(\+91\)/, ''),
        firstname: user?.full_name,
        user_id: user?.id,
      };

      const razorpayData = await axios.post<PaymentResponse>(
        `${config.devEndpoint}/initiate-payment`,
        paymentData,
      );

      const razorpayOptions: CheckoutOptions = {
        amount: razorpayData?.data?.amount,
        currency: 'INR',
        key: 'rzp_live_zWdsxCG2dlKXBX',
        description: 'wallet recharge',
        name: 'SideKick',
        order_id: razorpayData?.data?.id,
        prefill: {
          email: user?.email,
          contact: user?.phone_number || undefined,
        },
      };

      const response = await RazorpayCheckout.open(razorpayOptions);

      if (response?.razorpay_payment_id) {
        if (securityDeposit) {
          await WalletService.updateWalletSecurityDeposit({
            id: userWallet?.id,
            security_deposit: securityDeposit,
          });
        }

        await WalletService.updateWalletBalance({
          id: userWallet?.id,
          balance: parseFloat(rechargeAmount),
        });

        stopLoading('add-funds');
        await WalletService.fetchUserWallet();
        setModalComponent(PaymentSuccess);
        openModal();
      }
    } catch (error) {
      stopLoading('add-funds');
      console.error('Payment failed:', error);
      
      const isRazorpayError = (error as RazorpayError)?.code && (error as RazorpayError)?.description;
      showToast({
        type: 'error',
        text1: isRazorpayError ? 'Payment Failed' : 'Error adding funds',
        text2: isRazorpayError ? (error as RazorpayError).description : 'Please try again later',
      });
      
      setModalComponent(PaymentFailure);
      openModal();
    }
  };

  useEffect(() => {
    const initializeScreen = async () => {
      try {
        await UserService.fetchUserDetails();
        
        // Set security deposit only if not already set
        if (!userWallet?.security_deposit) {
          setSecurityDeposit(DEFAULT_SECURITY_DEPOSIT);
        }
      } catch (error) {
        console.error('Error initializing screen:', error);
        showToast({
          type: 'error',
          text1: 'Error loading user details',
          text2: 'Please try again',
        });
      }
    };

    initializeScreen();

    // Cleanup function
    return () => {
      setRechargeAmount('0');
      setSecurityDeposit(0);
    };
  }, [userWallet?.security_deposit]);

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
              {showCredits() ? (
                <B1 textColor="highlight">C</B1>
              ) : (
                <B1 textColor="highlight">₹</B1>
              )}

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
      {rechargeAmount && rechargeAmount !== '0' ? (
        showCredits() ? (
          <View
            style={[styles.buttonContainer, {width: 450, alignSelf: 'center'}]}>
            <ButtonText
              variant="primary"
              onPress={handleCreditRequest}
              loading={walletLoaders['add-funds']}>
              Request{' '}
              {!securityDeposit
                ? rechargeAmount
                : parseFloat(rechargeAmount) + securityDeposit}{' '}
              credits
            </ButtonText>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <ButtonText
              variant="primary"
              onPress={handlePay}
              loading={walletLoaders['add-funds']}>
              Pay ₹{' '}
              {!securityDeposit
                ? rechargeAmount
                : parseFloat(rechargeAmount) + securityDeposit}
            </ButtonText>
          </View>
        )
      ) : null}

      <GlobalModal />
    </SafeAreaView>
  );
};

export default AddFundsScreen;
