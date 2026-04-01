import { useState } from "react";
import { updateFormField, type AnyForm } from "../../libs/utils";

interface TextInputProps {
	label: string;
	placeholder?: string;
	type?: string;
	value: AnyForm;
	setter: any;
	dkey: string;
	disabled?: boolean;
}

export default function TextInput({
	label,
	placeholder,
	type = "text",
	disabled = false,
	value,
	setter,
	dkey,
}: TextInputProps) {
	const [isFocus, setIsFocus] = useState(false);

	const [isVisible, setIsVisible] = useState(false);

	const onInputChange = (e: any) => {
		e.preventDefault();

		if (value[dkey].length < 1 && type === "password")
			setIsVisible(false);
		updateFormField(dkey, e.target.value, setter);
	};

	return (
		<div className="mt-4">
			<div
				className={`relative w-full border-b py-1 ${isFocus ? "border-c3/50" : "border-c4/50"}`}
			>
				<label
					className={`${isFocus || value[dkey] ? "-top-4 text-[12px]" : ""} absolute left-0 pointer-events-none uppercase`}
				>
					{`${isFocus || value[dkey] ? label : placeholder}`}
				</label>
				{type === "password" && value[dkey] && (
					<img
						src={
							"/icons/" +
							`eye${isVisible ? "open" : "close"}.svg`
						}
						alt=""
						width={30}
						className="absolute right-0 top-1/2 transform -translate-y-1/2"
						onClick={() => setIsVisible(!isVisible)}
					/>
				)}
				<input
					type={isVisible ? "text" : type}
					onChange={onInputChange}
					disabled={disabled}
					placeholder={`${isFocus ? placeholder : ""}`}
					value={value[dkey] ?? ""}
					onFocus={() => setIsFocus(true)}
					onBlur={() => setIsFocus(false)}
					className="border-none outline-none bg-transparent focus:ring-0 w-full"
				/>
			</div>
		</div>
	);
}
