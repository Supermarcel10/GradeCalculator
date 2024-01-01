// import React, { useState, useEffect } from 'react';
// import yaml from 'js-yaml';
// 	import fs from 'fs';
//
// import './Table.css';
//
//
// const ModulesTable = () => {
// 	const [modules, setModules] = useState([]);
//
// 	useEffect(() => {
// 		fs.readFile('../data/year2.yaml', 'utf8', (err, data) => {
// 			if (err) {
// 				console.error(err);
// 				return;
// 			}
// 			setModules(yaml.load(data).modules);
// 		});
// 	}, []);
//
// 	return (
// 		<table>
// 			<thead>
// 			<tr>
// 				<th>ID</th>
// 				<th>Name</th>
// 				<th>Credits</th>
// 				{/* Add other headers as needed */}
// 			</tr>
// 			</thead>
// 			<tbody>
// 			{modules.map(module => (
// 				<tr key={module.id}>
// 					<td>{module.id}</td>
// 					<td>{module.name}</td>
// 					<td>{module.credits}</td>
// 					{/* Add other data fields as needed */}
// 				</tr>
// 			))}
// 			</tbody>
// 		</table>
// 	);
// };
//
// export default ModulesTable;
