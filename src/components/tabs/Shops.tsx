import { useEffect, useState } from "react";
import GlobalTable from "../tables/GlobalTable";
import { ModalAction, ModalType, useModal } from "../hooks/UseModal";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../configs/redux/store";
import { fetchAllShops } from "../../configs/redux/reducers/shop";

export default function Shops() {
	const [refresh, setRefresh] = useState(false);

	const headers = [
		{
			label: "shop",
			dkey: "shopDetails.name",
			width: "250px",
		},
		// {
		// 	label: "",
		// 	dkey: "userDetails.fname",
		// 	width: "250px",
		// },
		{
			label: "balance",
			dkey: "",
			width: "250px",
		},
	];

	const dispatch = useDispatch<AppDispatch>();
	const { openModal } = useModal();

	const { accessToken } = useSelector(
		(state: RootState) => state.authentication,
	);

	const { shops, showLoading } = useSelector(
		(state: RootState) => state.shop,
	);

	useEffect(() => {
		if (!accessToken) return;
		dispatch(fetchAllShops({ token: accessToken }));
	}, [accessToken, refresh]);

	const handleCreateShop = () => {
		openModal(ModalType.SHOP, ModalAction.CREATE);
	};

	const handleTableRefresh = () => {
		setRefresh(!refresh);
	};

	return (
		<div className="h-full">
			<GlobalTable
				data={shops}
				headers={headers}
				add={handleCreateShop}
				refresh={handleTableRefresh}
				showLoading={showLoading}
			/>
		</div>
	);
}
