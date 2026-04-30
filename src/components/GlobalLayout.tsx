import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../configs/redux/store";
import { authenticate, setTokens } from "../configs/redux/reducers/auth";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { isMobile } from "react-device-detect";
import {
  ModalContext,
  ModalType,
  type ModalAction,
  type ModalState,
} from "./hooks/UseModal";
import { Device, setDevice, Theme } from "../configs/redux/reducers/config";
import GlobalNavigation from "./GlobalNavigation";
import ConfirmationModal from "./modals/ConfirmationModal";
import ProductModal from "./modals/ProductModal";
import DeliveryModal from "./modals/DeliveryModal";
import OrderModal from "./modals/OrderModal";
import ShopModal from "./modals/ShopModal";
import DisplayModal from "./modals/DisplayModal";
import toast from "react-hot-toast";
import CreateReportModal from "./modals/CreateReportModal";

type GlobalLayoutProps = {
  children: React.ReactNode;
  isAuthenticationRequired?: boolean;
  showLoader?: boolean;
  showNavigation?: boolean;
};

export default function GlobalLayout({
  children,
  isAuthenticationRequired,
  showNavigation,
}: GlobalLayoutProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const { accessToken, refreshToken, isLoggingIn } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    dispatch(setDevice(isMobile));
  }, [isMobile]);

  //This is to get the TOKENS locally save in the device
  useEffect(() => {
    //NOTE: BAD PRACTICE
    const refreshTK = localStorage.getItem("refreshToken");
    const accessTK = localStorage.getItem("accessToken");

    if (refreshTK && accessTK) {
      dispatch(
        setTokens({
          refreshToken: refreshTK,
          accessToken: accessTK,
        }),
      );
    } else if (isAuthenticationRequired) {
      navigate(`/authenticate/login?redirect=true&from=${location.pathname}`, {
        replace: true,
      });
    }
  }, [isLoggingIn, accessToken, refreshToken]);

  useEffect(() => {
    const noTokenFound = !accessToken || !refreshToken;
    let from = searchParams.get("from");

    if (from === "/") from = "/inventory";

    if (noTokenFound) return;

    dispatch(authenticate({ token: accessToken })).then((res: any) => {
      if (res.error) {
        toast.error(res.error.message);
      } else if (from) {
        navigate(from);
      }
    });
  }, [accessToken, refreshToken]);

  const [modal, setModal] = useState<ModalState | null>(null);

  const openModal = (type: ModalType, action: ModalAction, payload?: any) => {
    setModal({ type, action, payload });
  };

  const closeModal = () => setModal(null);
  const showModal = modal ? true : false;

  const { theme, device } = useSelector((state: RootState) => state.config);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      <main
        className={`
					h-screen
					w-full
					relative
					overflow-hidden
					${theme === Theme.DARK ? "bg-c1 text-c4" : "bg-c4 text-c1"} 
					${
            device === Device.MOBILE
              ? "p-2 text-[12px]"
              : "p-2 md:p-4 lg:p-4 w-full text-[14px]"
          }
					`}
      >
        <div className="w-full h-full flex gap-2">
          {showNavigation && (
            <div className={device === Device.MOBILE ? "min-w-13" : "min-w-40"}>
              <GlobalNavigation />
            </div>
          )}

          <div className="w-full h-full">{children}</div>
        </div>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            {modal?.type === ModalType.CONFIRMATION && (
              <ConfirmationModal
                action={modal.action}
                payload={modal.payload}
              />
            )}
            {modal?.type === ModalType.PRODUCT && (
              <ProductModal action={modal.action} payload={modal.payload} />
            )}
            {modal?.type === ModalType.DELIVERY && (
              <DeliveryModal action={modal.action} payload={modal.payload} />
            )}
            {modal?.type === ModalType.ORDER && (
              <OrderModal action={modal.action} payload={modal.payload} />
            )}
            {modal?.type === ModalType.SHOP && (
              <ShopModal action={modal.action} payload={modal.payload} />
            )}
            {modal?.type === ModalType.DISPLAY && (
              <DisplayModal action={modal.action} payload={modal.payload} />
            )}
            {modal?.type === ModalType.REPORT && (
              <CreateReportModal
                action={modal.action}
                payload={modal.payload}
              />
            )}
          </div>
        )}
        {/* {showLoader && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <img src="/icons/loading.svg" width={60} alt="" />
          </div>
        )} */}
      </main>
    </ModalContext.Provider>
  );
}
