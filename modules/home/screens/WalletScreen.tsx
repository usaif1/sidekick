import React, {useState, useCallback} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

// components
import WalletCard from '@/modules/wallet/components/WalletCard';
import SecurityDepositBar from '@/modules/wallet/components/SecurityDepositBar';
import TransactionList from '@/modules/wallet/components/TransactionList';
import AddFundsButton from '@/modules/wallet/components/AddFundsButton';

// data
import {mockWalletData} from '@/modules/wallet/constants/mockData';

// store
import {useThemeStore} from '@/globalStore';
import {ScaledSheet} from 'react-native-size-matters';
import {Divider, H3} from '@/components';

const {colors} = useThemeStore.getState().theme;

const WalletScreen: React.FC = () => {
  const navigation = useNavigation();

  // Use mock data
  const [walletData, setWalletData] = useState(mockWalletData);

  // Handle withdraw button press
  const handleWithdraw = () => {
    console.log('Withdraw pressed');
    // Implement withdraw logic or navigation
  };

  // Handle add funds button press
  const handleAddFunds = () => {
    // @ts-ignore
    navigation.navigate('walletNavigator', {screen: 'AddFundsScreen'});
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

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '23@ms',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    paddingTop: 16,
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
