import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./components/body/app"
import DataProvider from "./redux/store"


ReactDOM.render(
    <React.StrictMode>
            <DataProvider>
                <App />
            </DataProvider>
    </React.StrictMode>,
    document.getElementById('root')
);


