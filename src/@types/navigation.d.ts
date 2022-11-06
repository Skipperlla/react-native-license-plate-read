import {Pages} from '@utils/index';

export type RootStackParamList = {
  [Pages.CAMERA]: undefined;
  [Pages.MEDIA]: undefined;
  [Pages.PLATE_INFO]: {plate: string};
  [Pages.SELECT_TYPE]: undefined;
};
