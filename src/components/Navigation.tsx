import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import type { AppDispatch } from "../configs/redux/store";
import { removeTokens, removeUserInfo } from "../configs/redux/reducers/auth";
import { ModalAction, ModalType, useModal } from "./hooks/UseModal";
import { isMobile } from "react-device-detect";

export default function Navigation() {
	type NavButtonType = {
		label: string;
		path: string;
		icon: string;
	};

	const navButtons: NavButtonType[] = [
		{
			label: "Inventory",
			path: "inventory",
			icon: "/icons/inventory.svg",
		},
		{
			label: "Products",
			path: "products",
			icon: "/icons/meat.svg",
		},
		{
			label: "Shops",
			path: "shops",
			icon: "/icons/shops.svg",
		},
		{
			label: "Deliveries",
			path: "deliveries",
			icon: "/icons/delivery.svg",
		},
		{
			label: "Profile",
			path: "profile",
			icon: "/icons/profile.svg",
		},
		{
			label: "Orders",
			path: "orders",
			icon: "/icons/order.svg",
		},
		{
			label: "Transaction",
			path: "transactions",
			icon: "/icons/transaction.svg",
		},
		{
			label: "Users",
			path: "users",
			icon: "/icons/users.svg",
		},
		{
			label: "Shop",
			path: "myshop",
			icon: "/icons/shops.svg",
		},
	];

	const NavButton = ({ label, path, icon }: NavButtonType) => {
		const [isActive, setIsActive] = useState(false);
		const [isHovered, setIsHovered] = useState(false);
		const navigate = useNavigate();

		const { tab } = useParams();

		useEffect(() => {
			if (path === tab) {
				setIsActive(true);
			} else {
				setIsActive(false);
			}
		}, [tab]);

		return (
			<button
				className={`cursor-pointer flex items-center p-2 transition-all ease-in-out duration-600 bg-c3/25 hover:bg-c3/75 ${(isHovered || isActive) && !isMobile ? "gap-2 glowBox bg-c3/85" : (isHovered || isActive) && isMobile ? "gap-0 bg-c3/85" : "gap-0"} rounded-lg`}
				onMouseEnter={() => {
					setIsHovered(true);
				}}
				onMouseLeave={() => {
					setIsHovered(false);
				}}
				onClick={() => navigate("/" + path)}
			>
				<span
					className={`${(isHovered || isActive) && !isMobile ? "" : "w-0 text-transparent"} font-bold over whitespace-nowrap overflow-hidden `}
				>
					{label}
				</span>
				<img src={icon} alt="" width={25} />
			</button>
		);
	};

	const LogoutButton = () => {
		const [isHovered, setIsHovered] = useState(false);
		const { openModal } = useModal();
		const dispatch = useDispatch<AppDispatch>();

		const handleLogout = () => {
			const callBack = async () => {
				dispatch(removeTokens());
				dispatch(removeUserInfo());
			};

			openModal(ModalType.CONFIRMATION, ModalAction.LOGOUT, {
				callBack: callBack,
			});
		};

		return (
			<button
				className={`cursor-pointer flex items-center p-2 rounded-lg bg-c3/50 hover:bg-c3/85 transition-all ease-in-out duration-600 ${isHovered && !isMobile ? "gap-2 glowBox bg-c3/85" : isHovered && isMobile ? "gap-0 glowBox bg-c3/85" : "gap-0"}`}
				onMouseEnter={() => {
					setIsHovered(true);
				}}
				onMouseLeave={() => {
					setIsHovered(false);
				}}
				onClick={handleLogout}
			>
				<span
					className={`${isHovered && !isMobile ? "" : "w-0 text-transparent"} font-bold over whitespace-nowrap overflow-hidden `}
				>
					Logout
				</span>
				<img src="/icons/logout.svg" alt="" width={25} />
			</button>
		);
	};

	return (
		<div
			className={`flex flex-col gap-2 max-w-full overflow-hidden justify-between  ${isMobile ? "p-1 md:p-2" : "p-2 md:p-4 rounded-2xl"} h-full`}
		>
			<div className="flex flex-col gap-2 items-end">
				{navButtons.map((button: NavButtonType) => {
					return (
						<NavButton key={button.label} {...button} />
					);
				})}
			</div>
			<div className="flex flex-col items-end">
				<LogoutButton />
			</div>
		</div>
	);
}
