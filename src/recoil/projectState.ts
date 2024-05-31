import { atom, useRecoilState } from 'recoil';
import { ProjectInfo } from '@/types/type';

export const projectState = atom({
    key: 'projectState',
    default: [] as ProjectInfo[],
});