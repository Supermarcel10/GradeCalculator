export function getDegreeClass(mark: number) : string {
	switch (true) {
		case mark >= 70:
			return "First";
		case mark >= 60:
			return "Upper Second";
		case mark >= 50:
			return "Lower Second";
		case mark >= 40:
			return "Third";
		default:
			return "Fail";
	}
}

export function getNumericalDegreeClass(mark: number) : string {
	switch (true) {
		case mark >= 70:
			return "1st";
		case mark >= 60:
			return "2:1";
		case mark >= 50:
			return "2:2";
		case mark >= 40:
			return "3rd";
		default:
			return "";
	}
}
