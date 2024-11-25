"use client";
import style from './page.module.css';
import {useEffect, useState} from "react";
import Skeleton from "@/components/skeleton";

interface Quote {
    quote: string;
    display: boolean
}

let index = 0;
export default function SecretMessage() {
    const [displayQuote, setDisplayQuote] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        fetch('/api/quotes')
            .then((res) => res.json())
            .then(data => data.filter((record: Quote) => record.display))
            .then((data) => data.map((record: Quote) => record.quote))
            .then((quotes) => {
                index = Math.floor(Math.random() * quotes.length);
                setDisplayQuote(quotes[index]);
                setIsLoading(false);
            })

    }, [])
    return (
        <div className={style.wrapper}>
            {
                isLoading
                    ?
                    <div className={style.loaderContainer}>
                        <Skeleton width={100} height={50} borderRadius={5}/>
                        <Skeleton width={75} height={50} borderRadius={5}/>
                    </div>
                    :
                    <span className={style.message}>{displayQuote}</span>
            }
        </div>
    );
}
