import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';
import './ClientDetails.css';  // Importing the CSS file

const Transactions = () => {
    const {clientId} = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);  // New state for total amount
    const [sortOrder, setSortOrder] = useState('asc');  // New state for sort order
    const [startDate, setStartDate] = useState('');  // New state for start date
    const [endDate, setEndDate] = useState('');  
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
        navigate(`/update-transaction/${clientId}/${transaction.id}`, {state: {transaction}});
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
           {/* {client && (
                <div className="detail-container">
                    <div className="client-info">
                        <h4 className="heading"><strong>Client Details - </strong></h4>
                        <h4 className="heading"><strong>Name:</strong> {client.name}</h4>
                        <h4 className="heading"><strong>Email:</strong> {client.email}</h4>
                    </div>
                </div>
            )}*/}
            <button className="transaction-button" onClick={handleAddTransactionClick}>Add Transaction</button>
            {filteredTransactions.length > 0 && (
                <div>
                    <div >
                        <h3>Transactions</h3>
                        {filteredTransactions.map(transaction => (
                            <div key={transaction.id}>
                                <div className="client-info">
                                    <p className="transaction-info"><strong>Amount:</strong> {transaction.amount}</p>
                                    <p className="transaction-info"><strong>Comment:</strong> {transaction.comment}</p>
                                    <p className="transaction-info"><strong>Date:</strong> {transaction.date}</p>
                                </div>
                                <div>
                                    <button className="item-button" onClick={() => handleUpdateClick(transaction)}>
                                        Update
                                    </button>
                                    <button className="item-button" onClick={() => handleDeleteClick(transaction.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                        <hr/>
                        <div>
                            <h5>Total Amount: ${totalAmount.toFixed(2)}</h5>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Transactions;
