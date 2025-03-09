import {View, Text} from 'react-native';
import React from 'react';

// imports
import Button from '@/components/ButtonText';
import {SafeAreaView} from 'react-native-safe-area-context';

const WalletScreen: React.FC = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <Text>WalletScreen</Text>
        <Button onPress={() => {}} variant="secondary">
          Click Me
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default WalletScreen;
