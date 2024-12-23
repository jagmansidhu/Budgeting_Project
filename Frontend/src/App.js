import React from 'react';
import {Route, Routes} from 'react-router-dom';
import ClientDetails from './components/ClientDetails';
import ClientAmountUpdater from './components/ClientAmountUpdater';
import Home from './Home';
import PingComponent from "./components/PingComponent";
import HeaderComponent from "./components/HeaderComponent";
import RegisterComponent from "./components/RegisterComponent";
import FooterComponent from "./components/FooterComponent";
import LoginComponent from "./components/LoginComponent";
import AddTransaction from "./components/AddTransaction";

function App() {
    return (
        <div>
            <HeaderComponent/>
            <div>
                <Routes>
                    <Route path="/register" element={<RegisterComponent/>}></Route>
                    <Route path='/login' element={<LoginComponent/>}></Route>
                    <Route exact path="/" element={<Home/>}/>
                    <Route path="/client-details/:clientId" element={<ClientDetails/>}/>
                    <Route path="/update-transaction/:clientId/:transactionId" element={<ClientAmountUpdater/>}/>
                    <Route exact path="/ping" element={<PingComponent/>}/>
                    <Route path="/add-transaction/:clientId" element={<AddTransaction/>}/>
                </Routes>
            </div>
            <FooterComponent/>
        </div>
    );
}

export default App;
