import {ReactNode} from 'react';

export interface IModalType {
    isInfo?: boolean;
    children?: ReactNode;
    isModalOpen?: boolean;
    handleOk?: () => void;
    handleCancel?: () => void;
    closable?: boolean;
}