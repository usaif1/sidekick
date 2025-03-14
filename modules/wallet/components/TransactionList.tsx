import React, { useCallback, memo } from 'react';
import { View, FlatList, ListRenderItemInfo } from 'react-native';
import { useThemeStore } from '@/globalStore';
import TransactionCard from './TransactionCard';
import { Transaction } from '../constants/mockData';
import { P1 } from '@/components/Typography';

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
  const { theme } = useThemeStore();

  // Optimized render function
  const renderItem = useCallback(({ item }: ListRenderItemInfo<Transaction>) => {
    return <MemoizedTransactionCard transaction={item} />;
  }, []);

  // Optimized key extractor
  const keyExtractor = useCallback((item: Transaction) => item.id, []);

  // Empty list component
  const ListEmptyComponent = useCallback(() => (
    <View style={styles.emptyContainer(theme)}>
      <P1 textColor="textPrimary">
        No transactions yet
      </P1>
    </View>
  ), [theme]);

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
  },
  headerContainer: (theme: any) => ({
    paddingVertical: theme.padding.vertical.sm_8,
    paddingHorizontal: theme.padding.horizontal.md_16,
    borderBottomWidth: 1,
  }),
  emptyContainer: (theme: any) => ({
    padding: theme.padding.horizontal.lg_24,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  }),
};

export default TransactionList; 