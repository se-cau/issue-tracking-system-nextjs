import { atom } from "recoil";


export const issueTitleState = atom<string>({
    key:'issueTitleState',
    default: '',
});

export const issuePriority = atom<string>({
    key:'issuePriority',
    default:'MAJOR'
})

export const issueDescState = atom<string>({
    key:'issueDescState ',
    default:''
})