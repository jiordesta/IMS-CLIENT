export type UserRegistrationData = {
	username: string;
	password: string;
	fname: string;
	lname: string;
};

export type UserLoginData = {
	username: string;
	password: string;
};

export type UserRoleData = {
	id: number;
	roleId: number;
	userId: number;
	role: RoleData;
};

export type RoleData = {
	roleDetails: RoleDetailsData;
};

export type RoleDetailsData = {
	id: number;
	roleId: number;
	name: string;
};

export type UserCredentialData = {
	username: string;
	password: string;
	userId: number;
	id: number;
};

export type UserDetailsData = {
	id: number;
	fname: string;
	lname: string;
	nname: string;
	userId: number;
};

export type UserProfileData = {
	id: number;
	createdAt: Date;
	isDeleted: boolean;
	userDetails: UserDetailsData;
	userCredential: UserCredentialData;
	userRole: UserRoleData;
};

export type ProductData = {
	id: number;
	createdAt: Date;
	isDeleted: boolean;
	productDetails: ProductDetailsData;
	priceList: PriceListData;
};

export type ProductDetailsData = {
	id: number;
	productId: number;
	commonName: string;
	originalName: string;
};

export type PriceListData = {
	id: number;
	productId: number;
	price: PriceData;
};

export type PriceData = {
	id: number;
	priceListId: number;
	price: number;
	createdAt: Date;
	isDeleted: boolean;
};

export type DeliveryData = {
	id: number;
	createdAt: Date;
	isDeleted: boolean;
	deliveryDetails: DeliveryDetailsData;
	productDetails: ProductDetailsData;
};

export type DeliveryDetailsData = {
	id: number;
	deliveryId: number;
	productId: number;
	quantity: number;
	deliveryDate: Date;
	brand: string;
	product: ProductData;
};

export type InventoryData = {
	id: number;
	createdAt: Date;
	isDeleted: boolean;
	productDetails: ProductDetailsData;
	stocks: number;
};

export type TransactionData = {
	id: number;
	createdAt: Date;
	transactionDate: Date;
	isDeleted: boolean;
	status: number;
	shopDetails: ShopDetailsData;
	orderItems: TransactionItemData[];
	totalItems: number;
};

export type TransactionItemData = {
	productName: string;
	type: number;
	quantity: number;
};

export type ShopDetailsData = {
	id: number;
	shopId: number;
	name: string;
	userId: number;
};

export type OrderData = {
	id: number;
	createdAt: Date;
	isDeleted: boolean;
	transactionId: number;
	orderDetails: OrderDetailsData;
};

export type OrderDetailsData = {
	id: number;
	orderId: number;
	orderDate: Date;
	shopId: number;
	type: number;
	status: number;
};

export type OrderItemData = {
	id: number;
	createdAt: Date;
	isDeleted: boolean;
	orderId: number;
	productId: number;
	quantity: number;
};
