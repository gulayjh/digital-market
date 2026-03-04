import Link from 'next/link';
import {IButton} from '@/core/shared/button/button';
import css from './button.module.scss';
import classNames from 'classnames';

const ButtonComponent = ({link, type = 'primary', btnType, className = '', full, children}: IButton) => {
    const classes = classNames({
        [css.button]: true,
        [className]: className,
        [css.button_primary]: type === 'primary',
        [css.button_secondary]: type === 'secondary',
        'w-100': full,
    });
    return (
        <>
            {
                link ? <Link href={link} className={classes}>
                        {children}
                    </Link>
                    :
                    <button type={btnType} className={classes}>
                        {children}
                    </button>
            }
        </>
    );
};

export default ButtonComponent;
