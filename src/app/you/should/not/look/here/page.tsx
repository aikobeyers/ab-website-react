"use client";
import style from './page.module.css';
import {useEffect, useState} from "react";


const quotesList: Array<string> = [
    'If you are seeing this, buy me snacks',
    'You have to buy me a beer',
    'Give me 5 bucks'
];
const index = Math.floor(Math.random() * quotesList.length);
export default function SecretMessage() {
    const [displayQuote, setDisplayQuote] = useState('');
    useEffect(() => {
        fetch('/api/quotes')
            .then((res) => res.json())
            .then((data) => data.map((record: Quote) => record.quote))
            .then((quotes) => {
                setDisplayQuote(quotes[index])
            })

    }, [])
    return (
        <div className={style.wrapper}>
            <span className={style.message}>{displayQuote}</span>
        </div>
    );
}
