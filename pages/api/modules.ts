import * as fs from "fs";
import yaml from "js-yaml";
import {NextApiRequest, NextApiResponse} from "next";
import * as path from "path";


const dataDirectory = path.join(process.cwd(), "public", "data");

type YearModules = {
	[year: number]: Module[];
};

interface Quiz {
	name: string;
	weight: number;
	mark?: number;
}

interface Assessment {
	term: number;
	name: string;
	weight: number;
	mark?: number;
	quizzes?: Quiz[];
	grading_mechanism?: string;
	bonus_weight?: number;
	bonus_mechanism?: string;
}

interface Module {
	id: string;
	name: string;
	credits: number;
	assessments: Assessment[];
}

interface ModuleData {
	university: string;
	degree: string;
	course: string;
	year: number;
	modules: Module[];
}

interface QueryParams {
	university?: string;
	degree?: string;
	course?: string;
}

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
	if (req.method === "GET") {
		try {
			const {university, degree, course} : QueryParams = req.query;

			if (university && degree && course) {
				res.status(200).json(await fetchAndProcessYaml(university, degree, course));
			} else {
				res.status(400).json({error : "Missing parameters"});
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({error : "Error fetching modules"});
		}
	} else {
		res.status(405).json({error : "Method not allowed"});
	}
}

async function fetchAndProcessYaml(university : string, degree : string, course : string) : Promise<YearModules> {
	const files = fs.readdirSync(dataDirectory);
	const moduleData : YearModules = {};

	for (const file of files){
		if (file.toLowerCase().endsWith(".yaml")) {
			const filePath = path.join(dataDirectory, file);
			const content = fs.readFileSync(filePath, "utf-8");
			const data : ModuleData = yaml.load(content) as ModuleData;

			console.log(data.university, university, data.degree, degree, data.course, course);

			if (data.university === university && data.degree === degree && data.course === course) {
				moduleData[data.year] = data.modules;
			}
		}
	}

	return moduleData;
}
