import scss from './card.module.scss';
import React from 'react';
import {ICardComponentProps} from '@/core/shared/card/card';
const CardComponent: React.FC<ICardComponentProps> = ({children}) => {
    return (
        <div className={scss.section}>
            {children}
        </div>
    );
};

export default CardComponent;