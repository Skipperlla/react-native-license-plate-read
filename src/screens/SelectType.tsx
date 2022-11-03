import {Text, SafeAreaView, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {Colors, Size} from '@assets/styles';
import Pages from '@utils/pages';
import {RootStackParamList} from 'types/navigation';
import {StackScreenProps} from '@react-navigation/stack';
type Props = StackScreenProps<RootStackParamList, Pages.SELECT_TYPE>;

const SelectType = ({navigation}: Props) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate(Pages.CAMERA)}
        style={{...style.button, marginRight: Size.margin}}>
        <Text>Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={style.button}
        onPress={() => navigation.navigate(Pages.MEDIA)}>
        <Text>Media</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  button: {
    backgroundColor: Colors.Primary.button,
    paddingHorizontal: Size.padding,
    paddingVertical: Size.padding / 2,
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SelectType;
