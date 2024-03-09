export function colorIfFailed(mark : number) : string {
	return mark < 40 ? "text-red-500" : "";
}

export function getMarkColor(mark : number) : string {
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
