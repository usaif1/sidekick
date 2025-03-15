import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import ButtonText from '@/components/ButtonText';
import {useThemeStore} from '@/globalStore';
import {useModal} from '@/components/Modal/ModalProvider';
import PaymentSuccessModal from '../components/PaymentSuccessModal';
import {B1, B2, Divider} from '@/components';
import {ms, ScaledSheet} from 'react-native-size-matters';
import {TextInput} from 'react-native-gesture-handler';
import walletStore from '../store';

// Define validation schema with Zod
const addFundsSchema = z.object({
  amount: z
    .string()
    .min(1, {message: 'Amount is required'})
    .refine(val => !isNaN(parseFloat(val)), {
      message: 'Amount must be a valid number',
    })
    .refine(val => parseFloat(val) > 0, {
      message: 'Amount must be greater than 0',
    }),
});

type AddFundsFormData = z.infer<typeof addFundsSchema>;

// Quick amount options
const QUICK_AMOUNTS = [100, 200, 500, 1000];

const {theme} = useThemeStore.getState();
const AddFundsScreen = () => {
  const navigation = useNavigation();
  const {showModal, hideModal} = useModal();
  const {colors} = useThemeStore(state => state.theme);

  // Get wallet data and actions from store
  const balance = walletStore.use.balance();
  const addFunds = walletStore.use.addFunds();

  // Initialize form with React Hook Form + Zod
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: {errors},
  } = useForm<AddFundsFormData>({
    resolver: zodResolver(addFundsSchema),
    defaultValues: {
      amount: '',
    },
  });

  // Watch amount value for conditional rendering
  const amountValue = watch('amount');

  // Handle quick amount selection
  const handleQuickAmountSelect = (value: number) => {
    setValue('amount', value.toString(), {shouldValidate: true});
  };

  // Handle pay button press
  const onSubmit = (data: AddFundsFormData) => {
    // Add funds to wallet using store
    const amountValue = parseFloat(data.amount);
    addFunds(amountValue);

    // Show payment success modal with navigation callbacks
    showModal(
      <PaymentSuccessModal
        visible={true}
        onClose={hideModal}
        amount={amountValue}
        testID="payment-success-modal"
        onContinueToRide={() => navigation.navigate('home')}
        onCheckWallet={() => {
          // Already in wallet, so no navigation needed
          hideModal();
          navigation.goBack();
        }}
      />,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Amount input section */}
        <View style={styles.section}>
          <View>
            <B2 textColor="highlight">Available Balance: ₹{balance}</B2>
            <Divider height={9.6} />
            <Controller
              control={control}
              name="amount"
              render={({field: {onChange, value}}) => (
                <View style={styles.amountInput}>
                  <B1 textColor="highlight">₹</B1>
                  <TextInput
                    numberOfLines={1}
                    keyboardType="numeric"
                    placeholder="00.0"
                    value={value}
                    onChangeText={onChange}
                    placeholderTextColor={colors.textPrimary}
                    style={{
                      width: '50%',
                      fontSize: ms(23),
                      textAlign: 'right',
                      fontWeight: '600',
                    }}
                  />
                </View>
              )}
            />
            {errors.amount && (
              <Text style={styles.errorText}>{errors.amount.message}</Text>
            )}
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
                      amountValue === value.toString()
                        ? colors.highlight
                        : colors.lightGray,
                    borderColor:
                      amountValue === value.toString()
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
                        amountValue === value.toString()
                          ? colors.white
                          : colors.textPrimary,
                    },
                  ]}>
                  + {value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Pay button */}
      {amountValue && (
        <View style={styles.buttonContainer}>
          <ButtonText variant="primary" onPress={handleSubmit(onSubmit)}>
            Pay ₹{(parseFloat(amountValue || '0')).toFixed(2)}
          </ButtonText>
        </View>
      )}
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
    borderColor: theme.colors.textSecondary,
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
  errorText: {
    color: theme.colors.error,
    marginTop: '4@ms',
    fontSize: '12@ms',
  },
  buttonContainer: {
    padding: 16,
    paddingHorizontal: 96,
  },
});

export default AddFundsScreen;
