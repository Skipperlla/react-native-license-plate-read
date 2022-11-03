import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'types/navigation';
type Props = StackNavigationProp<RootStackParamList>;

export const useAppNavigation = () => {
  const navigation = useNavigation<Props>();
  return navigation;
};
