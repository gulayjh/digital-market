import {ILang} from '@/i18n/locale';

export interface IState {
    loader: boolean;
    navMenu: boolean;
    staticContent: IStaticContent | null;
    user: any | null;
}


export interface ILanguages {
    id: number;
    key: ILang;
    value: string;
}
