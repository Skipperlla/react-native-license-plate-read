import {View, SafeAreaView, Image} from 'react-native';
import React from 'react';
import {Colors, Size} from '@assets/styles';
const AVATAR_WIDTH = 250;
const AVATAR_HEIGHT = 250;
const RegisterPlate = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View
        style={{
          // paddingHorizontal: 120,
          // paddingVertical: 120,
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: Size.padding,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: Size.margin,
          }}>
          <View
            style={{
              borderRadius: 999,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.32,
              shadowRadius: 5.46,
              borderWidth: 1,
              borderColor: Colors.Primary.button,
              padding: Size.padding / 6,
            }}>
            <Image
              source={{
                uri: 'https://avatars.githubusercontent.com/u/68515357?v=4',
                width: AVATAR_WIDTH,
                height: AVATAR_HEIGHT,
              }}
              style={{
                borderRadius: 999,
              }}
              resizeMode="cover"
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
          }}>
          {/* <Table value={user.firstName} title={'Ad'} />
          <Table value={user.lastName} title={'Soyad'} />
          <Table value={user.email} title={'Email'} />
          <Table value={user.phone} title={'Phone'} /> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterPlate;
