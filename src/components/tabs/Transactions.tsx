import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../configs/redux/store";
import {
	fetchAllTransactions,
	setTransactionAsDone,
} from "../../configs/redux/reducers/transaction";
import GlobalTable from "../GlobalTable";
import { HEADERTYPES, TransactionStatus } from "../../libs/enums";
import { ModalAction, ModalType, useModal } from "../hooks/UseModal";
import GlobalValueRenderer from "../GlobalValueRenderer";
import toast from "react-hot-toast";
import { fetchAllShops } from "../../configs/redux/reducers/shop";

type TransactionTabProps = {
	setShowLoading: Dispatch<SetStateAction<boolean>>;
};

export default function Transactions({ setShowLoading }: TransactionTabProps) {
	const [refresh, setRefresh] = useState(false);
	const dispatch = useDispatch<AppDispatch>();
	const { accessToken } = useSelector((state: RootState) => state.auth);
	const { transactions } = useSelector(
		(state: RootState) => state.transaction,
	);
	const { openModal } = useModal();
	const [filters, setFilters] = useState({
		status: TransactionStatus.PENDING,
	});
	const [selected, setSelected] = useState<number[]>([]);
	const [isSelectedAll, setIsSelectedAll] = useState(false);
	const { shops } = useSelector((state: RootState) => state.shop);

	const handleSelect = (transactionId: number) => {
		const transaction = transactions.find(
			(item) => item.id === transactionId,
		);

		if (transaction?.status === TransactionStatus.COMPLETED) {
			toast.error("Transaction already completed");
			return;
		}

		if (!transaction) {
			setSelected(selected.filter((i) => i !== transactionId));
		} else {
			setSelected([...selected, transactionId]);
		}
	};

	useEffect(() => {
		if (isSelectedAll) {
			setSelected(
				transactions.reduce<number[]>((acc, item) => {
					if (item.status === TransactionStatus.PENDING)
						acc.push(item.id);
					return acc;
				}, []),
			);
		} else {
			setSelected([]);
		}
	}, [isSelectedAll, refresh]);

	const handleShowList = (transactionId: number) => {
		const displayHeaders = [
			{
				label: "Name",
				dkey: "productName",
				col: 18,
			},
			{
				label: "QTY",
				dkey: "quantity",
				col: 6,
			},
		];

		const targetTransaction = transactions.find(
			(item) => item.id === transactionId,
		);

		openModal(ModalType.DISPLAY, ModalAction.DISPLAY, {
			items: targetTransaction?.orderItems,
			displayHeaders: displayHeaders,
			title: "Transaction Details",
		});
	};

	const headers = [
		{
			label: "select",
			dkey: "select",
			type: HEADERTYPES.CHECKBOX,
			itemRenderer: (deliveryId: number) => (
				<input
					type="checkbox"
					className="rounded-full cursor-pointer"
					checked={selected.includes(deliveryId)}
					onChange={() => handleSelect(deliveryId)}
				/>
			),
			headerRenderer: () => (
				<input
					type="checkbox"
					className="rounded-full cursor-pointer"
					checked={isSelectedAll}
					onChange={() => setIsSelectedAll(!isSelectedAll)}
				/>
			),
			col: 1,
		},
		{
			label: "Status",
			dkey: "status",
			col: 2,
			typeValueRenderer: (value: number) => {
				return (
					<GlobalValueRenderer
						value={value}
						type={HEADERTYPES.ORDERSTATUS}
					/>
				);
			},
		},
		{
			label: "shop name",
			dkey: "shopDetails.name",
			col: 4,
		},
		{
			label: "Date",
			dkey: "transactionDate",
			col: 4,
			type: "date",
		},
		{
			label: "Total Items",
			dkey: "totalItems",
			col: 4,
		},
		{
			label: "Total Price",
			dkey: "",
			col: 4,
			endLabel: "0.00 PHP",
		},
		{
			label: "",
			dkey: "viewTransactionItems",
			col: 2,
			type: HEADERTYPES.SHOW,
			displayItemsRenderer: (transactionId: number) => (
				<button
					className="cursor-pointer"
					onClick={() => handleShowList(transactionId)}
				>
					<img
						src="/icons/showlist.svg"
						width={18}
						alt=""
					/>
				</button>
			),
		},
	];

	useEffect(() => {
		if (!accessToken) return;
		setShowLoading(true);
		dispatch(fetchAllShops({ token: accessToken }));
		dispatch(
			fetchAllTransactions({
				token: accessToken,
				payload: filters,
			}),
		).then(() => setShowLoading(false));
	}, [accessToken, refresh, filters]);

	const handleTableRefresh = () => {
		setRefresh(!refresh);
	};

	const handleSetTransactionAsDone = () => {
		const transactionIds = selected.join(",");

		if (!transactionIds) {
			toast.error("Please select at least one transaction");
			return;
		}

		const callBack = async () => {
			if (!accessToken) return;
			dispatch(
				setTransactionAsDone({
					token: accessToken,
					payload: { transactionIds },
				}),
			).then((res: any) => {
				if (res.error) {
					toast.error(res.error.message);
				} else {
					toast.success("Done Successfully");
				}
			});
		};

		openModal(ModalType.CONFIRMATION, ModalAction.CONFIRM, {
			title: "SET AS DONE?",
			callBack: callBack,
		});
	};

	return (
		<GlobalTable
			data={transactions}
			headers={headers}
			refresh={handleTableRefresh}
			filters={filters}
			setFilters={setFilters}
			done={handleSetTransactionAsDone}
			shops={shops}
		/>
	);
}
