import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ClientDetails.css';  // Importing the CSS file

const ClientDetails = () => {
    const { clientId } = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);  // New state for total amount
    const [sortOrder, setSortOrder] = useState('asc');  // New state for sort order
    const [startDate, setStartDate] = useState('');  // New state for start date
    const [endDate, setEndDate] = useState('');  // New state for end date
    const [error, setError] = useState('');

    const fetchClientDetails = async () => {
        try {
            const clientResponse = await axios.get(`http://localhost:8080/api/clients/get/${clientId}`);
            setClient(clientResponse.data);

            const transactionsResponse = await axios.get(`http://localhost:8080/api/transactions/${clientId}`);
            const transactionsData = transactionsResponse.data;
            setTransactions(transactionsData);
            setFilteredTransactions(transactionsData);

            // Calculate total amount
            const total = transactionsData.reduce((sum, transaction) => sum + transaction.amount, 0);
            setTotalAmount(total);

            setError('');
        } catch (err) {
            setClient(null);
            setTransactions([]);
            setFilteredTransactions([]);
            setTotalAmount(0);
            setError('Error fetching client details: ' + err.message);
        }
    };

    useEffect(() => {
        fetchClientDetails();
    }, [clientId]);


    const sortTransactions = (order, start, end) => {
        let sortedTransactions = [...filteredTransactions].sort((a, b) => {
            if (order === 'asc') {
                return new Date(a.date) - new Date(b.date);
            } else {
                return new Date(b.date) - new Date(a.date);
            }
        });
        setFilteredTransactions(sortedTransactions);
        updateTotalAmount(sortedTransactions);
    };

    const filterTransactions = (start, end) => {
        let filtered = transactions.filter(transaction => {
            let transactionDate = new Date(transaction.date);
            let startDate = new Date(start);
            let endDate = new Date(end);
            return transactionDate >= startDate && transactionDate <= endDate;
        });
        setFilteredTransactions(filtered);
        sortTransactions(sortOrder, start, end);
    };

    const updateTotalAmount = (transactions) => {
        const total = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
        setTotalAmount(total);
    };

    const handleUpdateClick = (transaction) => {
        navigate(`/update-transaction/${clientId}/${transaction.id}`, { state: { transaction } });
    };

    const handleDeleteClick = async (transactionId) => {
        try {
            const url = `http://localhost:8080/api/transactions/${clientId}/delete/${transactionId}`;
            await axios.delete(url);
            const updatedTransactions = transactions.filter(transaction => transaction.id !== transactionId);
            setTransactions(updatedTransactions);
            filterTransactions(startDate, endDate);

            window.location.reload();
        } catch (err) {
            setError('Error deleting transaction: ' + err.message);
        }
    };

    const handleAddTransactionClick = () => {
        navigate(`/add-transaction/${clientId}`);
    };

    return (
        <div>
            {error && <p>{error}</p>}
            {client && (
                <div>
                    <div>
                        <h3>Client Details</h3>
                        <div>
                            <p><strong>Name:</strong> {client.name}</p>
                            <p><strong>Email:</strong> {client.email}</p>
                        </div>
                    </div>
                </div>
            )}
            <button onClick={handleAddTransactionClick}>Add Transaction</button>
            {filteredTransactions.length > 0 && (
                <div>
                    <div>
                        <h3>Transactions</h3>
                        {filteredTransactions.map(transaction => (
                            <div key={transaction.id}>
                                <div>
                                    <p><strong>Amount:</strong> {transaction.amount}</p>
                                    <p><strong>Comment:</strong> {transaction.comment}</p>
                                    <p><strong>Date:</strong> {transaction.date}</p>
                                </div>
                                <div>
                                    <button onClick={() => handleUpdateClick(transaction)}>Update</button>
                                    <button onClick={() => handleDeleteClick(transaction.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                        <hr />
                        <div>
                            <h5>Total Amount: ${totalAmount.toFixed(2)}</h5>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientDetails;
