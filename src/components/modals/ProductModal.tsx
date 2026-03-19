import { useEffect, useState } from "react";
import { ModalAction, useModal } from "../hooks/UseModal";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import type { AppDispatch, RootState } from "../../configs/redux/store";
import {
	createProduct,
	updateProduct,
} from "../../configs/redux/reducers/product";
import TextInput from "../inputs/TextInput";
import NumberInput from "../inputs/NumberInput";

type ProductModalProps = {
	action: ModalAction;
	payload?: any;
};

export default function ProductModal({ action, payload }: ProductModalProps) {
	const { closeModal } = useModal();

	const productForm = {
		originalName: "",
		commonName: "",
		price: 0,
	};

	const [form, setForm] = useState(productForm);

	const { accessToken } = useSelector(
		(state: RootState) => state.authentication,
	);
	const dispatch = useDispatch<AppDispatch>();

	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		if (!payload) return;
		if (ModalAction.UPDATE === action) {
			setForm({
				originalName: payload.productDetails.originalName,
				commonName: payload.productDetails.commonName,
				price: payload.priceList.price.price,
			});
		}
	}, [action, payload]);

	const handleProductActions = () => {
		if (ModalAction.CREATE === action) {
			handleCreateProduct();
		} else if (ModalAction.UPDATE === action) {
			handleUpdateProduct();
		}
	};

	const handleCreateProduct = () => {
		if (!accessToken) return;
		setLoading(true);
		dispatch(createProduct({ payload: form, token: accessToken })).then(
			(res: any) => {
				if (res.error) {
					toast.error(res.error.message);
				} else {
					toast.success("Product Created");
				}
				closeModal();
				setLoading(false);
			},
		);
	};

	const handleUpdateProduct = () => {
		if (!accessToken) return;
		dispatch(
			updateProduct({
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
		});
	};

	return (
		<div className="w-full h-full relative flex flex-col justify-center items-center gap-2 p-4">
			<div className="w-full md:w-1/2 lg:w-1/4 bg-c2 p-4 text-c4 rounded-2xl relative">
				<div className="w-full space-y-8">
					<h1 className="bg-c1 p-8 text-center font-bold rounded-lg">
						{action + " PRODUCT"}
					</h1>
					<div className="flex flex-col gap-6">
						<TextInput
							label="common name"
							placeholder="Enter Common Name"
							value={form}
							setter={setForm}
							dkey={"commonName"}
						/>
						<TextInput
							label="original name"
							placeholder="Enter Original Name"
							value={form}
							setter={setForm}
							dkey={"originalName"}
						/>
						<NumberInput
							label="price"
							placeholder="Enter Price"
							value={form}
							setter={setForm}
							dkey={"price"}
						/>
					</div>
					<div className="flex gap-2">
						<button
							className="bg-c3/75 hover:bg-c3/50 w-full p-2 rounded-lg cursor-pointer"
							onClick={handleProductActions}
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
					<div className="w-full h-full bg-black/50 rounded-xl inset-0 absolute flex justify-center items-center">
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
