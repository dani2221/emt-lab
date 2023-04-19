import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Books from './Components/Books';
import Header from "./Components/Header";
import ModifyBook from "./Components/ModifyBook";
import Categories from "./Components/Categories";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Books/>,
  },
  {
    path: "/books",
    element: <Books/>,
  },
  {
    path: "/modify",
    element: <ModifyBook/>,
  },
  {
    path: "/categories",
    element: <Categories/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header/>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
