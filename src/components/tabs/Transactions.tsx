import { useEffect, useState } from "react";
import GlobalTable from "../tables/GlobalTable";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../configs/redux/store";
import {
	fetchAllTransactions,
	setTransactionAsDone,
} from "../../configs/redux/reducers/transaction";
import { OrderType, TransactionStatus } from "../../libs/enums";
import { ModalAction, ModalType, useModal } from "../hooks/UseModal";
import toast from "react-hot-toast";
import TableTypeValue from "../TableTypeValue";

export default function Transactions() {
	const [refresh, setRefresh] = useState(false);

	const headers = [
		{
			label: "shop name",
			dkey: "shopDetails.name",
			width: "200px",
		},
		{
			label: "Status",
			dkey: "status",
			width: "150px",
			renderType: TransactionStatus,
		},
		{
			label: "Date",
			dkey: "transactionDate",
			width: "250px",
			type: "date",
		},
		// {
		// 	label: "Total Price",
		// 	dkey: "",
		// 	width: "250px",
		// },
		{
			label: "Total Items",
			dkey: "totalItems",
			width: "150px",
		},
		{
			label: "",
			dkey: "orderItems",
			width: "150px",
		},
	];

	const dispatch = useDispatch<AppDispatch>();

	const { openModal } = useModal();

	const { accessToken } = useSelector(
		(state: RootState) => state.authentication,
	);

	const { transactions, showLoading } = useSelector(
		(state: RootState) => state.transaction,
	);

	const [filters, setFilters] = useState({
		date: new Date(new Date().setHours(0, 0, 0, 0)),
	});

	useEffect(() => {
		if (!accessToken) return;
		dispatch(
			fetchAllTransactions({
				token: accessToken,
				payload: filters,
			}),
		);
	}, [accessToken, refresh, filters]);

	const handleTableRefresh = () => {
		setRefresh(!refresh);
	};

	const handleDone = (transactionId: number) => {
		if (!accessToken) return;
		dispatch(
			setTransactionAsDone({
				token: accessToken,
				id: transactionId,
			}),
		).then((res: any) => {
			if (res.error) {
				toast.error(res.error.message);
			} else {
				toast.success("Transaction is now COMPLETED");
			}
		});
	};

	const DisplayItemsButton = ({ items }: any) => {
		const displayHeaders = [
			{
				label: "Name",
				dkey: "productName",
				width: "60%",
			},
			{
				label: "Type",
				dkey: "type",
				width: "25%",
				type: OrderType,
			},
			{
				label: "QTY",
				dkey: "quantity",
				width: "15%",
			},
		];

		const handleShowList = () => {
			openModal(ModalType.ORDER_ITEMS, ModalAction.DISPLAY, {
				items,
				displayHeaders,
				title: "Order Items",
			});
		};

		return (
			<div
				className="flex justify-start z-50"
				onClick={handleShowList}
			>
				<button className="cursor-pointer">
					<img src="icons/showlist.svg" width={25} alt="" />
				</button>
			</div>
		);
	};

	return (
		<div className="h-full">
			<GlobalTable
				data={transactions}
				headers={headers}
				refresh={handleTableRefresh}
				showLoading={showLoading}
				renderTypeValue={(value, type) => (
					<TableTypeValue value={value} type={type} />
				)}
				filters={filters}
				setFilters={setFilters}
				done={handleDone}
				renderListButton={(items: any[]) => (
					<DisplayItemsButton items={items} />
				)}
			/>
		</div>
	);
}
