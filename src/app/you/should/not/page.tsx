"use client";
import styles from './page.module.css'
import {useEffect, useState} from "react";

interface Quote {
    _id: string;
    quote: string;
    display: boolean;
}

export default function AdminPanel() {
    const [password, setPassword] = useState<string>('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [rowInUpdateState, setRowInUpdateState] = useState<string>('');

    const login = () => {
        if (password === 'aiko') {
            setLoggedIn(true);
        }
    }

    const logout = () => {
        setLoggedIn(false);
    }

    useEffect(() => {
        if (loggedIn) {
            fetch('/api/quotes')
                .then((res) => res.json())
                .then(data => {
                    console.log(data);
                    setQuotes(data);
                })
        }
    }, [loggedIn]);

    const updateRecord = (id: string) => {
        const quoteToUpdate = quotes.find(q => q._id === id);
        if(quoteToUpdate){
            // TODO figure out why it returns 500 via web but not via Postman
            fetch(`/api/quotes/${id}`, {
                method: 'PUT',
                body: JSON.stringify(quoteToUpdate)
            })
                .then(() => setRowInUpdateState(''))
        }
    }

    const handleCheckboxChange = (id: string, newValue: boolean) => {
        setQuotes((prevQuotes) =>
            prevQuotes.map((quote) =>
                quote._id === id ? {...quote, display: newValue} : quote
            )
        );
    }

    const handleInputChange = (id: string, newValue: string) => {
        setQuotes((prevQuotes) =>
            prevQuotes.map((quote) =>
                quote._id === id ? {...quote, quote: newValue} : quote
            )
        );
    };

    return (
        <div className={styles.adminPanelContainer}>
            {
                !loggedIn
                    ?
                    <div className={styles.loginContainer}>
                        <input
                            type={"password"}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button onClick={() => login()}>Log in</button>
                    </div>
                    :
                    <div className={styles.quotesTableContainer}>
                        <button onClick={() => logout()}>Log out</button>
                        <table>
                            <thead>
                            <tr>
                                <td className={styles.valueColumn}>Value</td>
                                <td>Show</td>
                                <td></td>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                quotes.map((quote, index) => (

                                    rowInUpdateState === quote._id
                                        ?
                                        <tr key={index}>
                                            <td>
                                                <input className={styles.quoteInputField} value={quote.quote}
                                                       onChange={(e) => handleInputChange(quote._id, e.target.value)}/>
                                            </td>
                                            <td>
                                                <input type={"checkbox"} checked={quote.display} onChange={(e) => handleCheckboxChange(quote._id, e.target.checked)}/></td>
                                            <td>
                                                <button onClick={() => updateRecord(quote._id)}>save</button>
                                            </td>
                                        </tr>
                                        :
                                        <tr key={index}>
                                            <td>{quote.quote}</td>
                                            <td>
                                                <input type={"checkbox"} checked={quote.display} disabled={true}
                                                       readOnly={true}/></td>
                                            <td>
                                                <button onClick={() => setRowInUpdateState(quote._id)}>edit</button>
                                            </td>
                                        </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    )
}