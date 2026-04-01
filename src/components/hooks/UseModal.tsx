import { createContext, useContext } from "react";

export const ModalAction = {
	CREATE: "CREATE",
	UPDATE: "UPDATE",
	DELETE: "DELETE",
	CONFIRM: "CONFIRM",
	LOGOUT: "LOGOUT",
	ASSIGN: "ASSIGN",
	DISPLAY: "DISPLAY",
} as const;

export type ModalAction = (typeof ModalAction)[keyof typeof ModalAction];

export const ModalType = {
	PRODUCT: 1,
	INVENTORY: 2,
	CONFIRMATION: 3,
	SHOP: 4,
	DELIVERY: 5,
	USER: 6,
	ORDER: 7,
	ORDER_ITEMS: 8,
	TRANSACTION: 9,
	TRANSACTION_ITEMS: 10,
	ORDER_ITEM_UNITS: 11,
	DISPLAY: 12,
} as const;

export type ModalType = (typeof ModalType)[keyof typeof ModalType];

export type ModalState = {
	type: ModalType;
	action: ModalAction;
	payload?: any;
};

type ModalContextType = {
	openModal: (type: ModalType, action: ModalAction, payload?: any) => void;
	closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error("useModal must be used inside GlobalLayout");
	}
	return context;
};
