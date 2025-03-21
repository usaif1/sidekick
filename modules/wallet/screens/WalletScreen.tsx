import React, {useState, useCallback} from 'react';
import {View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

// components
import WalletCard from '../components/WalletCard';
import SecurityDepositBar from '../components/SecurityDepositBar';
import TransactionList from '../components/TransactionList';
import AddFundsButton from '../components/AddFundsButton';

// data
import {mockWalletData} from '../constants/mockData';

// store
import {useGlobalStore, useThemeStore} from '@/globalStore';
import {ScaledSheet} from 'react-native-size-matters';
import {Divider, H3} from '@/components';

const {colors} = useThemeStore.getState().theme;

const WalletScreen: React.FC = () => {
  const navigation = useNavigation();

  const {closeBottomSheet} = useGlobalStore();

  // Use mock data
  const [walletData, setWalletData] = useState(mockWalletData);

  // Handle withdraw button press
  const handleWithdraw = () => {
    console.log('Withdraw pressed');
    // Implement withdraw logic or navigation
  };

  // Handle add funds button press
  const handleAddFunds = () => {
    console.log('pressed');
    // @ts-ignore
    navigation.navigate('wallet', {screen: 'WalletScreen'});
  };

  // List header component
  const ListHeaderComponent = useCallback(
    () => (
      <>
        <View style={styles.headerContainer}>
          <H3 textColor="textSecondary" customStyles={{textAlign: 'center'}}>
            Recent Rides
          </H3>
        </View>
        <View style={styles.dashedBorder} />
      </>
    ),
    [],
  );

  useFocusEffect(
    useCallback(() => {
      closeBottomSheet();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <View style={[styles.container, {backgroundColor: colors.white}]}>
      <View style={styles.content}>
        {/* Wallet balance card */}
        <WalletCard
          balance={walletData.currentBalance}
          testID="wallet-balance-card"
        />

        {/* Security deposit bar */}
        <Divider height={9.5} />
        <SecurityDepositBar
          depositAmount={walletData.securityDeposit}
          onWithdraw={handleWithdraw}
          testID="security-deposit-bar"
        />

        {/* Transaction list */}
        <View style={styles.transactionsContainer}>
          <Divider height={32} />
          <ListHeaderComponent />
          <Divider height={4.5} />
          <TransactionList
            transactions={walletData.transactions}
            testID="transactions-list"
          />
        </View>
      </View>

      {/* Add funds button */}
      <AddFundsButton onPress={handleAddFunds} testID="add-funds-button" />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '23@ms',
    justifyContent: 'center',
    paddingTop: '27.6@ms',
  },
  content: {
    flex: 1,
  },
  transactionsContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'left',
    marginLeft: 16,
  },
  headerContainer: {
    paddingBottom: 20,
  },
  dashedBorder: {
    width: '100%',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.textSecondary,
  },
  headerText: {
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default WalletScreen;
