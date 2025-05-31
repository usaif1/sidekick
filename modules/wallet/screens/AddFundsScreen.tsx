import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {ms, ScaledSheet} from 'react-native-size-matters';
import axios from 'axios';
// @ts-ignore
// import EasebuzzCheckout from 'react-native-easebuzz-kit';
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

const {colors} = useThemeStore.getState().theme;

// Quick amount options
const QUICK_AMOUNTS = [100, 200, 500, 1000];

const AddFundsScreen = () => {
  const navigation = useNavigation();

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

  // State for amount and payment method

  const [securityDeposit, setSecurityDeposit] = useState<number>(0);

  function rupeesToPaise(rupees: number) {
    if (typeof rupees !== 'number') {
      throw new Error('Input must be a number');
    }

    return Math.round(rupees * 100);
  }

  // Handle quick amount selection
  const handleQuickAmountSelect = (value: number) => {
    setRechargeAmount(value.toString());
  };

  const handleCreditRequest = async () => {
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
    startLoading('add-funds');
    // Validate amount
    try {
      const razorpayData = await axios.post(
        `${config.prodEndpoint}/initiate-payment`,
        {
          amount: rupeesToPaise(parseFloat(rechargeAmount) + securityDeposit),
          email: user?.email || 'default@mail.com',
          phone: parseFloat(
            user?.phone_number?.replace(/^(\+91)/, '') || '9999999999',
          ),
          firstname: user?.full_name || 'default',
        },
      );

      RazorpayCheckout.open({
        amount: razorpayData?.data?.amount,
        currency: ' INR',
        key: 'rzp_live_zWdsxCG2dlKXBX',
        description: 'wallet recharge',
        name: 'SideKick',
        order_id: razorpayData?.data?.id,
      })
        .then(data => {
          // handle success
          console.log(`Success: ${data.razorpay_payment_id}`);
          if (securityDeposit) {
            WalletService.updateWalletSecurityDeposit({
              id: userWallet?.id,
              security_deposit: securityDeposit,
            });
          }

          if (data.razorpay_payment_id) {
            WalletService.updateWalletBalance({
              id: userWallet?.id,
              balance: parseFloat(rechargeAmount),
            }).then(() => {
              stopLoading('add-funds');
              WalletService.fetchUserWallet();
              setModalComponent(PaymentSuccess);
              openModal();
            });
          } else {
            stopLoading('add-funds');
            setModalComponent(PaymentFailure);
            openModal();
          }
        })
        .catch(error => {
          // handle failure
          stopLoading('add-funds');
          console.log(`Error: ${error.code} | ${error.description}`);
          setModalComponent(PaymentFailure);
          openModal();
        });

      // EasebuzzCheckout.open(options)
      //   .then((data: any) => {
      //     //handle the payment success & failed response here
      // if (securityDeposit) {
      //   WalletService.updateWalletSecurityDeposit({
      //     id: userWallet?.id,
      //     security_deposit: securityDeposit,
      //   });
      // }

      // if (data.result === 'payment_successfull') {
      //   WalletService.updateWalletBalance({
      //     id: userWallet?.id,
      //     balance: parseFloat(rechargeAmount),
      //   }).then(() => {
      //     WalletService.fetchUserWallet();
      //     openModal();
      //   });
      // } else {
      //   setModalComponent(PaymentFailure);
      //   openModal();
      // }
      // })
      //   .catch((error: any) => {
      //     //handle sdk failure issue here
      //     console.log('SDK Error:', error);
      //   })
      //   .finally(() => {
      //     stopLoading('add-funds');
      //   });
    } catch (error) {
      // @ts-ignore
      console.log('error adding funds', error?.message);
      stopLoading('add-funds');
      showToast({
        type: 'error',
        text1: 'Error adding funds to the wallet',
        text2: 'Please try again',
      });
    }
  };

  useEffect(() => {
    UserService.fetchUserDetails();
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
    <>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#FFFFFF" 
        translucent={false}
      />
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
    </>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
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
