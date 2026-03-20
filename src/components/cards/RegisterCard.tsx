import { useState } from "react";
import type { UserRegistrationData } from "../../libs/types";
import TextInput from "../inputs/TextInput";

type RegisterCardProps = {
	handleNavigate: (path: string) => void;
	handleRegister: (registrationForm: UserRegistrationData) => void;
	isLoading: boolean;
};

export default function RegisterCard({
	handleNavigate,
	handleRegister,
	isLoading,
}: RegisterCardProps) {
	const registrationForm: UserRegistrationData = {
		username: "",
		password: "",
		nname: "",
		fname: "",
		lname: "",
	};

	const [form, setForm] = useState(registrationForm);

	return (
		<div className="bg-c1 p-4 md:pb-5 lg:p-6 rounded-2xl w-full md:w-[50%] lg:w-[20%] text-c4 drop-shadow-2xl">
			<div className="mb-8 bg-c2/50 rounded-lg p-2 md:p-3 lg:p-4">
				<h1 className="font-bold w-full text-center text-lg md:text-xl lg:text-2xl lg:tracking-widest">
					REGISTRATION
				</h1>
			</div>
			<div className="flex flex-col gap-6 pb-4">
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
				<TextInput
					label="firstname"
					placeholder="Enter firstname"
					type="text"
					value={form}
					setter={setForm}
					dkey={"fname"}
				/>
				<TextInput
					label="lastname"
					placeholder="Enter lastname"
					type="text"
					value={form}
					setter={setForm}
					dkey={"lname"}
				/>
				<TextInput
					label="nickname"
					placeholder="Enter nickname(optional)"
					type="text"
					value={form}
					setter={setForm}
					dkey={"nname"}
				/>
			</div>
			<div className="pt-2">
				<button
					className="bg-c3/75 w-full p-2 rounded-lg drop-shadow-2xl tracking-widest"
					onClick={() => handleRegister(form)}
					disabled={isLoading}
				>
					REGISTER
				</button>
			</div>
			<div className="w-full p-4 mt-4 flex justify-center items-center">
				<button
					className="underline w-full text-center text-[12px]"
					disabled={isLoading}
					onClick={() => handleNavigate("login")}
				>
					already have an account
				</button>
			</div>
		</div>
	);
}
