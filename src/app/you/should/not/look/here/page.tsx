"use client";
import style from './page.module.css';
import {useEffect, useState} from "react";

const quotes: Array<string> = [
    'If you are seeing this, buy me snacks',
    'You have to buy me a beer',
    'Give me 5 bucks'
];

/*
const getQuote = () => {
    const index = Math.floor(Math.random() * quotes.length);
    console.log(quotes);
    console.log(index);
    return quotes[index]
}
*/
export default function Snacks() {
    const [displayQuote, setDisplayQuote] = useState('')

    const index = Math.floor(Math.random() * quotes.length);
    useEffect(() => setDisplayQuote(quotes[index]), [index]);


    return (
        <div className={style.wrapper}>
            <span className={style.message}>{displayQuote}</span>
        </div>
    );
}
