import {getMarkColor} from "@/utils/coloring";
import {getDegreeClass, getNumericalDegreeClass} from "@/utils/degree";
import React from 'react';


const TotalContribution: React.FC = () => {
	const contributions = [
		{ label: 'Contribution 1', value: 60, weight: 0 },
		{ label: 'Contribution 2', value: 80, weight: 0.4 },
		{ label: 'Contribution 3', value: 30, weight: 0.6 },
	];

	const totalValue = contributions.reduce(
		(acc, curr) => acc + curr.value * curr.weight,
		0
	);

	return (
		<div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-4">
			<div className="flex justify-center items-center">
				{contributions.map(({ label, value, weight }, index) => (
					<>
						<div
							key={index}
							className="text-center tooltip tooltip-accent"
							data-tip={`Contributes ${value * weight}% (weight: ${weight})`}
						>
							<span className={`text-2xl font-bold ${getMarkColor(value)}`}>{value}%</span>
						</div>
						{index < contributions.length - 1 && <span className="text-2xl font-bold">&nbsp;&nbsp;+&nbsp;&nbsp;</span>}
					</>
				))}
				<span className="text-2xl font-bold">&nbsp;&nbsp;=&nbsp;&nbsp;</span>
				<div
					className="text-center tooltip tooltip-accent"
					data-tip={`${getDegreeClass(totalValue)} (${getNumericalDegreeClass(totalValue)})`}
				>
						<span className={`text-center text-2xl font-bold ${getMarkColor(totalValue)}`}>{totalValue}%</span>
				</div>
			</div>
		</div>
	);
};

export default TotalContribution;
