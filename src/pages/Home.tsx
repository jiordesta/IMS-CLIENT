import { useParams } from "react-router-dom";
import GlobalLayout from "../components/GlobalLayout";
import { TABS } from "../libs/enums";
import Products from "../components/tabs/Products";
import { useState } from "react";
import Deliveries from "../components/tabs/Deliveries";
import Inventory from "../components/tabs/Inventory";
import Orders from "../components/tabs/Orders";
import Shops from "../components/tabs/Shops";
import Transactions from "../components/tabs/Transactions";
import Reports from "../components/tabs/Reports";

export default function Home() {
	const { tab } = useParams();

	const [showLoading, setShowLoading] = useState(false);

	return (
		<GlobalLayout
			isAuthenticationRequired={true}
			showNavigation={true}
			showLoader={showLoading}
		>
			{TABS.PRODUCTS === tab && (
				<Products setShowLoading={setShowLoading} />
			)}
			{TABS.DELIVERIES === tab && (
				<Deliveries setShowLoading={setShowLoading} />
			)}
			{TABS.INVENTORY === tab && (
				<Inventory setShowLoading={setShowLoading} />
			)}
			{TABS.ORDERS === tab && (
				<Orders setShowLoading={setShowLoading} />
			)}
			{TABS.SHOPS === tab && (
				<Shops setShowLoading={setShowLoading} />
			)}
			{TABS.TRANSACTIONS === tab && (
				<Transactions setShowLoading={setShowLoading} />
			)}
			{TABS.REPORTS === tab && (
				<Reports setShowLoading={setShowLoading} />
			)}
		</GlobalLayout>
	);
}
