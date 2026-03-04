import {IModalType} from '@/core/shared/modal/modal';
import useLocalization from '@/assets/lang';
import dynamic from 'next/dynamic';
import scss from './modal.module.scss';

const DynamicModal = dynamic(() => import('antd/lib/modal'), {ssr: false});
const DynamicDivider = dynamic(() => import('antd/lib/divider'), {ssr: false});

const ModalComponent = ({isInfo, children, isModalOpen, handleOk, handleCancel, closable = false}: IModalType) => {
    const translate = useLocalization();

    const customFooter = (
        <div className={scss.wrapper}>
            <button className={scss.btnOk} onClick={handleOk}>
                {translate('modal_onOk')}
            </button>
        </div>
    );


    return (
        <DynamicModal centered={true} footer={isInfo ? customFooter : ''} className={scss.modal} open={isModalOpen}
                      closable={closable} cancelText={translate('modal_cancel')} onCancel={handleCancel} cancelButtonProps={{className: scss.cancel}}>
            <div className={scss.content}>
                {children}
            </div>
            <DynamicDivider/>
        </DynamicModal>
    );
};

export default ModalComponent;
