import React, {useState, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

// components
import WalletCard from '../components/WalletCard';
import SecurityDepositBar from '../components/SecurityDepositBar';
import TransactionList from '../components/TransactionList';
import AddFundsButton from '../components/AddFundsButton';
import {P2} from '@/components/Typography';

// data
import {mockWalletData} from '../constants/mockData';

// store
import {useThemeStore} from '@/globalStore';

const WalletScreen: React.FC = () => {
  const navigation = useNavigation();
  const {theme} = useThemeStore();
  
  // Use mock data
  const [walletData, setWalletData] = useState(mockWalletData);

  // Handle withdraw button press
  const handleWithdraw = () => {
    console.log('Withdraw pressed');
    // Implement withdraw logic or navigation
  };

  // Handle add funds button press
  const handleAddFunds = () => {
    navigation.navigate('wallet', {screen: 'AddFundsScreen'});
  };

  // List header component
  const ListHeaderComponent = useCallback(
    () => (
      <View
        style={[
          styles.headerContainer(theme),
          {borderBottomColor: theme.colors.textSecondary},
        ]}>
        <P2 
          textColor="textSecondary"
          weight="600"
          customStyles={styles.headerText}
        >
          Recent Rides
        </P2>
      </View>
    ),
    [theme],
  );

  return (
    <SafeAreaView
      style={[styles.container(theme), {backgroundColor: theme.colors.lightGray}]}>
      <View style={styles.content(theme)}>
        {/* Wallet balance card */}
        <WalletCard
          balance={walletData.currentBalance}
          testID="wallet-balance-card"
        />

        {/* Security deposit bar */}
        <SecurityDepositBar
          depositAmount={walletData.securityDeposit}
          onWithdraw={handleWithdraw}
          testID="security-deposit-bar"
        />

        {/* Transaction list */}
        <View style={styles.transactionsContainer}>
          <ListHeaderComponent />
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

// Using a function approach for styles that need theme values
const styles = {
  container: (theme: any) => ({
    flex: 1,
    paddingHorizontal: theme.padding.horizontal.lg_24,
  }),
  content: (theme: any) => ({
    flex: 1,
    paddingTop: theme.padding.vertical.md_16,
  }),
  transactionsContainer: {
    flex: 1,
  },
  header: (theme: any) => ({
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: theme.padding.vertical.sm_8,
  }),
  backButton: (theme: any) => ({
    padding: theme.padding.horizontal.sm_8,
  }),
  headerTitle: (theme: any) => ({
    flex: 1,
    textAlign: 'left' as const,
    marginLeft: theme.margin.horizontal.md_16,
  }),
  headerContainer: (theme: any) => ({
    paddingVertical: theme.padding.vertical.sm_8,
    paddingHorizontal: theme.padding.horizontal.md_16,
    borderBottomWidth: 1,
    borderStyle: 'dashed' as const,
    marginBottom: theme.margin.vertical.lg_24,
  }),
  headerText: {
    textAlign: 'center',
  },
};

export default WalletScreen;
