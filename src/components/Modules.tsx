import React from "react";


interface ModulesProps {
	modules: Module[];
}

export interface Module {
	id: string;
	name: string;
	credits: number;
	assessments: Assessment[];
}

export interface Assessment {
	name: string;
	weight?: number;
	mark: number | null;
	quizzes?: Quiz[];
}

export interface Quiz {
	name: string;
	weight?: number;
	mark: number | null;
}

function colorIfFailed(mark: number): string {
	if (mark < 40) {
		return "text-red-500";
	}
	return "";
}

export function getMarkColor(mark: number): string {
	if (mark >= 70) {
		return "text-green-500";
	} else if (mark >= 60) {
		return "text-yellow-500";
	} else if (mark >= 40) {
		return "text-orange-500";
	} else {
		return "text-red-500";
	}
}

const Modules: React.FC<ModulesProps> = ({ modules }) => {
	const remappedModules = modules.map(module => {
		const assessments = module.assessments.flatMap(assessment => (
			Object.values(assessment)[0].map((a: Assessment) => ({
				...a,
				term: parseInt(Object.keys(assessment)[0].split(" ")[1]), // Assign term to assessment
				mark: a.mark || 0 // Default mark of 0 if null
			}))
		));

		return {
			...module,
			totalMark: 100,
			assessments: assessments.sort((a, b) => a.term - b.term) // Sort ascending by term
		};
	});

	return (
		<>
			<div className="flex flex-col px-8 gap-2">
				{remappedModules.map((module) => (
					<div key={module.id} className="collapse bg-base-200">
						<input type="radio" name="module-accordion" />
						<div className="collapse-title text-xl font-medium flex justify-between">
							<p><span className="text-accent/40">{module.id}</span> <span className={`font-bold ` + colorIfFailed(module.totalMark)}>{module.name}</span></p>
							{/*TODO: Calculate the percentage of completed assessments*/}
							<p className={getMarkColor(module.totalMark)}>{module.totalMark}%</p>
						</div>
						<div className="collapse-content">
							{/*	TODO: Add content*/}
						</div>
					</div>
				))}
			</div>
		</>
	);
};


export default Modules;