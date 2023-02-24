import { atom } from "recoil";

export interface IUserDataTypes {
  accessToken: string;
  user: IUserTypes
}

export interface IUserTypes {
  id: string;
  name: string;
}

export const userState = atom<IUserDataTypes>({
  key: 'userState',
  default: {
    accessToken: '',
    user: {
      id: '',
      name: ''
    }
  },
});