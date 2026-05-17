import { useState } from "react";
import type { UserLoginData } from "../../libs/types";
import TextInput from "../inputs/TextInput";

type LoginCardProps = {
  handleNavigate: (path: string) => void;
  handleLogin: (form: UserLoginData | any) => void;
  isLoading: boolean;
};

export const LoginCard = ({
  handleNavigate,
  handleLogin,
  isLoading,
}: LoginCardProps) => {
  const [form, setForm] = useState<UserLoginData>();
  return (
    <div className="w-full">
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
          className="bg-c3/50 hover:bg-c3/75 cursor-pointer transition-all ease-in-out duration-300 w-full p-1 rounded-lg drop-shadow-2xl tracking-widest"
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
