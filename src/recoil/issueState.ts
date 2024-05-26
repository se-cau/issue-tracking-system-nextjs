import { atom } from "recoil";


export const issueTitleState = atom<string>({
    key:'issueTitleState',
    default: '',
});

export const issuePriority = atom<string>({
    key:'issuePriority',
    default:'Major'
})

export const issueDescState = atom<string>({
    key:'issueDescState ',
    default:''
})