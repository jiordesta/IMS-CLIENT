import { useEffect, useState } from "react";
import { ModalAction, useModal } from "../hooks/UseModal";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import type { AppDispatch, RootState } from "../../configs/redux/store";
import NumberInput from "../inputs/NumberInput";
import {
	createDelivery,
	updateDelivery,
} from "../../configs/redux/reducers/delivery";
import DatePicker from "../inputs/DatePicker";
import SelectInput from "../inputs/SelectInput";
import { fetchAllProducts } from "../../configs/redux/reducers/product";
import TextInput from "../inputs/TextInput";

type DeliveryModalProps = {
	action: ModalAction;
	payload?: any;
};

export default function DeliveryModal({ action, payload }: DeliveryModalProps) {
	const { closeModal } = useModal();

	const deliverForm = {
		productId: undefined,
		quantity: undefined,
		brand: "",
		deliveryDate: new Date(),
	};

	const [form, setForm] = useState(deliverForm);

	const { accessToken } = useSelector((state: RootState) => state.auth);

	const { products } = useSelector((state: RootState) => state.product);

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (!accessToken) return;
		dispatch(fetchAllProducts({ token: accessToken }));
	}, [action, payload]);

	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		if (!payload) return;
		if (ModalAction.UPDATE === action) {
			setForm({
				productId: payload.deliveryDetails.product.id,
				quantity: payload.deliveryDetails.quantity,
				deliveryDate: new Date(
					payload.deliveryDetails.deliveryDate,
				),
				brand: payload.deliveryDetails.brand,
			});
		}
	}, [action, payload]);

	const handleDeliveryAction = () => {
		if (ModalAction.CREATE === action) {
			handleCreateDelivery();
		} else if (ModalAction.UPDATE === action) {
			handleUpdateDelivery();
		}
	};

	const handleUpdateDelivery = () => {
		if (!accessToken) return;
		setLoading(true);
		dispatch(
			updateDelivery({
				token: accessToken,
				id: payload.id,
				payload: form,
			}),
		).then((res: any) => {
			if (res.error) {
				toast.error(res.error.message);
			} else {
				toast.success("Updated Successfully");
			}

			closeModal();
			setLoading(false);
		});
	};

	const handleCreateDelivery = () => {
		if (!accessToken) return;
		setLoading(true);
		dispatch(
			createDelivery({ payload: form, token: accessToken }),
		).then((res: any) => {
			if (res.error) {
				toast.error(res.error.message);
			} else {
				toast.success("Delivery Created");
			}
			closeModal();
			setLoading(false);
		});
	};

	return (
		<div className="w-full h-full flex flex-col justify-center items-center gap-2 p-4">
			<div className="w-full md:w-1/2 lg:w-1/4 bg-c2 p-4 text-c4 rounded-lg relative">
				<div className="w-full space-y-4">
					<h1 className="bg-c1 p-8 text-center font-bold rounded-lg">
						{action + " DELIVERY"}
					</h1>
					<div className="flex flex-col gap-2">
						<DatePicker
							value={form}
							setter={setForm}
							dkey={"deliveryDate"}
						/>
						<SelectInput
							options={products}
							placeholder="Select Product"
							value={form}
							setter={setForm}
							dkey={"id"}
							fkey={"productId"}
							labelKey="productDetails.commonName"
						/>
						<TextInput
							label="Brand"
							placeholder="Enter Product Brand"
							value={form}
							setter={setForm}
							dkey={"brand"}
						/>
						<NumberInput
							label="Quantity"
							placeholder="Enter Quantity"
							value={form}
							setter={setForm}
							dkey={"quantity"}
						/>
					</div>
					<div className="flex gap-2">
						<button
							className="bg-c3/75 hover:bg-c3/50 w-full p-2 rounded-lg cursor-pointer"
							onClick={handleDeliveryAction}
							disabled={isLoading}
						>
							CONFIRM
						</button>
						<button
							className="bg-c3/75 hover:bg-c3/50 w-full p-2 rounded-lg cursor-pointer"
							onClick={closeModal}
							disabled={isLoading}
						>
							CANCEL
						</button>
					</div>
				</div>
				{isLoading && (
					<div className="w-full h-full bg-black/25 rounded-lg inset-0 absolute flex justify-center items-center">
						<img
							src="/icons/loading.svg"
							alt=""
							width={75}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
