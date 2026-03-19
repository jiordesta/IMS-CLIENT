import { useState } from "react";
import { ModalAction, useModal } from "../hooks/UseModal";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import type { AppDispatch, RootState } from "../../configs/redux/store";
import { assignRole } from "../../configs/redux/reducers/user";
import SelectInput from "../inputs/SelectInput";
import { enumToArray } from "../../libs/utils";
import { Roles } from "../../libs/enums";

type ProductModalProps = {
	action: ModalAction;
	payload?: any;
};

export default function UserModal({ action, payload }: ProductModalProps) {
	const { closeModal } = useModal();

	const userForm = {
		roleId: undefined,
	};

	const [form, setForm] = useState(userForm);

	const { accessToken } = useSelector(
		(state: RootState) => state.authentication,
	);
	const dispatch = useDispatch<AppDispatch>();

	const [isLoading, setLoading] = useState(false);

	const handleAssignRole = () => {
		if (!accessToken) return;
		setLoading(true);
		dispatch(
			assignRole({
				payload: form,
				token: accessToken,
				id: payload.id,
			}),
		).then((res: any) => {
			if (res.error) {
				toast.error(res.error.message);
			} else {
				toast.success("Role assigned Successfully");
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
						{action + " ROLE"}
					</h1>
					<div className="flex flex-col gap-6">
						<h1 className="bg-c1 py-2 px-4 rounded-lg">
							First name:{" "}
							{payload.userDetails.fname}
						</h1>
						<h1 className="bg-c1 py-2 px-4 rounded-lg">
							Last name: {payload.userDetails.lname}
						</h1>
						<h1 className="bg-c1 py-2 px-4 rounded-lg">
							Username:{" "}
							{payload.userCredential.username}
						</h1>
						<SelectInput
							options={enumToArray(Roles)}
							placeholder="Select Role"
							value={form}
							setter={setForm}
							dkey={"value"}
							fkey={"roleId"}
							labelKey="key"
						/>
					</div>
					<div className="flex gap-2">
						<button
							className="bg-c3/75 hover:bg-c3/50 w-full p-2 rounded-lg cursor-pointer"
							onClick={handleAssignRole}
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
