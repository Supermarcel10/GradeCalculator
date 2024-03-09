import Assesments from "@/components/Assessments";
import {colorIfFailed, getMarkColor} from "@/utils/coloring";
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
	term: number;
	quizzes?: Quiz[];
}

export interface Quiz {
	name: string;
	weight?: number;
	mark: number | null;
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
			<div className="flex flex-col md:px-8 gap-2">
				{remappedModules.map((module) => (
					<div key={module.id} className="collapse bg-base-200">
						<input type="radio" name="module-accordion" />
						<div className="collapse-title text-xl flex justify-between">
							<h2><span className="text-accent/40">{module.id}</span> <span className={"font-medium " + colorIfFailed(module.totalMark)}>{module.name}</span></h2>
							{/*TODO: Calculate the percentage of completed assessments*/}
							<h2 className={getMarkColor(module.totalMark)}>{module.totalMark}%</h2>
						</div>
						<div className="collapse-content">
							<Assesments assessments={module.assessments} />
						</div>
					</div>
				))}
			</div>
		</>
	);
};


export default Modules;
