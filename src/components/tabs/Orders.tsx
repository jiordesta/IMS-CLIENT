import { useEffect, useState } from "react";
import GlobalTable from "../tables/GlobalTable";
import { ModalAction, ModalType, useModal } from "../hooks/UseModal";
import { fetchOrdersByDate } from "../../configs/redux/reducers/order";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../configs/redux/store";
import { OrderStatus, OrderType } from "../../libs/enums";
import TableTypeValue from "../TableTypeValue";

export default function Orders() {
	const [refresh, setRefresh] = useState(false);

	const headers = [
		{
			label: "Status",
			dkey: "status",
			width: "150px",
			renderType: OrderStatus,
		},
		// {
		// 	label: "Transaction Status",
		// 	dkey: "",
		// 	width: "150px",
		// },
		{
			label: "Type",
			dkey: "type",
			width: "150px",
			renderType: OrderType,
		},
		{
			label: "Date",
			dkey: "orderDetails.orderDate",
			width: "300px",
			type: "date",
		},
		{
			label: "Time",
			dkey: "orderDetails.orderDate",
			width: "300px",
			type: "time",
		},
		{
			label: "Shop",
			dkey: "shopDetails.name",
			width: "300px",
		},
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

	const { accessToken } = useSelector(
		(state: RootState) => state.authentication,
	);

	const { orders, showLoading } = useSelector(
		(state: RootState) => state.order,
	);

	useEffect(() => {
		if (!accessToken) return;
		dispatch(
			fetchOrdersByDate({
				payload: {
					date: new Date(new Date().setHours(0, 0, 0, 0)),
				},
				token: accessToken,
			}),
		);
	}, [accessToken, refresh]);

	const { openModal } = useModal();

	const handleCreateOrder = () => {
		openModal(ModalType.ORDER, ModalAction.CREATE);
	};

	const handleTableRefresh = () => {
		setRefresh(!refresh);
	};

	const handleUpdateOrder = (order: any) => {
		openModal(ModalType.ORDER, ModalAction.UPDATE, order);
	};

	const DisplayItemsButton = ({ items }: any) => {
		const displayHeaders = [
			{
				label: "Name",
				dkey: "product.productDetails.commonName",
				width: "80%",
			},
			{
				label: "QTY",
				dkey: "quantity",
				width: "20%",
			},
			// {
			// 	label: "Price",
			// 	dkey: "",
			// 	width: "20%",
			// },
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
				data={orders}
				headers={headers}
				add={handleCreateOrder}
				refresh={handleTableRefresh}
				edit={handleUpdateOrder}
				showLoading={showLoading}
				renderTypeValue={(value, type) => (
					<TableTypeValue value={value} type={type} />
				)}
				renderListButton={(items: any[]) => (
					<DisplayItemsButton items={items} />
				)}
			/>
		</div>
	);
}
