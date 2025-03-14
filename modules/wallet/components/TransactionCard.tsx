import React from 'react';
import {View} from 'react-native';
import {useThemeStore} from '@/globalStore';
import {Transaction} from '../constants/mockData';
import {P1, P2, P3} from '@/components/Typography';

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
  const {theme} = useThemeStore();

  const isCredit = transaction.type === 'credit';

  return (
    <View
      style={[
        styles.container(theme),
        {
          borderBottomColor: theme.colors.lightGray,
        },
      ]}
      testID={testID}>
      <View style={styles.leftContent(theme)}>
        <P2
          textColor="textPrimary"
          weight="500"
          customStyles={styles.name(theme)}>
          {transaction.name}
        </P2>
        <P3
          textColor="textSecondary"
          weight="400"
          customStyles={styles.dateTime}>
          {transaction.date} • {transaction.time}
        </P3>
      </View>

      <P1
        textColor={isCredit ? "primary" : "error"}
        weight="600">
        {isCredit ? '+ ' : '- '}₹{transaction.amount.toFixed(1)}
      </P1>
    </View>
  );
};

const styles = {
  container: (theme: any) => ({
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingVertical: theme.padding.vertical.sm_8,
    paddingHorizontal: theme.padding.horizontal.md_16,
    borderBottomWidth: 1,
  }),
  leftContent: (theme: any) => ({
    flex: 1,
    marginRight: theme.margin.horizontal.sm_8,
  }),
  name: (theme: any) => ({
    marginBottom: theme.margin.vertical.xs_4,
  }),
  dateTime: {
    // No additional styles needed
  },
};

export default TransactionCard;
