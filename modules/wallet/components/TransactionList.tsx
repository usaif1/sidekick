import React, {useCallback, memo} from 'react';
import {
  View,
  Text,
  FlatList,
  ListRenderItemInfo,
} from 'react-native';
import {useThemeStore} from '@/globalStore';
import TransactionCard from './TransactionCard';
import {Transaction} from '../constants/mockData';

interface TransactionListProps {
  /**
   * Array of transactions to display
   */
  transactions: Transaction[];
  /**
   * Optional test ID for testing
   */
  testID?: string;
}

// Memoized transaction card component for performance
const MemoizedTransactionCard = memo(TransactionCard);

/**
 * Optimized list of transaction cards
 */
const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  testID = 'transaction-list',
}) => {
  const {colors} = useThemeStore(state => state.theme);

  // Optimized render function
  const renderItem = useCallback(({item}: ListRenderItemInfo<Transaction>) => {
    return <MemoizedTransactionCard transaction={item} />;
  }, []);

  // Optimized key extractor
  const keyExtractor = useCallback((item: Transaction) => item.id, []);

  // Empty list component
  const ListEmptyComponent = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={[ {color: colors.textPrimary}]}>
          No transactions yet
        </Text>
      </View>
    ),
    [colors.textPrimary],
  );

  return (
    <FlatList
      data={transactions}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListEmptyComponent={ListEmptyComponent}
      initialNumToRender={8}
      maxToRenderPerBatch={5}
      windowSize={5}
      removeClippedSubviews={true}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      testID={testID}
    />
  );
};

const styles = {
  listContent: {
    flexGrow: 1,
  },  emptyContainer: {
    padding: 20,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
};

export default TransactionList;
