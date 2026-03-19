import { useState, useRef, useEffect } from "react";
import { updateFormField, type AnyForm } from "../../libs/utils";

interface DatePickerProps {
	value: AnyForm;
	setter: any;
	dkey: string;
}

export default function DatePicker({ value, setter, dkey }: DatePickerProps) {
	const [open, setOpen] = useState(false);
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const ref = useRef<HTMLDivElement>(null);

	// Close on outside click
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const daysInMonth = new Date(
		currentMonth.getFullYear(),
		currentMonth.getMonth() + 1,
		0,
	).getDate();

	const firstDayOfMonth = new Date(
		currentMonth.getFullYear(),
		currentMonth.getMonth(),
		1,
	).getDay();

	const handleSelect = (day: number) => {
		const selected = new Date(
			currentMonth.getFullYear(),
			currentMonth.getMonth(),
			day,
		);

		updateFormField(dkey, selected, setter);
		setOpen(false);
	};

	const formatDate = (date: Date | null) => {
		if (!date) return "";
		return date.toLocaleDateString();
	};

	return (
		<div ref={ref} className="relative text-c4">
			{/* Input */}
			<input
				readOnly
				value={formatDate(value[dkey])}
				onClick={() => setOpen(!open)}
				placeholder="Select date"
				className="w-full rounded-lg cursor-pointer bg-c1 border-none outline-none focus:ring-0 text-center"
			/>

			{/* Calendar */}
			{open && (
				<div className="absolute bg-c1 rounded-lg shadow-lg mt-2 p-4 z-50">
					{/* Month Navigation */}
					<div className="flex justify-between items-center mb-2">
						<button
							onClick={() =>
								setCurrentMonth(
									new Date(
										currentMonth.getFullYear(),
										currentMonth.getMonth() -
											1,
										1,
									),
								)
							}
						>
							◀
						</button>

						<span className="font-semibold">
							{currentMonth.toLocaleString(
								"default",
								{
									month: "long",
									year: "numeric",
								},
							)}
						</span>

						<button
							onClick={() =>
								setCurrentMonth(
									new Date(
										currentMonth.getFullYear(),
										currentMonth.getMonth() +
											1,
										1,
									),
								)
							}
						>
							▶
						</button>
					</div>

					{/* Days */}
					<div className="grid grid-cols-7 gap-1 text-center">
						{[
							"Su",
							"Mo",
							"Tu",
							"We",
							"Th",
							"Fr",
							"Sa",
						].map((day) => (
							<div
								key={day}
								className="text-xs font-bold"
							>
								{day}
							</div>
						))}

						{/* Empty spaces */}
						{Array.from({
							length: firstDayOfMonth,
						}).map((_, i) => (
							<div key={`empty-${i}`} />
						))}

						{/* Days */}
						{Array.from({ length: daysInMonth }).map(
							(_, i) => {
								const day = i + 1;
								const isSelected =
									value &&
									value[dkey].getDate() ===
										day &&
									value[dkey].getMonth() ===
										currentMonth.getMonth() &&
									value[
										dkey
									].getFullYear() ===
										currentMonth.getFullYear();

								return (
									<div
										key={day}
										onClick={() =>
											handleSelect(
												day,
											)
										}
										className={`cursor-pointer p-2 rounded hover:bg-c2 ${
											isSelected
												? "bg-c3"
												: ""
										}`}
									>
										{day}
									</div>
								);
							},
						)}
					</div>
				</div>
			)}
		</div>
	);
}
