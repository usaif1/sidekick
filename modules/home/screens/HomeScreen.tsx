import {View, Text, Button} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = {};

const HomeScreen = (props: Props) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View>
        <Text>HomeScreen</Text>
        <Button
          title="User screen"
          onPress={() => {
            navigation.navigate('User');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
