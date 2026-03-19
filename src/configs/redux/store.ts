import { configureStore } from "@reduxjs/toolkit";
import authentication from "./reducers/auth.ts";
import product from "./reducers/product.ts";
import inventory from "./reducers/inventory.ts";
import delivery from "./reducers/delivery.ts";
import user from "./reducers/user.ts";
import order from "./reducers/order.ts";
import shop from "./reducers/shop.ts";
import transaction from "./reducers/transaction.ts";
export const store = configureStore({
	reducer: {
		authentication: authentication,
		product: product,
		inventory: inventory,
		delivery: delivery,
		user: user,
		order: order,
		shop: shop,
		transaction: transaction,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
