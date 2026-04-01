import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../configs/redux/store";
import GlobalTable from "../GlobalTable";
import { fetchAllReports } from "../../configs/redux/reducers/report";

type ReportsTabProps = {
	setShowLoading: Dispatch<SetStateAction<boolean>>;
};

export default function Reports({ setShowLoading }: ReportsTabProps) {
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

	const [filters, setFilters] = useState({
		date: new Date(new Date().setHours(0, 0, 0, 0)),
	});

	const dispatch = useDispatch<AppDispatch>();

	const { accessToken } = useSelector((state: RootState) => state.auth);

	const { reports } = useSelector((state: RootState) => state.report);

	useEffect(() => {
		if (!accessToken) return;
		setShowLoading(true);
		dispatch(
			fetchAllReports({ payload: filters, token: accessToken }),
		).then(() => setShowLoading(false));
	}, [accessToken, refresh, filters]);

	const handleTableRefresh = () => {
		setRefresh(!refresh);
	};

	return (
		<>Hello</>
		// <GlobalTable
		// 	data={reports}
		// 	headers={headers}
		// 	filters={filters}
		// 	setFilters={setFilters}
		// 	refresh={handleTableRefresh}
		// />
	);
}
