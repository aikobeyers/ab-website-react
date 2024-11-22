"use client";
import style from './page.module.css';
import {useEffect, useState} from "react";

interface Quote {
    quote: string;
}

let index = 0;
export default function SecretMessage() {
    const [displayQuote, setDisplayQuote] = useState('');
    useEffect(() => {
        fetch('/api/quotes')
            .then((res) => res.json())
            .then((data) => data.map((record: Quote) => record.quote))
            .then((quotes) => {
                index = Math.floor(Math.random() * quotes.length)
                setDisplayQuote(quotes[index])
            })

    }, [])
    return (
        <div className={style.wrapper}>
            <span className={style.message}>{displayQuote}</span>
        </div>
    );
}
