import { useDispatch, useSelector } from "react-redux";
import GlobalTable from "../tables/GlobalTable";
import type { AppDispatch, RootState } from "../../configs/redux/store";
import { useEffect, useState } from "react";
import {
	deleteProduct,
	fetchAllProducts,
} from "../../configs/redux/reducers/product";
import { ModalAction, ModalType, useModal } from "../hooks/UseModal";
import toast from "react-hot-toast";
import type { ProductData } from "../../libs/types";

export default function Products() {
	const [refresh, setRefresh] = useState(false);

	const headers = [
		{
			label: "common name",
			dkey: "productDetails.commonName",
			width: "150px",
		},
		{
			label: "original name",
			dkey: "productDetails.originalName",
			width: "250px",
		},
		{
			label: "price",
			dkey: "priceList.price.price",
			width: "100px",
		},
	];

	const dispatch = useDispatch<AppDispatch>();
	const { openModal } = useModal();

	const { accessToken } = useSelector(
		(state: RootState) => state.authentication,
	);

	const { products, showLoading } = useSelector(
		(state: RootState) => state.product,
	);

	useEffect(() => {
		if (!accessToken) return;
		dispatch(fetchAllProducts({ token: accessToken }));
	}, [accessToken, refresh]);

	const handleCreateNewProduct = () => {
		openModal(ModalType.PRODUCT, ModalAction.CREATE);
	};

	const handleDeleteProduct = (productId: number) => {
		if (!accessToken) return;

		const callBack = async () => {
			dispatch(
				deleteProduct({ token: accessToken, id: productId }),
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

	const handleUpdateProduct = (product: ProductData) => {
		openModal(ModalType.PRODUCT, ModalAction.UPDATE, product);
	};

	const handleTableRefresh = () => {
		setRefresh(!refresh);
	};

	return (
		<div className="h-full">
			<GlobalTable
				data={products}
				headers={headers}
				del={handleDeleteProduct}
				add={handleCreateNewProduct}
				refresh={handleTableRefresh}
				edit={handleUpdateProduct}
				showLoading={showLoading}
			/>
		</div>
	);
}
