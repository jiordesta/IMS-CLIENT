import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import GlobalLayout from "../components/GlobalLayout";
import { AUTHACTIONS } from "../libs/enums";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../configs/redux/store";
import { LoginCard } from "../components/cards/LoginCard";
import { RegisterCard } from "../components/cards/RegisterCard";
import { useState } from "react";
import GlobalLoader from "../components/GlobalLoader";
import { login, register } from "../configs/redux/reducers/auth";
import toast from "react-hot-toast";

export default function Authenticate() {
  const { action } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (form: any) => {
    setIsLoading(true);
    dispatch(login({ payload: form })).then((res: any) => {
      if (res.error) {
        toast.error(res.error.message);
      } else {
        toast.success("Logged In");
      }
      setIsLoading(false);
    });
  };

  const handleRegister = (form: any) => {
    setIsLoading(true);
    dispatch(register({ payload: form })).then((res: any) => {
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

  return (
    <GlobalLayout>
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex justify-center items-center p-4 w-full md:w-[50%] lg:w-[20%] relative">
          {(AUTHACTIONS.LOGIN === action || action === undefined) && (
            <LoginCard
              handleLogin={handleLogin}
              isLoading={isLoading}
              handleNavigate={handleNavigate}
            />
          )}
          {AUTHACTIONS.REGISTER === action && (
            <RegisterCard
              handleRegister={handleRegister}
              isLoading={isLoading}
              handleNavigate={handleNavigate}
            />
          )}
          {isLoading && <GlobalLoader showBg={false} />}
        </div>
      </div>
    </GlobalLayout>
  );
}
