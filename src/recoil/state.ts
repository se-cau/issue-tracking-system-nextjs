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

export const contributerName = atom<string[]>({
    key: 'contributerName',
    default: []
});

export const contributerNamePerPj = atom<string[]>({
    key: 'contributerNamePerPj',
    default: []
});

export const contributerId = atom<number[]>({
    key: 'contributerId',
    default: []
});

export const visibleState = atom<boolean>({
    key: 'visibleState',
    default: false
})