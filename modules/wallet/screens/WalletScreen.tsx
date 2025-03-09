import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WalletCard from '../components/WalletCard';
import SecurityDepositBar from '../components/SecurityDepositBar';
import TransactionList from '../components/TransactionList';
import AddFundsButton from '../components/AddFundsButton';
import { mockWalletData } from '../constants/mockData';
import { useThemeStore } from '@/globalStore';

const WalletScreen = () => {
  const navigation = useNavigation();
  const { colors } = useThemeStore(state => state.theme);
  
  // Use mock data
  const [walletData, setWalletData] = useState(mockWalletData);
  
  // Handle withdraw button press
  const handleWithdraw = () => {
    console.log('Withdraw pressed');
    // Implement withdraw logic or navigation
  };
  
  // Handle add funds button press
  const handleAddFunds = () => {
    navigation.navigate('AddFundsScreen');
  };

  return (
    <SafeAreaView 
      style={[
        styles.container,
        { backgroundColor: colors.neutral[50] }
      ]}
    >
      <View style={styles.content}>
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
          <TransactionList 
            transactions={walletData.transactions}
            testID="transactions-list"
          />
        </View>
      </View>
      
      {/* Add funds button */}
      <AddFundsButton 
        onPress={handleAddFunds}
        testID="add-funds-button"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  transactionsContainer: {
    flex: 1,
  },
});

export default WalletScreen; 