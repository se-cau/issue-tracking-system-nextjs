import { atom, useRecoilState } from 'recoil';
import { ProjectInfo } from '@/types/type';
import { AssigneeList } from '../types/type';

export const projectState = atom({
    key: 'projectState',
    default: [] as AssigneeList[],
});

export const assigneeState= atom<string>({
    key:'assigneeState',
    default:''
})

export const assigneeIdState= atom<number>({
    key:'assigneeIdState',
    default:0
})