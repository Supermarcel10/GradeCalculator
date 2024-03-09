import {getMarkColor} from "@/utils/coloring";
import React from 'react';
import {Assessment} from "./Modules";


interface AssessmentsProps {
  assessments: Assessment[];
}

const Assessments: React.FC<AssessmentsProps> = ({ assessments }) => {
	const remappedAssessments = assessments.map(assessment => {
		const quizzes = assessment.quizzes || [];
		const weight = assessment.weight || quizzes.reduce((acc, quiz) => acc + (quiz.weight || 0), 0);
		const mark = assessment.mark || quizzes.reduce((acc, quiz) => acc + (quiz.mark || 0), 0); {/*TODO: Double check if calculation works as expected*/}

		return {
			...assessment,
			quizzes,
			weight,
			mark
		};
	});

	return (
		<div className="flex flex-col gap-2">
			{remappedAssessments.map((assessment, index) => (
				<div className="collapse bg-primary/10">
					<input type="radio" name="assessment-accordion" disabled={assessment.quizzes.length === 0} style={{cursor: assessment.quizzes.length === 0 ? "default" : "pointer"}} />
					<div className="collapse-title font-medium flex justify-between">
						<p className="text-lg my-auto"><span className="text-primary/80">T{assessment.term}</span> <span>{assessment.name}</span></p>

						{assessment.quizzes.length > 0 ?
						 <p className={getMarkColor(assessment.mark)}>{assessment.mark}%</p>
						 : <input type="text" placeholder="0" className="input input-bordered input-sm bg-accent/20 text-sm z-10 text-center" style={{width: '6ch'}} maxLength={3} />
						}
					</div>

					{assessment.quizzes.length > 0 && <div className="collapse-content">
						<p>{assessment.quizzes.length}</p>
					</div>}
				</div>
			))}
		</div>
  );
};

export default Assessments;
