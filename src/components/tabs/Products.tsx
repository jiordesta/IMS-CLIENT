import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../configs/redux/store";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import {
	deleteProduct,
	fetchAllProducts,
} from "../../configs/redux/reducers/product";
import { ModalAction, ModalType, useModal } from "../hooks/UseModal";
import toast from "react-hot-toast";
import GlobalTable from "../GlobalTable";
import { HEADERTYPES } from "../../libs/enums";
// import { addToQueue } from "../../configs/redux/reducers/queue";

type ProductTabProps = {
	setShowLoading: Dispatch<SetStateAction<boolean>>;
};

export default function Products({ setShowLoading }: ProductTabProps) {
	const [refresh, setRefresh] = useState(false);
	const [selected, setSelected] = useState<number[]>([]);
	const [isSelectedAll, setIsSelectedAll] = useState(false);
	const dispatch = useDispatch<AppDispatch>();
	const { openModal } = useModal();
	const { accessToken } = useSelector((state: RootState) => state.auth);
	const { products } = useSelector((state: RootState) => state.product);

	const handleSelect = (productId: number) => {
		if (selected.includes(productId)) {
			setSelected(selected.filter((i) => i !== productId));
		} else {
			setSelected([...selected, productId]);
		}
	};

	const headers = [
		{
			label: "",
			dkey: "",
			type: HEADERTYPES.CHECKBOX,
			itemRenderer: (productId: number) => (
				<input
					type="checkbox"
					className="rounded-full cursor-pointer"
					checked={selected.includes(productId)}
					onChange={() => handleSelect(productId)}
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
			label: "common name",
			dkey: "productDetails.commonName",
			col: 4,
		},
		{
			label: "original name",
			dkey: "productDetails.originalName",
			col: 4,
		},
	];

	useEffect(() => {
		if (!accessToken) return;
		setShowLoading(true);
		dispatch(fetchAllProducts({ token: accessToken })).then(() => {
			setShowLoading(false);
		});
	}, [accessToken, refresh]);

	useEffect(() => {
		if (isSelectedAll) {
			setSelected(products.map((item) => item.id));
		} else {
			setSelected([]);
		}
	}, [isSelectedAll, refresh]);

	const handleCreateNewProduct = () => {
		openModal(ModalType.PRODUCT, ModalAction.CREATE);
	};

	const handleDeleteProduct = () => {
		if (!accessToken) return;

		const productIds = selected.join(",");

		const callBack = async () => {
			dispatch(
				deleteProduct({
					token: accessToken,
					payload: { productIds },
				}),
			).then((res: any) => {
				if (res.error) {
					toast.error(res.error.message);
				} else {
					toast.success("Deleted Successfully");
				}
			});
		};

		openModal(ModalType.CONFIRMATION, ModalAction.DELETE, {
			callBack: callBack,
		});
	};

	const handleUpdateProduct = () => {
		if (selected.length != 1) {
			toast.error("Please select only one product");
		} else {
			openModal(
				ModalType.PRODUCT,
				ModalAction.UPDATE,
				products.find((item) => item.id === selected[0]),
			);
		}
	};

	const handleTableRefresh = () => {
		setRefresh(!refresh);
	};

	return (
		<div className="h-full w-full">
			<GlobalTable
				data={products}
				headers={headers}
				refresh={handleTableRefresh}
				add={handleCreateNewProduct}
				del={handleDeleteProduct}
				edit={handleUpdateProduct}
			/>
		</div>
	);
}
