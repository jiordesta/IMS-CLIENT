import { useParams } from "react-router-dom";
import GlobalLayout from "../components/GlobalLayout";
import Navigation from "../components/Navigation";
import { TABS } from "../libs/enums";
import Products from "../components/tabs/Products";
import Inventory from "../components/tabs/Inventory";
import Shops from "../components/tabs/Shops";
import Deliveries from "../components/tabs/Deliveries";
import Profile from "../components/tabs/Profile";
import Orders from "../components/tabs/Orders";
import Users from "../components/tabs/Users";
import ManageShop from "../components/tabs/ManageShop";
import Transactions from "../components/tabs/Transactions";
import { isMobile } from "react-device-detect";

export default function Home() {
	const { tab } = useParams();

	return (
		<GlobalLayout isAuthenticationRequired={true}>
			<div className="h-full gap2 flex w-full relative">
				<div
					className={`${isMobile ? "min-w-12" : "min-w-50"}`}
				>
					<Navigation />
				</div>
				<div className="overflow-auto w-full">
					<div className="min-w-200 md:min-w-full h-full">
						{TABS.PRODUCTS === tab && <Products />}
						{TABS.INVENTORY === tab && <Inventory />}
						{TABS.SHOPS === tab && <Shops />}
						{TABS.DELIVERIES === tab && <Deliveries />}
						{TABS.MYACCOUNT === tab && <Profile />}
						{TABS.ORDERS === tab && <Orders />}
						{TABS.USERS === tab && <Users />}
						{TABS.MYSHOP === tab && <ManageShop />}
						{TABS.TRANSACTIONS === tab && (
							<Transactions />
						)}
					</div>
				</div>
			</div>
		</GlobalLayout>
	);
}
