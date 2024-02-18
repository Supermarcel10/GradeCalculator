"use client";

import React, {useState} from "react";


export default function Home() {
	const [university, setUniversity] = useState<string>("None");
	const [degree, setDegree] = useState<string>("None");
	const [course, setCourse] = useState<string>("None");

  return (
	<div>
		<h1 className="text-center font-bold text-4xl pt-8">Grade Calculator</h1>
		<p className="text-center italic pb-12">So you can show off to your friends!</p>

		<div className="mx-auto flex gap-8 px-8 pb-16 items-center justify-center">
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text">University</span>
				</div>
				<select className="select select-bordered" value={university} onChange={(e) => setUniversity(e.target.value)}>
					<option disabled>None</option>
					<option>City University of London</option>
				</select>
			</label>

			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text">Degree</span>
				</div>
				<select className="select select-bordered" value={degree} onChange={(e) => setDegree(e.target.value)}>
					<option disabled>None</option>
					<option>BSc</option>
				</select>
			</label>

			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text">Course</span>
				</div>
				<select className="select select-bordered" value={course} onChange={(e) => setCourse(e.target.value)}>
					<option disabled>None</option>
					<option>Computer Science</option>
				</select>
			</label>
		</div>
	</div>
  );
}
