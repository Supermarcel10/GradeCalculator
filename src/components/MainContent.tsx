"use client";

import Modules, {Module} from "./Modules";
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
	modules: Module[];
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
		<div className="px-4 lg:px-8">
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

			{tabs.length > 0 && <div role="tabpanel" className="pt-12 mx-auto w-full xl:w-3/4 2xl:w-5/7 3xl:">
				<Modules modules={tabs[activeIndex].modules}/>
			</div>}
		</div>
	);
};

export default Tabs;
