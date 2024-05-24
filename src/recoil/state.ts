import {atom} from 'recoil';

export const modalState = atom({
    key: 'modalState',
    default: false
});

export const userNameState = atom({
    key: 'userNameState',
    default: ''
});

export const passwordState = atom({
    key: 'passwordState',
    default: ''
});

export const roleState = atom({
    key: 'roleState',
    default: ''
});


export const titleState = atom({
    key: 'titleState',
    default: ''
});

export const memberState = atom<string[]>({
    key: 'memberState',
    default: []
});