"use client";

import GradeTable from "@/components/GradeTable";
import React, {
	useEffect,
	useState
} from "react";


interface InputProps {
	university: string | null;
	degree: string | null;
	course: string | null;
}

interface TabProps {
	university: string;
	degree: string;
	course: string;
	year: number;
	modules: any[]; // TODO: Replace with proper type later on
}

const Tabs: React.FC<InputProps> = ({university, degree, course}) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [tabs, setTabs] = useState<TabProps[]>([]);

	useEffect(() => {
		if (!university || !degree || !course) {
			return;
		}

		const fetchData = async () => {
			try {
				const response = await fetch(
					`/api/modules?university=${university}&degree=${degree}&course=${course}`
				);

				if (!response.ok) {
					throw new Error("Failed to fetch module data");
				}

				const data = await response.json();

				const newTabs = Object.keys(data).map((year) => ({
					university: university,
					degree: degree,
					course: course,
					year: parseInt(year),
					modules: data[year],
				}));

				setTabs(newTabs);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [university, degree, course]);

	return (
		<div className="px-8">
			<div className="px-16 flex justify-center">
				<div role="tablist" className="gap-4 tabs tabs-bordered tabs-lg">
					{tabs.map((tab, index) => (
						<a
							key={tab.year}
							role="tab"
							className={`tab ${index === activeIndex ? "tab-active " : ""}`}
							onClick={() => setActiveIndex(index)}
						>
							Year {tab.year}
						</a>
					))}
				</div>
			</div>
			{tabs.length > 0 && <div role="tabpanel" className="p-8 pb-0">
				<GradeTable/>
			</div>}
		</div>
	);
};

export default Tabs;
