import {Pages} from '@utils/index';
const {CAMERA, PERMISSIONS, MEDIA, PLATE_INFO, SELECT_TYPE, REGISTER_PLATE} =
  Pages;

export type RootStackParamList = {
  [CAMERA]: undefined;
  [MEDIA]: undefined;
  [PERMISSIONS]: undefined;
  [PLATE_INFO]: {plate: string};
  [SELECT_TYPE]: undefined;
  [REGISTER_PLATE]: undefined;
};
