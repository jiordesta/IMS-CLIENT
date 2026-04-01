import type { Middleware } from "@reduxjs/toolkit";
import { saveToStorage } from "../../libs/storage";

export const middleWare: Middleware = (store) => (next) => (action: any) => {
	const result = next(action);

	if (action.type.startsWith("config/")) {
		const state = store.getState();
		saveToStorage("config", state.config);
	}

	if (action.type.startsWith("auth/")) {
		const state = store.getState();
		saveToStorage("auth", state.auth);
	}

	if (
		action.type.startsWith("/auth/") &&
		action.type.endsWith("/fulfilled")
	) {
		const state = store.getState();
		saveToStorage("auth", state.auth);
	}

	if (
		action.type.startsWith("/product/") &&
		action.type.endsWith("/fulfilled")
	) {
		const state = store.getState();
		saveToStorage("product", state.product);
	}

	if (
		action.type.startsWith("/order/") &&
		action.type.endsWith("/fulfilled")
	) {
		const state = store.getState();
		saveToStorage("order", state.order);
	}

	if (
		action.type.startsWith("/inventory/") &&
		action.type.endsWith("/fulfilled")
	) {
		const state = store.getState();
		saveToStorage("inventory", state.inventory);
	}

	if (
		action.type.startsWith("/delivery/") &&
		action.type.endsWith("/fulfilled")
	) {
		const state = store.getState();
		saveToStorage("delivery", state.delivery);
	}

	if (
		action.type.startsWith("/user/") &&
		action.type.endsWith("/fulfilled")
	) {
		const state = store.getState();
		saveToStorage("user", state.user);
	}

	if (
		action.type.startsWith("/shop/") &&
		action.type.endsWith("/fulfilled")
	) {
		const state = store.getState();
		saveToStorage("shop", state.shop);
	}

	if (
		action.type.startsWith("/transaction/") &&
		action.type.endsWith("/fulfilled")
	) {
		const state = store.getState();
		saveToStorage("transaction", state.transaction);
	}
	return result;
};
