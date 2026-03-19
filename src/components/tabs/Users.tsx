import { useEffect, useState } from "react";
import GlobalTable from "../tables/GlobalTable";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../configs/redux/store";
import { deleteUser, fetchallUsers } from "../../configs/redux/reducers/user";
import { ModalAction, ModalType, useModal } from "../hooks/UseModal";
import toast from "react-hot-toast";
import type { UserProfileData } from "../../libs/types";

export default function Users() {
	const [refresh, setRefresh] = useState(false);

	const headers = [
		{
			label: "Username",
			dkey: "userCredential.username",
			width: "200px",
		},
		{
			label: "First Name",
			dkey: "userDetails.fname",
			width: "250px",
		},
		{
			label: "Last Name",
			dkey: "userDetails.lname",
			width: "250px",
		},
		{
			label: "Nickname",
			dkey: "userDetails.nname",
			width: "250px",
		},
		{
			label: "Role",
			dkey: "userRole.name",
			width: "250px",
		},
	];

	const dispatch = useDispatch<AppDispatch>();
	const { openModal } = useModal();

	const { accessToken } = useSelector(
		(state: RootState) => state.authentication,
	);

	const { users, showLoading } = useSelector(
		(state: RootState) => state.user,
	);

	useEffect(() => {
		if (!accessToken) return;
		dispatch(fetchallUsers({ token: accessToken }));
	}, [accessToken, refresh]);

	const handleTableRefresh = () => {
		setRefresh(!refresh);
	};

	const handleDeleteUser = (userId: number) => {
		if (!accessToken) return;

		const callBack = async () => {
			dispatch(deleteUser({ token: accessToken, id: userId })).then(
				(res: any) => {
					if (res.error) {
						toast.error(res.error.message);
					} else {
						toast.success("Deleted Successfully");
					}
				},
			);
		};

		openModal(ModalType.CONFIRMATION, ModalAction.DELETE, {
			callBack: callBack,
		});
	};

	const handleAssignRole = (userData: UserProfileData) => {
		openModal(ModalType.USER, ModalAction.ASSIGN, userData);
	};

	return (
		<div className="h-full">
			<GlobalTable
				data={users}
				headers={headers}
				del={handleDeleteUser}
				assign={handleAssignRole}
				refresh={handleTableRefresh}
				showLoading={showLoading}
			/>
		</div>
	);
}
