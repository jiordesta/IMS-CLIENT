import { useEffect, useState } from "react";
import GlobalTable from "../tables/GlobalTable";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../configs/redux/store";
import { ModalAction, ModalType, useModal } from "../hooks/UseModal";
import { fetchAllDeliveries } from "../../configs/redux/reducers/delivery";

export default function Deliveries() {
	const [refresh, setRefresh] = useState(false);

	const headers = [
		{
			label: "Product",
			dkey: "productDetails.commonName",
			width: "200px",
		},
		{
			label: "Brand",
			dkey: "deliveryDetails.brand",
			width: "250px",
		},
		{
			label: "Quantity",
			dkey: "deliveryDetails.quantity",
			width: "100px",
		},
		{
			label: "Date",
			dkey: "deliveryDetails.deliveryDate",
			width: "200px",
			type: "date",
		},
		{
			label: "Time",
			dkey: "deliveryDetails.deliveryDate",
			width: "200px",
			type: "time",
		},
	];

	const dispatch = useDispatch<AppDispatch>();
	const { openModal } = useModal();

	const { accessToken } = useSelector(
		(state: RootState) => state.authentication,
	);

	const { deliveries, showLoading } = useSelector(
		(state: RootState) => state.delivery,
	);

	useEffect(() => {
		if (!accessToken) return;
		dispatch(fetchAllDeliveries({ token: accessToken }));
	}, [accessToken, refresh]);

	const handleTableRefresh = () => {
		setRefresh(!refresh);
	};

	const handleNewDelivery = () => {
		openModal(ModalType.DELIVERY, ModalAction.CREATE);
	};

	return (
		<div className="h-full">
			<GlobalTable
				data={deliveries}
				headers={headers}
				add={handleNewDelivery}
				refresh={handleTableRefresh}
				showLoading={showLoading}
			/>
		</div>
	);
}
