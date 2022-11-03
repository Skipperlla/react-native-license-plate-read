import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {FC, useState} from 'react';
import {Colors, Size} from '@assets/styles';
import Pages from '@utils/pages';
import {useAppNavigation} from '@utils/hooks';
const AVATAR_WIDTH = 250;
const AVATAR_HEIGHT = 250;
interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
const PlateInfo = () => {
  const [user, setUser] = useState<IUser>({
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'dsada@gmail.com',
    phone: '05340343434',
  });
  if (true) return <NotFound />;
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
          <Table value={user.firstName} title={'Ad'} />
          <Table value={user.lastName} title={'Soyad'} />
          <Table value={user.email} title={'Email'} />
          <Table value={user.phone} title={'Phone'} />
        </View>
      </View>
    </SafeAreaView>
  );
};

interface ITable {
  value: string;
  title: string;
}
const Table: FC<ITable> = ({value, title}) => {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderColor: Colors.Primary.disable,
        paddingBottom: Size.padding / 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Size.margin,
      }}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>{title}</Text>
      <Text style={{fontSize: 20}}>{value}</Text>
    </View>
  );
};
const NotFound = () => {
  const navigation = useAppNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 20}}>Boyle bir kullanici bulunamadi!!</Text>
      <TouchableOpacity
        style={{...style.button, marginTop: Size.margin}}
        onPress={() => {
          navigation.navigate(Pages.REGISTER_PLATE);
        }}>
        <Text>Kaydet</Text>
      </TouchableOpacity>
    </View>
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

export default PlateInfo;
