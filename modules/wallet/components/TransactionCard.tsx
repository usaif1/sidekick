import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useThemeStore} from '@/globalStore';
import {Transaction} from '../constants/mockData';

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
  const {colors, spacing, typography} = useThemeStore(state => state.theme);

  const isCredit = transaction.type === 'credit';

  return (
    <View
      style={[
        styles.container,
        {
          borderBottomColor: colors.lightGray,
        },
      ]}
      testID={testID}>
      <View style={styles.leftContent}>
        <Text
          style={[
            styles.name,
            {
              color: colors.textPrimary,
              fontSize: typography.skP2.fontSize,
            },
          ]}
          numberOfLines={1}>
          {transaction.name}
        </Text>
        <Text
          style={[
            styles.dateTime,
            {
              color: colors.textSecondary,
              fontSize: typography.skP3.fontSize,
            },
          ]}>
          {transaction.date} • {transaction.time}
        </Text>
      </View>

      <Text
        style={[
          styles.amount,
          {
            color: isCredit ? colors.primary : colors.error,
            fontSize: typography.skP1.fontSize,
          },
        ]}>
        {isCredit ? '+ ' : '- '}₹{transaction.amount.toFixed(1)}
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
