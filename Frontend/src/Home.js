import React, {useState, useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import HeaderComponent from "./components/HeaderComponent";
import RegisterComponent from "./components/RegisterComponent";
import FooterComponent from "./components/FooterComponent";
import LoginComponent from "./components/LoginComponent";
import Transactions from "./components/Transactions";
import TransactionsUpdate from "./components/TransactionsUpdate";
import PingComponent from "./components/PingComponent";
import AddTransaction from "./components/AddTransaction";
import ClientDetails from "./components/ClientDetails";  // Import the ClientDetails component
import ProtectedRoute from "./components/ProtectedRoute";  // Import the ProtectedRoute component

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <div>
            <HeaderComponent isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
            <div>
                <Routes>
                    <Route exact path="/" element={<LoginComponent/>}/>
                    <Route path="/register" element={<RegisterComponent/>}/>
                    <Route path='/login' element={<LoginComponent/>}/>
                    <Route
                        path="/transactions/:clientId"
                        element={
                            <ProtectedRoute>
                                <Transactions/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/update-transaction/:clientId/:transactionId"
                        element={
                            <ProtectedRoute>
                                <TransactionsUpdate/>
                            </ProtectedRoute>
                        }
                    />
                    <Route exact path="/ping" element={<PingComponent/>}/>
                    <Route
                        path="/add-transaction/:clientId"
                        element={
                            <ProtectedRoute>
                                <AddTransaction/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/client-details/:clientId"
                        element={
                            <ProtectedRoute>
                                <ClientDetails/>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
            <FooterComponent/>
        </div>
    );
};

export default Home;
