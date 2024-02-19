export default function GradeTable() {
	return (
	<div>
		<div className="flex flex-col px-8 gap-2">
			<div className="collapse bg-base-200">
				<input type="radio" name="my-accordion-1" />
				<div className="collapse-title text-xl font-medium">
					Click to open this one and close others
				</div>
				<div className="collapse-content">
					<p>hello</p>
				</div>
			</div>

			<div className="collapse bg-base-200">
				<input type="radio" name="my-accordion-1" />
				<div className="collapse-title text-xl font-medium">
					Click to open this one and close others
				</div>
				<div className="collapse-content">
					<p>hello</p>
				</div>
			</div>
		</div>
	</div>
	);
}
