import css from './loader.module.scss';
const LoaderComponent = () => {
    return (
        <div className={css.loader}>
            <span className={css.inner}></span>
        </div>
    );
};

export default LoaderComponent;

