import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {FlashActiveProps} from '@screens/CameraPage';
import {rs} from '@utils/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
interface ICameraPageRight {
  isFlashActive: FlashActiveProps;
  setIsFlashActive: React.Dispatch<React.SetStateAction<FlashActiveProps>>;
}
const CameraPageRight: FC<ICameraPageRight> = ({
  isFlashActive,
  setIsFlashActive,
}) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={() => {
          if (isFlashActive === 'on') {
            setIsFlashActive('off');
          } else {
            setIsFlashActive('on');
          }
        }}
        style={{
          marginRight: rs(16),
        }}>
        <Ionicons
          name={isFlashActive === 'on' ? 'flash' : 'flash-off'}
          size={rs(18)}
          color={'black'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingRight: rs(16),
    flexDirection: 'row',
  },
});
export default CameraPageRight;
