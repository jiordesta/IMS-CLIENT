import { useState } from "react";
import toast from "react-hot-toast";
import { updateFormField, type AnyForm } from "../../libs/utils";

interface NumberInputProps {
	label: string;
	placeholder?: string;
	icon?: string;
	type?: string;
	value: AnyForm;
	setter: any;
	dkey: string;
	disabled?: boolean;
}

export default function NumberInput({
	label,
	placeholder,
	value,
	setter,
	dkey,
	disabled = false,
}: NumberInputProps) {
	const [isFocus, setIsFocus] = useState(false);

	const increase = () => {
		updateFormField(dkey, value[dkey] + 1, setter);
	};

	const decrease = () => {
		if (value[dkey] <= 0) {
			toast.error("Invalid");
			return;
		}
		updateFormField(dkey, value[dkey] - 1, setter);
	};

	const onInputChange = (e: any) => {
		//e.preventDefault();
		const input = Number(e.target.value);

		if (input < 0 || input > 99999) {
			toast.error("Invalid");
			return;
		}

		updateFormField(dkey, input, setter);
	};

	return (
		<div className="px-2">
			<div
				className={`relative w-full border-b py-1 ${isFocus ? "border-c3/50" : "border-c4/50"}`}
			>
				<label
					className={`${value[dkey] > 0 || isFocus ? "-top-4 text-[12px]" : ""} absolute left-0 pointer-events-none uppercase`}
				>
					{`${value[dkey] > 0 || isFocus ? label : placeholder}`}
				</label>
				<div className="flex justify-around w-full">
					<input
						type="number"
						onChange={onInputChange}
						disabled={disabled}
						placeholder={`${isFocus ? placeholder : ""}`}
						value={value[dkey] || ""}
						onFocus={() => setIsFocus(true)}
						onBlur={() => setIsFocus(false)}
						className="border-none outline-none bg-transparent focus:ring-0 w-full"
					/>
					<div className="flex w-[20%] gap-1">
						<button
							className="w-full cursor-pointer font-bold text-xl bg-c3/75 hover:bg-c3/50 rounded-lg"
							onClick={increase}
						>
							+
						</button>
						<button
							className="w-full cursor-pointer font-bold text-xl bg-c3/75 hover:bg-c3/50 rounded-lg"
							onClick={decrease}
						>
							-
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
