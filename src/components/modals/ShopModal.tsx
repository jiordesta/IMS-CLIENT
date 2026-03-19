import { useEffect, useState } from "react";
import { ModalAction, useModal } from "../hooks/UseModal";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import type { AppDispatch, RootState } from "../../configs/redux/store";
import SelectInput from "../inputs/SelectInput";
import { fetchallUsers } from "../../configs/redux/reducers/user";
import { createShop } from "../../configs/redux/reducers/shop";
import TextInput from "../inputs/TextInput";

type ShopModalProps = {
	action: ModalAction;
	payload?: any;
};

export default function ShopModal({ action, payload }: ShopModalProps) {
	const { closeModal } = useModal();

	const shopForm = {
		name: "",
		userId: undefined,
	};

	const [form, setForm] = useState(shopForm);

	const { accessToken } = useSelector(
		(state: RootState) => state.authentication,
	);
	const dispatch = useDispatch<AppDispatch>();

	const [isLoading, setLoading] = useState(false);

	const { users } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		if (!accessToken) return;
		dispatch(fetchallUsers({ token: accessToken }));
	}, [action, payload]);

	useEffect(() => {
		if (!payload) return;
		if (ModalAction.UPDATE === action) {
			setForm({
				name: payload.shopDetails.name,
				userId: payload.shopDetails.userId,
			});
		}
	}, [action, payload]);

	const handleCreateShop = () => {
		if (!accessToken) return;
		setLoading(true);
		dispatch(
			createShop({
				payload: form,
				token: accessToken,
			}),
		).then((res: any) => {
			if (res.error) {
				toast.error(res.error.message);
			} else {
				toast.success("Shop Created Successfully");
			}
			closeModal();
			setLoading(false);
		});
	};

	return (
		<div className="w-full h-full relative flex flex-col justify-center items-center gap-2 p-4">
			<div className="w-full md:w-1/2 lg:w-1/4 bg-c2 p-4 text-c4 rounded-2xl relative">
				<div className="w-full space-y-8">
					<h1 className="bg-c1 p-8 text-center font-bold rounded-lg">
						{action + " SHOP"}
					</h1>
					<div className="flex flex-col gap-6">
						<SelectInput
							options={users}
							placeholder="Assign Shop to User"
							value={form}
							setter={setForm}
							dkey={"id"}
							fkey={"userId"}
							labelKey="userDetails.fname"
						/>
						<TextInput
							label="name"
							placeholder="Shop Name"
							value={form}
							setter={setForm}
							dkey={"name"}
						/>
					</div>
					<div className="flex gap-2">
						<button
							className="bg-c3/75 hover:bg-c3/50 w-full p-2 rounded-lg cursor-pointer"
							onClick={handleCreateShop}
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
