import React, { useCallback, memo } from 'react';
import { View, Text, StyleSheet, FlatList, ListRenderItemInfo } from 'react-native';
import { useThemeStore } from '@/globalStore';
import TransactionCard from './TransactionCard';
import { Transaction } from '../constants/mockData';

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
  const { colors, typography } = useThemeStore(state => state.theme);

  // Optimized render function
  const renderItem = useCallback(({ item }: ListRenderItemInfo<Transaction>) => {
    return <MemoizedTransactionCard transaction={item} />;
  }, []);

  // Optimized key extractor
  const keyExtractor = useCallback((item: Transaction) => item.id, []);

  // Empty list component
  const ListEmptyComponent = useCallback(() => (
    <View style={styles.emptyContainer}>
      <Text 
        style={[
          styles.emptyText,
          { color: colors.neutral[600] }
        ]}
      >
        No transactions yet
      </Text>
    </View>
  ), [colors.neutral]);

  // List header component
  const ListHeaderComponent = useCallback(() => (
    <View 
      style={[
        styles.headerContainer,
        { borderBottomColor: colors.neutral[200] }
      ]}
    >
      <Text 
        style={[
          styles.headerText,
          { 
            color: colors.neutral[700],
            fontSize: typography.fontSize.sm,
          }
        ]}
      >
        Recent Rides
      </Text>
    </View>
  ), [colors.neutral, typography.fontSize]);

  return (
    <FlatList
      data={transactions}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListHeaderComponent={ListHeaderComponent}
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

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
  },
  headerContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  headerText: {
    fontWeight: '600',
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
});

export default TransactionList; 