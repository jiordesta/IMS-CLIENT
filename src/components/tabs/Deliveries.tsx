import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../configs/redux/store";
import { ModalAction, ModalType, useModal } from "../hooks/UseModal";
import { fetchAllDeliveries } from "../../configs/redux/reducers/delivery";
import GlobalTable from "../GlobalTable";
import { HEADERTYPES } from "../../libs/enums";
import toast from "react-hot-toast";

type DeliveryTabProps = {
	setShowLoading: Dispatch<SetStateAction<boolean>>;
};

export default function Deliveries({ setShowLoading }: DeliveryTabProps) {
	const [refresh, setRefresh] = useState(false);
	const [selected, setSelected] = useState<number[]>([]);
	const [isSelectedAll, setIsSelectedAll] = useState(false);
	const dispatch = useDispatch<AppDispatch>();
	const { openModal } = useModal();
	const { accessToken } = useSelector((state: RootState) => state.auth);
	const { deliveries } = useSelector((state: RootState) => state.delivery);

	const handleSelect = (productId: number) => {
		if (selected.includes(productId)) {
			setSelected(selected.filter((i) => i !== productId));
		} else {
			setSelected([...selected, productId]);
		}
	};

	useEffect(() => {
		if (isSelectedAll) {
			setSelected(deliveries.map((item) => item.id));
		} else {
			setSelected([]);
		}
	}, [isSelectedAll, refresh]);

	const headers = [
		{
			label: "",
			dkey: "",
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
			label: "Product",
			dkey: "productDetails.commonName",
			col: 4,
		},
		{
			label: "Brand",
			dkey: "deliveryDetails.brand",
			col: 2,
		},
		{
			label: "Quantity",
			dkey: "deliveryDetails.quantity",
			col: 2,
		},
		{
			label: "Date",
			dkey: "deliveryDetails.deliveryDate",
			col: 3,
			type: "date",
		},
		{
			label: "Time",
			dkey: "deliveryDetails.deliveryDate",
			col: 3,
			type: "time",
		},
	];

	useEffect(() => {
		if (!accessToken) return;
		setShowLoading(true);
		dispatch(fetchAllDeliveries({ token: accessToken })).then(() =>
			setShowLoading(false),
		);
	}, [accessToken, refresh]);

	const handleTableRefresh = () => {
		setRefresh(!refresh);
	};

	const handleNewDelivery = () => {
		openModal(ModalType.DELIVERY, ModalAction.CREATE);
	};

	const handleEditDelivery = () => {
		if (selected.length != 1) {
			toast.error("Please select only one delivery");
		} else {
			openModal(
				ModalType.DELIVERY,
				ModalAction.UPDATE,
				deliveries.find((item) => item.id === selected[0]),
			);
		}
	};

	return (
		<div className="h-full">
			<GlobalTable
				data={deliveries}
				headers={headers}
				add={handleNewDelivery}
				refresh={handleTableRefresh}
				edit={handleEditDelivery}
			/>
		</div>
	);
}
