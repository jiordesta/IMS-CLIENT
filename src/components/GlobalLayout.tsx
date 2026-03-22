import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../configs/redux/store";
import { authenticate, setTokens } from "../configs/redux/reducers/auth";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
	ModalContext,
	ModalType,
	type ModalAction,
	type ModalState,
} from "./hooks/UseModal";
import ProductModal from "./modals/ProductModal";
import ConfirmationModal from "./modals/ConfirmationModal";
import DeliveryModal from "./modals/DeliveryModal";
import UserModal from "./modals/UserModal";
import OrderModal from "./modals/OrderModal";
import ShopModal from "./modals/ShopModal";
import DisplayModal from "./modals/DisplayModal";
import { isMobile } from "react-device-detect";

type GlobalLayoutProps = {
	children: React.ReactNode;
	isAuthenticationRequired?: boolean;
	showNavigation?: boolean;
};

export default function GlobalLayout({
	children,
	isAuthenticationRequired,
}: GlobalLayoutProps) {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams] = useSearchParams();

	const { accessToken, refreshToken, isLoggingIn } = useSelector(
		(state: RootState) => state.authentication,
	);

	//This is to get the TOKENS locally save in the device
	useEffect(() => {
		//NOTE: BAD PRACTICE
		const refreshTK = localStorage.getItem("refreshToken");
		const accessTK = localStorage.getItem("accessToken");

		const isAuthPage = location.pathname.startsWith("/authentication");

		if (refreshTK && accessTK) {
			dispatch(
				setTokens({
					refreshToken: refreshTK,
					accessToken: accessTK,
				}),
			);

			if (isAuthPage) navigate("/dashboard");
		} else if (isAuthenticationRequired) {
			navigate(
				`/authentication/login?redirect=true&from=${location.pathname}`,
				{ replace: true },
			);
		}
	}, [isLoggingIn, accessToken, refreshToken]);

	useEffect(() => {
		const noTokenFound = !accessToken || !refreshToken;
		const from = searchParams.get("from");

		if (noTokenFound) return;
		dispatch(authenticate({ token: accessToken })).then((res: any) => {
			if (res.error) {
				toast.error(res.error.message);
			} else if (from) {
				navigate(from);
			}
		});
	}, [accessToken, refreshToken]);

	const [modal, setModal] = useState<ModalState | null>(null);
	const openModal = (
		type: ModalType,
		action: ModalAction,
		payload?: any,
	) => {
		setModal({ type, action, payload });
	};

	const closeModal = () => setModal(null);
	const showModal = modal ? true : false;

	return (
		<ModalContext.Provider value={{ openModal, closeModal }}>
			<main
				className={`h-screen ${isMobile ? "p-2 text-[12px]" : "p-2 md:p-4 lg:p-8 w-full text-[14px]"}`}
			>
				<div className="w-full h-full">{children}</div>
				{showModal && (
					<div className="fixed inset-0 bg-black/75 flex items-center justify-center">
						{modal?.type === ModalType.PRODUCT && (
							<ProductModal
								action={modal.action}
								payload={modal.payload}
							/>
						)}
						{modal?.type === ModalType.CONFIRMATION && (
							<ConfirmationModal
								action={modal.action}
								payload={modal.payload}
							/>
						)}
						{modal?.type === ModalType.DELIVERY && (
							<DeliveryModal
								action={modal.action}
								payload={modal.payload}
							/>
						)}
						{modal?.type === ModalType.USER && (
							<UserModal
								action={modal.action}
								payload={modal.payload}
							/>
						)}
						{modal?.type === ModalType.ORDER && (
							<OrderModal
								action={modal.action}
								payload={modal.payload}
							/>
						)}
						{modal?.type === ModalType.SHOP && (
							<ShopModal
								action={modal.action}
								payload={modal.payload}
							/>
						)}
						{modal?.type === ModalType.ORDER_ITEMS && (
							<DisplayModal
								action={modal.action}
								payload={modal.payload}
							/>
						)}
					</div>
				)}
			</main>
		</ModalContext.Provider>
	);
}
