import { atom } from "recoil";
import { User } from "./types/user"; 

export const userState = atom<User>({
  key: 'userState',
  default: {
    id: '',
    name: ''
  }
});