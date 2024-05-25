import {atom} from 'recoil';

export const userIdState = atom<number>({
    key:'userIdState',
    default: 0,
});