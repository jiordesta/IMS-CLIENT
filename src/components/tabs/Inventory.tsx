import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../configs/redux/store";
import { fetchAllItems } from "../../configs/redux/reducers/inventory";
import GlobalTable from "../GlobalTable";

type InventoryTabProps = {
	setShowLoading: Dispatch<SetStateAction<boolean>>;
};

export default function Inventory({ setShowLoading }: InventoryTabProps) {
	const [refresh, setRefresh] = useState(false);

	const headers = [
		{
			label: "Item",
			dkey: "productDetails.commonName",
			col: 4,
		},
		{
			label: "Stocks",
			dkey: "stocks",
			col: 4,
			endLabel: " Boxes",
		},
	];

	const dispatch = useDispatch<AppDispatch>();

	const { accessToken } = useSelector((state: RootState) => state.auth);

	const { items } = useSelector((state: RootState) => state.inventory);

	useEffect(() => {
		if (!accessToken) return;
		setShowLoading(true);
		dispatch(fetchAllItems({ token: accessToken })).then(() =>
			setShowLoading(false),
		);
	}, [accessToken, refresh]);

	const handleTableRefresh = () => {
		setRefresh(!refresh);
	};

	return (
		<GlobalTable
			data={items}
			headers={headers}
			refresh={handleTableRefresh}
		/>
	);
}
