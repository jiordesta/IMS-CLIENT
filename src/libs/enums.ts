export const AUTHACTIONS = {
	LOGIN: "login",
	REGISTER: "register",
} as const;

export const TABS = {
	INVENTORY: "inventory",
	MYACCOUNT: "profile",
	MYSHOP: "myshop",
	ORDERS: "orders",
	PRODUCTS: "products",
	SHOPS: "shops",
	TRANSACTIONS: "transactions",
	USERS: "users",
	DELIVERIES: "deliveries",
};

export const Roles = {
	SUPER_ADMIN: 1,
	ADMIN: 2,
	SHOP_OWNER: 3,
	CHECKER: 4,
	MANAGER: 5,
} as const;

export const OrderStatus = {
	PENDING: 1,
	COMPLETED: 2,
	CANCELLED: 3,
} as const;

export const OrderType = {
	LOADING: 1,
	PAHABOL: 2,
	ADDITIONAL: 3,
};

export const TransactionStatus = {
	PENDING: 1,
	COMPLETED: 2,
} as const;
