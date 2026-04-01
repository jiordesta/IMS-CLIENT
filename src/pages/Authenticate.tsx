import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import GlobalLayout from "../components/GlobalLayout";
import { AUTHACTIONS } from "../libs/enums";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../configs/redux/store";
import { useState } from "react";
import type { UserLoginData, UserRegistrationData } from "../libs/types";
import { login, register } from "../configs/redux/reducers/auth";
import toast from "react-hot-toast";
import TextInput from "../components/inputs/TextInput";

export default function Authenticate() {
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
			handleNavigate("login");
		});
	};

	const handleNavigate = (path: string) => {
		const from = searchParams.get("from");

		navigate("/authenticate/" + path + "?redirect=true&from=" + from);
	};

	const LoginCard = () => {
		const loginForm: UserLoginData = {
			username: "",
			password: "",
		};

		const [form, setForm] = useState(loginForm);

		return (
			<div className="w-full md:w-[50%] lg:w-[20%]">
				<div className="rounded-lg">
					<h1 className="font-bold w-full text-start text-2xl tracking-widest">
						LOGIN
					</h1>
				</div>
				<div className="flex flex-col gap-2">
					<TextInput
						label="username"
						placeholder="Username"
						value={form}
						setter={setForm}
						dkey={"username"}
					/>
					<TextInput
						label="password"
						placeholder="Password"
						type="password"
						value={form}
						setter={setForm}
						dkey={"password"}
					/>
				</div>

				<div className="pt-6">
					<button
						className="bg-c3/50 hover:bg-c3/75 cursor-pointer transition-all ease-in-out duration-300 w-full p-2 rounded-lg drop-shadow-2xl tracking-widest"
						disabled={isLoading}
						onClick={() => handleLogin(form)}
					>
						LOGIN
					</button>

					<button
						className="underline w-full text-center text-[12px] cursor-pointer pt-4"
						disabled={isLoading}
						onClick={() => handleNavigate("register")}
					>
						I don't have an account
					</button>
				</div>
			</div>
		);
	};

	const RegisterCard = () => {
		const registrationForm: UserRegistrationData = {
			username: "",
			password: "",
			fname: "",
			lname: "",
		};

		const [form, setForm] = useState(registrationForm);

		return (
			<div className="w-full md:w-[50%] lg:w-[20%]">
				<div className="rounded-lg">
					<h1 className="font-bold w-full text-start text-2xl tracking-widest">
						REGISTER
					</h1>
				</div>
				<div className="flex flex-col gap-2">
					<TextInput
						label="username"
						placeholder="Username"
						value={form}
						setter={setForm}
						dkey={"username"}
					/>
					<TextInput
						label="password"
						placeholder="Password"
						type="password"
						value={form}
						setter={setForm}
						dkey={"password"}
					/>
					<TextInput
						label="firstname"
						placeholder="First name"
						type="text"
						value={form}
						setter={setForm}
						dkey={"fname"}
					/>
					<TextInput
						label="lastname"
						placeholder="Last name"
						type="text"
						value={form}
						setter={setForm}
						dkey={"lname"}
					/>
				</div>

				<div className="pt-6">
					<button
						className="bg-c3/75 w-full p-2 rounded-lg drop-shadow-2xl tracking-widest"
						onClick={() => handleRegister(form)}
						disabled={isLoading}
					>
						REGISTER
					</button>

					<button
						className="underline w-full text-center text-[12px] pt-4"
						disabled={isLoading}
						onClick={() => handleNavigate("login")}
					>
						already have an account
					</button>
				</div>
			</div>
		);
	};

	return (
		<GlobalLayout showLoader={isLoading}>
			<div className="flex justify-center items-center p-4 w-full h-full">
				{(AUTHACTIONS.LOGIN === action ||
					action === undefined) && <LoginCard />}
				{AUTHACTIONS.REGISTER === action && <RegisterCard />}
			</div>
		</GlobalLayout>
	);
}
