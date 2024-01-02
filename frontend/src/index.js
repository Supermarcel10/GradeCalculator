import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/style.css';
import Table from "./components/Table";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
		{/*Title*/}
		<h1>Grade Calculator</h1>
		<p id="caption">So you can show off to your friends!</p>
		<br/>

		{/*Table*/}
		<Table />

		<br/>
  </React.StrictMode>
);
