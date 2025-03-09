import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeStore } from '@/globalStore';
import { Transaction } from '../constants/mockData';

interface TransactionCardProps {
  /**
   * Transaction data
   */
  transaction: Transaction;
  /**
   * Optional test ID for testing
   */
  testID?: string;
}

/**
 * Card displaying transaction details
 */
const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  testID = `transaction-card-${transaction.id}`,
}) => {
  const { colors, spacing, typography } = useThemeStore(state => state.theme);

  const isCredit = transaction.type === 'credit';

  return (
    <View 
      style={[
        styles.container,
        {
          borderBottomColor: colors.neutral[200],
        }
      ]}
      testID={testID}
    >
      <View style={styles.leftContent}>
        <Text 
          style={[
            styles.name,
            {
              color: colors.neutral[900],
              fontSize: typography.fontSize.base,
            }
          ]}
          numberOfLines={1}
        >
          {transaction.name}
        </Text>
        <Text 
          style={[
            styles.dateTime,
            {
              color: colors.neutral[600],
              fontSize: typography.fontSize.xs,
            }
          ]}
        >
          {transaction.date} • {transaction.time}
        </Text>
      </View>
      
      <Text 
        style={[
          styles.amount,
          {
            color: isCredit ? colors.success[500] : colors.neutral[900],
            fontSize: typography.fontSize.base,
          }
        ]}
      >
        {isCredit ? '+' : ''}₹{transaction.amount.toFixed(1)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  leftContent: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontWeight: '500',
    marginBottom: 4,
  },
  dateTime: {
    fontWeight: '400',
  },
  amount: {
    fontWeight: '600',
  },
});

export default TransactionCard; 