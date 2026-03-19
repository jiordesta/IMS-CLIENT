import { useEffect, useState } from "react";
import { updateFormField, upsertItem, type AnyForm } from "../../libs/utils";
import type { ProductData } from "../../libs/types";
import toast from "react-hot-toast";

interface FastOrderInputProps {
	product: ProductData;
	value: AnyForm;
	setter: any;
	activeInput: any;
	setActiveInput: React.Dispatch<React.SetStateAction<any>>;
}

export default function FastOrderInput({
	product,
	value,
	setter,
	activeInput,
	setActiveInput,
}: FastOrderInputProps) {
	const [isActive, setIsActive] = useState(false);

	const { productDetails, id } = product;

	const itemForm = {
		productId: id,
		quantity: 0,
	};

	const [form, setForm] = useState(itemForm);

	useEffect(() => {
		setForm(
			value?.items?.find((item: any) => item.productId === id) ||
				itemForm,
		);
	}, []);

	useEffect(() => {
		if (activeInput?.id !== id) setIsActive(false);
	}, [activeInput]);

	const onUpdate = (input: number) => {
		if (input < 0 && form.quantity <= 0) {
			toast.error("Invalid");
			return;
		}

		const newQuantity = input === 0 ? 0 : form.quantity + input;

		updateFormField("quantity", newQuantity, setForm);
	};

	useEffect(() => {
		updateFormField(
			"items",
			upsertItem(value.items, form, "productId"),
			setter,
		);
	}, [form]);

	const FastOrderNumberInput = () => {
		const buttonStyle =
			"bg-c3/50 rounded-lg w-14 cursor-pointer hover:bg-c3/75 transition-all duration-300";

		return (
			<div className="flex gap-2">
				<div className="flex flex-row gap-2 justify-end w-full">
					<button
						className={buttonStyle}
						onClick={() => onUpdate(0)}
					>
						clear
					</button>
					<button
						className={buttonStyle}
						onClick={() => onUpdate(-1)}
					>
						-1
					</button>
					<button
						className={buttonStyle}
						onClick={() => onUpdate(1)}
					>
						+1
					</button>
					<button
						className={buttonStyle}
						onClick={() => onUpdate(5)}
					>
						+5
					</button>
					<button
						className={buttonStyle}
						onClick={() => onUpdate(10)}
					>
						+10
					</button>
				</div>
			</div>
		);
	};

	return (
		<div className="bg-c1/75 rounded-lg text-c4 flex flex-col whitespace-nowrap transition-all duration-300 ease-in-out">
			<div
				className="flex justify-between w-full px-4 p-2 cursor-pointer rounded-lg bg-c1"
				onClick={() => {
					setIsActive(!isActive);
					setActiveInput(product);
				}}
			>
				<div className="flex gap-2 w-full">
					<h1 className="w-[30%] font-bold uppercase">
						{productDetails.commonName}
					</h1>
				</div>
				<div className="">
					{form.quantity > 0 && (
						<h1>{form.quantity} box</h1>
					)}
				</div>
			</div>
			<div
				className={`overflow-hidden transition-all duration-250 ease-in-out ${
					isActive ? "max-h-40" : "max-h-0"
				}`}
			>
				<div className="px-4 p-2">
					<FastOrderNumberInput />
				</div>
			</div>
		</div>
	);
}
