import {View, Text, Button} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

type Props = {};

const UserDetails = (props: Props) => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>UserDetails</Text>
      <Button
        title="Go back"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};

export default UserDetails;
