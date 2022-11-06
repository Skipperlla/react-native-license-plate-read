import React, {FC, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  StyleSheet,
} from 'react-native';
import {rs, Pages} from '@utils/index';
import {db} from '@config/index';
import {RootStackParamList} from 'types/navigation';
import {
  collection,
  getCountFromServer,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import {StackScreenProps} from '@react-navigation/stack';
// * Type definitions
interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
interface ITable {
  value: string;
  title: string;
  onPress?: () => void;
}
type Props = StackScreenProps<RootStackParamList, Pages.PLATE_INFO>;

const PlateInfo = ({route}: Props) => {
  // * State's
  const [user, setUser] = useState<IUser>({} as IUser);
  const [isFirstLoading, setIsFirstLoading] = useState<boolean>(true);
  const [dataCount, setDataCount] = useState<number>(0);
  // * Functions
  const getUser = async () => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('plate', '==', route?.params?.plate));
    const snapshot = await getCountFromServer(q);
    setDataCount(snapshot.data().count);
    if (snapshot?.data()?.count) {
      const querySnapshot = await getDocs(q);
      querySnapshot?.forEach(doc => {
        setUser(doc.data());
      });
    }
    setIsFirstLoading(false);
  };
  // * Effects
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SafeAreaView style={styles.wrapper}>
      {isFirstLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={'black'} size="small" />
        </View>
      ) : (
        <View style={styles.container}>
          {dataCount ? (
            <View style={styles.tableWrapper}>
              <Table value={user.firstName} title={'First Name'} />
              <Table value={user.lastName} title={'Last Name'} />
              <Table
                value={user.email}
                title={'E-mail'}
                onPress={() => {
                  Linking.openURL(`mailto:${user.email}`);
                }}
              />
              <Table
                value={user.phone}
                title={'Phone'}
                onPress={() => {
                  Linking.openURL(`tel:${user.phone}`);
                }}
              />
            </View>
          ) : (
            <View style={styles.notFoundContainer}>
              <Text style={styles.textSize}>This user not found!!</Text>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const Table: FC<ITable> = ({value, title, onPress}) => {
  return (
    <View style={styles.tableContainer}>
      <Text style={{...styles.textSize, fontWeight: 'bold'}}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.textSize}>{value}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {flex: 1},
  container: {flex: 1, paddingHorizontal: rs(16)},
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSize: {
    fontSize: rs(20),
  },
  tableContainer: {
    borderBottomWidth: 1,
    borderColor: '#8c8c9f',
    paddingBottom: rs(16) / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: rs(16),
  },
  tableWrapper: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
});

export default PlateInfo;
