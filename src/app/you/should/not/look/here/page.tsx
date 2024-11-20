import style from './page.module.css';

const quotes: Array<string> = [
    'If you are seeing this, buy me snacks',
    'You have to buy me a beer',
    'Give me 5 bucks'
];

const getQuote = () => {
    const index = Math.floor(Math.random() * quotes.length);
    console.log(quotes);
    console.log(index);
    return quotes[index]
}

export default function Snacks() {
    return (
        <div className={style.wrapper}>
            <span className={style.message}>{getQuote()}</span>
        </div>
    );
}
