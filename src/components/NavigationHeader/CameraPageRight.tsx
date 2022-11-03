import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Size} from '@assets/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FC} from 'react';
import {FlashActiveProps} from '@screens/CameraPage';
interface ICameraPageRight {
  isFlashActive: FlashActiveProps;
  setIsFlashActive: React.Dispatch<React.SetStateAction<FlashActiveProps>>;
}
const CameraPageRight: FC<ICameraPageRight> = ({
  isFlashActive,
  setIsFlashActive,
}) => {
  return (
    <View style={{paddingRight: Size.padding, flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={() => {
          if (isFlashActive === 'on') setIsFlashActive('off');
          else setIsFlashActive('on');
        }}
        style={{
          marginRight: Size.margin,
        }}>
        <Ionicons
          name={isFlashActive === 'on' ? 'flash' : 'flash-off'}
          size={Size.iconSize}
          color={'black'}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <AntDesign
          name={'questioncircle'}
          size={Size.iconSize}
          color={'black'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CameraPageRight;
