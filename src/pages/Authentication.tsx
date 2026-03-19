import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import GlobalLayout from "../components/GlobalLayout";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import type { AppDispatch } from "../configs/redux/store";
import { login, register } from "../configs/redux/reducers/auth";
import { AUTHACTIONS } from "../libs/enums";
import LoginCard from "../components/cards/LoginCard";
import RegisterCard from "../components/cards/RegisterCard";
import type { UserLoginData, UserRegistrationData } from "../libs/types";
import { useState } from "react";

export default function Authentication() {
	const { action } = useParams();
	const dispatch = useDispatch<AppDispatch>();

	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const [isLoading, setIsLoading] = useState(false);

	const handleLogin = (data: UserLoginData) => {
		setIsLoading(true);
		dispatch(login({ payload: data })).then((res: any) => {
			if (res.error) {
				toast.error(res.error.message);
			} else {
				toast.success("Logged In");
			}
			setIsLoading(false);
		});
	};

	const handleRegister = (data: UserRegistrationData) => {
		setIsLoading(true);
		dispatch(register({ payload: data })).then((res: any) => {
			if (res.error) {
				toast.error(res.error.message);
			} else {
				toast.success("Account Registered");
			}
			setIsLoading(false);
		});
	};

	const handleNavigate = (path: string) => {
		const from = searchParams.get("from");

		navigate("/authentication/" + path + "?redirect=true&from=" + from);
	};

	return (
		<GlobalLayout>
			<div className="flex justify-center items-center w-full h-full">
				{(AUTHACTIONS.LOGIN === action ||
					action === undefined) && (
					<LoginCard
						handleNavigate={handleNavigate}
						handleLogin={handleLogin}
						isLoading={isLoading}
					/>
				)}
				{AUTHACTIONS.REGISTER === action && (
					<RegisterCard
						handleNavigate={handleNavigate}
						handleRegister={handleRegister}
						isLoading={isLoading}
					/>
				)}
			</div>
		</GlobalLayout>
	);
}
