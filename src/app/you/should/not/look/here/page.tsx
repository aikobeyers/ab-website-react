import style from './page.module.css';

export default function Snacks() {
    return (
        <div className={style.wrapper}>
            <span className={style.message}>If you are seeing this, buy me snacks</span>
        </div>
    );
}