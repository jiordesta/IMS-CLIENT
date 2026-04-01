import { useEffect, useState } from "react";
import { ModalAction, useModal } from "../hooks/UseModal";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import type { AppDispatch, RootState } from "../../configs/redux/store";
import { fetchAllProducts } from "../../configs/redux/reducers/product";
import SelectInput from "../inputs/SelectInput";
import { OrderStatus } from "../../libs/enums";
import { createOrder, updateOrder } from "../../configs/redux/reducers/order";
import { fetchAllShops } from "../../configs/redux/reducers/shop";
import FastOrderInput from "../inputs/FastOrderInput";
import { enumToArray } from "../../libs/utils";

type OrderModalProps = {
	action: ModalAction;
	payload?: any;
};

export default function OrderModal({ action, payload }: OrderModalProps) {
	const { closeModal } = useModal();

	const orderForm = {
		orderDate: new Date(),
		status: payload?.orderDetails?.status,
		type: payload?.orderDetails?.type,
		shopId: payload?.shopDetails?.shopId,
		items:
			payload?.orderItems.map((item: any) => ({
				id: item.id,
				productId: item.productId,
				quantity: item.quantity,
			})) || [],
	};

	const [form, setForm] = useState(orderForm);

	const { accessToken } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch<AppDispatch>();

	const [isLoading, setLoading] = useState(false);

	const { products } = useSelector((state: RootState) => state.product);
	const { shops } = useSelector((state: RootState) => state.shop);

	useEffect(() => {
		if (!accessToken) return;
		dispatch(fetchAllProducts({ token: accessToken }));
		dispatch(fetchAllShops({ token: accessToken }));
	}, [action, payload]);

	const handleModalAction = () => {
		if (action === ModalAction.UPDATE) {
			handleUpdateOrder(payload);
		} else if (action === ModalAction.CREATE) {
			handleCreateOrder();
		} else {
			toast.error("Invalid Modal Action");
		}
	};

	const handleUpdateOrder = (order: any) => {
		if (!accessToken) return;
		setLoading(true);
		dispatch(
			updateOrder({
				payload: form,
				token: accessToken,
				id: order.id,
			}),
		).then((res: any) => {
			if (res.error) {
				toast.error(res.error.message);
			} else {
				toast.success("Order Updated Successfully");
			}
			closeModal();
			setLoading(false);
		});
	};

	const handleCreateOrder = () => {
		if (!accessToken) return;
		setLoading(true);
		dispatch(
			createOrder({
				payload: form,
				token: accessToken,
			}),
		).then((res: any) => {
			if (res.error) {
				toast.error(res.error.message);
			} else {
				toast.success("Order Created Successfully");
			}
			closeModal();
			setLoading(false);
		});
	};

	const [activeInput, setActiveInput] = useState<any>();

	return (
		<div className="w-full h-full relative flex flex-col justify-center items-center gap-2 p-2">
			<div className="w-full md:w-1/2 lg:w-1/4 bg-c2 p-2 text-c4 rounded-lg relative">
				<div className="w-full space-y-8">
					<h1 className="bg-c1 p-8 text-center font-bold rounded-lg">
						{action + " ORDER"}
					</h1>
					<div className="flex flex-col gap-2">
						<div className="flex gap-2 w-full">
							<SelectInput
								options={shops}
								placeholder="Select Shop"
								value={form}
								setter={setForm}
								dkey={"id"}
								fkey={"shopId"}
								labelKey="shopDetails.name"
								disabled={
									action ===
									ModalAction.UPDATE
								}
							/>
							{action === ModalAction.UPDATE && (
								<SelectInput
									options={enumToArray(
										OrderStatus,
									)}
									placeholder="Status"
									value={form}
									setter={setForm}
									dkey={"value"}
									fkey={"status"}
									labelKey="key"
								/>
							)}
						</div>
						<div className="flex flex-col gap-2 h-100 overflow-auto">
							{products.map((product) => {
								return (
									<FastOrderInput
										key={product.id}
										value={form}
										setter={setForm}
										product={product}
										activeInput={
											activeInput
										}
										setActiveInput={
											setActiveInput
										}
									/>
								);
							})}
						</div>
					</div>
					<div className="flex gap-2">
						<button
							className="bg-c3/75 hover:bg-c3/50 w-full p-2 rounded-lg cursor-pointer"
							onClick={handleModalAction}
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
