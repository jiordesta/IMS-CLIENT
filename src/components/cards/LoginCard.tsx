import type { UserLoginData } from "../../libs/types";
import { useState } from "react";
import TextInput from "../inputs/TextInput";

type LoginCardProps = {
	handleNavigate: (path: string) => void;
	handleLogin: (loginForm: UserLoginData) => void;
	isLoading: boolean;
};

export default function LoginCard({
	handleNavigate,
	handleLogin,
	isLoading,
}: LoginCardProps) {
	const loginForm: UserLoginData = {
		username: "",
		password: "",
	};

	const [form, setForm] = useState(loginForm);

	return (
		<div className="bg-c1 p-6 rounded-2xl w-[20%] text-c4 drop-shadow-2xl">
			<div className="mb-8 bg-c2/50 rounded-lg p-4">
				<h1 className="font-bold w-full text-center text-2xl tracking-widest">
					LOGIN
				</h1>
			</div>
			<div className="flex flex-col gap-6">
				<TextInput
					label="username"
					placeholder="Enter username"
					value={form}
					setter={setForm}
					dkey={"username"}
				/>
				<TextInput
					label="password"
					placeholder="Enter password"
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
			</div>

			<div className="w-full p-4 mt-4 flex justify-center items-center">
				<button
					className="underline w-full text-center text-[12px] cursor-pointer"
					disabled={isLoading}
					onClick={() => handleNavigate("register")}
				>
					I don't have an account
				</button>
			</div>
		</div>
	);
}
