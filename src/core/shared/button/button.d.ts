import React from 'react';

export interface IButton {
    link?: string | null;
    type?: 'primary' | 'secondary' | 'outlined';
    children: React.ReactNode;
    className?: string;
    full?: boolean;
    btnType?: 'submit' | 'reset' | 'button';
}