"use client";
import styles from './page.module.css'
import {useEffect, useState} from "react";

interface Quote {
    _id?: string;
    quote: string;
    display: boolean;
}

export default function AdminPanel() {
    const [password, setPassword] = useState<string>('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [rowInUpdateState, setRowInUpdateState] = useState<string>('');
    const [showNewRecordRow, setShowNewRecordRow] = useState(false);
    const [newQuote, setNewQuote] = useState<Quote>({quote: '', display: true});
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

    const updateRecord = (id?: string) => {
        if (!id) {
            return;
        }
        const quoteToUpdate = quotes.find(q => q._id === id);
        if (quoteToUpdate) {
            // TODO figure out why it returns 404 via web
            /*fetch(`/api/quotes/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(quoteToUpdate)
            })
                .then(() => {
                    fetch('/api/quotes')
                        .then((res) => res.json())
                        .then(data => {
                            setRowInUpdateState('');
                            setQuotes(data);
                        })
                })*/

            fetch(`/api/quotes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(quoteToUpdate)
            })
                .then(() => {
                    fetch('/api/quotes')
                        .then((res) => res.json())
                        .then(data => {
                            setRowInUpdateState('');
                            setQuotes(data);
                        })
                })
        }
    }

    const handleCheckboxChange = (newValue: boolean, id?: string) => {
        if (id) {
            setQuotes((prevQuotes) =>
                prevQuotes.map((quote) =>
                    quote._id === id ? {...quote, display: newValue} : quote
                )
            );
        }
    }

    const handleInputChange = (newValue: string, id?: string) => {
        if (id) {
            setQuotes((prevQuotes) =>
                prevQuotes.map((quote) =>
                    quote._id === id ? {...quote, quote: newValue} : quote
                )
            );
        }
    };

    const handleNewQuoteInputChange = (newValue: string) => {
        setNewQuote((prevValue) => ({...prevValue, quote: newValue}))
    }

    const handleNewQuoteCheckboxChange = (newValue: boolean) => {
        setNewQuote((prevValue) => ({...prevValue, display: newValue}))
    }

    const addNewQuote = () => {
        fetch(`/api/quotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newQuote)
        })
            .then(() => {
                fetch('/api/quotes')
                    .then((res) => res.json())
                    .then(data => {
                        setShowNewRecordRow(false);
                        setQuotes(data);
                    })
            })
    }

    const deleteQuote = (id?: string) => {
        if (id) {
            fetch(`/api/delete/${id}`, {
                method: 'DELETE',
            })
                .then(() => {
                    fetch('/api/quotes')
                        .then((res) => res.json())
                        .then(data => {
                            setQuotes(data);
                        })
                })
        }
    }

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
                                                       onChange={(e) => handleInputChange(e.target.value, quote._id)}/>
                                            </td>
                                            <td>
                                                <input type={"checkbox"} checked={quote.display}
                                                       onChange={(e) => handleCheckboxChange(e.target.checked, quote._id)}/>
                                            </td>
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
                                                <button
                                                    onClick={() => quote._id && setRowInUpdateState(quote._id)}>edit
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={() => deleteQuote(quote._id)}>delete</button>
                                            </td>
                                        </tr>
                                ))
                            }
                            {
                                showNewRecordRow && (
                                    <tr>
                                        <td>
                                            <input className={styles.quoteInputField} value={newQuote.quote}
                                                   onChange={(e) => handleNewQuoteInputChange(e.target.value)}/>
                                        </td>
                                        <td>
                                            <input type={"checkbox"} checked={newQuote.display}
                                                   onChange={(e) => handleNewQuoteCheckboxChange(e.target.checked)}/></td>
                                        <td>
                                            <button onClick={() => addNewQuote()}>save</button>
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                        <button onClick={() => setShowNewRecordRow(true)}>Add</button>
                    </div>
            }
        </div>
    )
}