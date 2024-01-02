import React, { useState, useEffect } from 'react';

import './Table.css';


const Table = () => {
	const [tableData, setTableData] = useState(null);
	const [selectedModuleId, setSelectedModuleId] = useState(null);

	const capitalizeFirstLetter = (string) => {
		if (!string) return '';
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('http://localhost:3001/api/table');
				const data = await response.json();
				setTableData(data);
			} catch (error) {
				console.error('Error fetching table data:', error);
			}
		};

		fetchData();
	}, []);

	const toggleAssignments = (moduleId) => {
		if (selectedModuleId === moduleId) {
			setSelectedModuleId(null);
		} else {
			setSelectedModuleId(moduleId);
		}
	};

	const renderAssignments = (moduleId) => {
		if (selectedModuleId === moduleId) {
			const module = tableData.modules.find((mod) => mod.id === moduleId);
			return (
				<table className={"assignments"}>
					<thead>
					  <tr>
              <th>Name</th>
              <th>Weight</th>
							<th>Mark %</th>
            </tr>
					</thead>
					<tbody>
						{module.assessments.map((term, termIndex) => (
							Object.entries(term).map(([termName, assessments], index) => (
								<React.Fragment key={index}>
									<tr className={"term"}>
										<td colSpan="3">{capitalizeFirstLetter(termName)}</td>
									</tr>
									{assessments.map((assessment, assessmentIndex) => (
										<tr key={assessmentIndex}>
											<td>{assessment.name}</td>
											<td>{assessment.weight ? `${assessment.weight}%` : '-'}</td>
											<td>{assessment.mark !== null ? assessment.mark : '-'}</td>
										</tr>
									))}
								</React.Fragment>
							))
						))}
					</tbody>
				</table>
			);
		}
		return null;
	};

	if (!tableData) return <p>Loading...</p>;

	const renderTable = () => {
		console.log(tableData);
		if (!tableData) return null;

		return (
			<table id={"calculator"}>
				<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Credits</th>
					<th>Mark %</th>
				</tr>
				</thead>
				<tbody>
					{tableData?.modules.map((module) => (
						<>
							<tr className={"module"} key={module.id} onClick={() => toggleAssignments(module.id)}>
								<td>{module.id}</td>
								<td>{module.name}</td>
								<td>{module.credits}</td>
								<td>0</td>
							</tr>
							<tr>
								<td colSpan="4">{renderAssignments(module.id)}</td>
							</tr>
						</>
					))}
				</tbody>
				<tfoot>
					<tr>
						<td className={"grand-total-text"} colSpan={3}>Total Mark:</td>
						<td>0</td>
					</tr>
				</tfoot>
			</table>
		);
	};

	return renderTable();
};

export default Table;
