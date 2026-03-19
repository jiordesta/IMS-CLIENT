import { useEffect, useState } from "react";
import GlobalTable from "../tables/GlobalTable";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../configs/redux/store";
import { fetchAllItems } from "../../configs/redux/reducers/inventory";

export default function Inventory() {
	const [refresh, setRefresh] = useState(false);

	const headers = [
		{
			label: "common name",
			dkey: "productDetails.commonName",
			width: "200px",
		},
		{
			label: "original name",
			dkey: "productDetails.originalName",
			width: "350px",
		},
		{
			label: "Stocks",
			dkey: "stocks",
			width: "150px",
		},
	];

	const dispatch = useDispatch<AppDispatch>();

	const { accessToken } = useSelector(
		(state: RootState) => state.authentication,
	);

	const { items, showLoading } = useSelector(
		(state: RootState) => state.inventory,
	);

	useEffect(() => {
		if (!accessToken) return;
		dispatch(fetchAllItems({ token: accessToken }));
	}, [accessToken, refresh]);

	const handleTableRefresh = () => {
		setRefresh(!refresh);
	};

	return (
		<GlobalTable
			data={items}
			headers={headers}
			refresh={handleTableRefresh}
			showLoading={showLoading}
		/>
	);
}
