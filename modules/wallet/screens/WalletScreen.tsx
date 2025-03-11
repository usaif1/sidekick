import React, { useState, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView,TouchableOpacity,Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WalletCard from '../components/WalletCard';
import SecurityDepositBar from '../components/SecurityDepositBar';
import TransactionList from '../components/TransactionList';
import AddFundsButton from '../components/AddFundsButton';
import { mockWalletData } from '../constants/mockData';
import { useThemeStore } from '@/globalStore';
import Icon from "react-native-vector-icons/Feather";
import { Heading } from '@/components/Typography';
const WalletScreen = () => {
  const navigation = useNavigation();
  const { colors,typography } = useThemeStore(state => state.theme);
  
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

  // List header component
  const ListHeaderComponent = useCallback(() => (
    <View 
      style={[
        styles.headerContainer,
        { borderBottomColor: colors.textSecondary }
      ]}
    >
      <Text 
        style={[
          styles.headerText,
          { 
            color: colors.textSecondary,
            fontSize: typography.skP2.fontSize,
          }
        ]}
      >
        Recent Rides
      </Text>
    </View>
  ), [colors.textPrimary, typography.skP1.fontSize]);

  return (
    <SafeAreaView 
      style={[
        styles.container,
        { backgroundColor: colors.lightGray }
      ]}
    >
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <Icon name="chevron-left" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Heading style={styles.headerTitle}>Wallet</Heading>
      </View>

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
          <ListHeaderComponent />
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
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  transactionsContainer: {
    flex: 1,
  },header: {
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderStyle:'dashed',
    marginBottom:20
  },
  headerText: {
    fontWeight: '600',
    textAlign:'center'
  },
});

export default WalletScreen; 