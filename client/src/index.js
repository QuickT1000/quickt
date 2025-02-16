import React from 'react';
import ReactDOM from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import "primereact/resources/themes/lara-light-cyan/theme.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
      <BrowserRouter>
          <PrimeReactProvider value={{ unstyled: false }}>
            <App />
          </PrimeReactProvider>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
