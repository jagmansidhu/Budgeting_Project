import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './Updater.css';  // Assuming your custom styles are in App.css

const ClientAmountUpdater = () => {
    const { clientId, transactionId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [amount, setAmount] = useState('');
    const [comment, setComment] = useState('');
    const [date, setDate] = useState('');
    const [response, setResponse] = useState('');

    useEffect(() => {
        if (location.state && location.state.transaction) {
            const { amount, comment, date } = location.state.transaction;
            setAmount(amount);
            setComment(comment);
            setDate(date);
        }
    }, [location.state]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const url = `http://localhost:8080/api/transactions/${clientId}/update/${transactionId}`;
            console.log("Updating transaction with URL:", url);
            const transaction = {
                amount: parseInt(amount, 10),
                comment: comment,
                date: date
            };
            await axios.put(url, transaction, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setResponse('Transaction updated successfully!');
            // Redirect back to client details page after successful update
            navigate(`/client-details/${clientId}`);
        } catch (error) {
            setResponse('Error updating transaction: ' + error.message);
            console.error("Network Error:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <label>Amount:</label>
                        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                </div>
                <div >
                    <div>
                        <label>Comment:</label>
                        <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
                    </div>
                </div>
                <div>
                    <div>
                        <label>Date:</label>
                        <input type="date"  value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                </div>
                <div >
                    <button type="submit" >Update Transaction</button>
                </div>
            </form>
            <p >{response}</p>
        </div>
    );
};

export default ClientAmountUpdater;
