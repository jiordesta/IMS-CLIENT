import { useEffect, useState } from "react";
import { ModalAction, useModal } from "../hooks/UseModal";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../configs/redux/store";
import SelectInput from "../inputs/SelectInput";
import FastOrderInput from "../inputs/FastOrderInput";
import { fetchMenu } from "../../configs/redux/reducers/order";
import DatePicker from "../inputs/DatePicker";

type OrderModalProps = {
  action: ModalAction;
  payload?: any;
};

export default function OrderModal({ action, payload }: OrderModalProps) {
  const orderForm = {
    //orderDate: new Date(),
    //status: payload?.orderDetails?.status,
    //type: payload?.orderDetails?.type,
    userId: payload?.shopDetails?.shopId,
    items: [],
    orderDate: new Date(),
    // payload?.orderItems?.map((item: any) => ({
    //   id: item.id,
    //   productId: item.productId,
    //   quantity: item.quantity,
    // })) || [],
  };

  const { closeModal } = useModal();
  const [form, setForm] = useState(orderForm);
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setLoading] = useState(false);
  const { menu } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    if (!accessToken) return;
    dispatch(fetchMenu({ token: accessToken }));
  }, [action, payload]);

  const handleCallBackCall = async () => {
    setLoading(true);
    await payload?.callBack(form, payload?.product?.id).then(() => {
      closeModal();
      setLoading(false);
    });
  };

  const [activeInput, setActiveInput] = useState<any>();

  return (
    <div className="w-full h-full relative flex flex-col justify-center items-center gap-2 p-2">
      <div className="w-full md:w-1/2 lg:w-1/4 bg-c2 p-2 text-c4 rounded-lg relative">
        <div className="w-full space-y-2">
          <h1 className="bg-c1 p-8 text-center font-bold rounded-lg">
            {payload?.title}
          </h1>
          <div className="flex flex-col gap-2">
            <DatePicker value={form} setter={setForm} dkey={"orderDate"} />
            <SelectInput
              options={menu?.users || []}
              placeholder="Who ordered?"
              value={form}
              setter={setForm}
              dkey={"id"}
              fkey={"userId"}
              labelKey="name"
              disabled={action === ModalAction.UPDATE}
            />
            <div className="flex flex-col gap-2 h-100 overflow-auto">
              {menu?.menu?.map((item) => {
                return (
                  <FastOrderInput
                    key={item.id}
                    value={form}
                    setter={setForm}
                    item={item}
                    activeInput={activeInput}
                    setActiveInput={setActiveInput}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="bg-c3/75 hover:bg-c3/50 w-full p-2 rounded-lg cursor-pointer"
              onClick={handleCallBackCall}
              disabled={isLoading}
            >
              CONFIRM
            </button>
            <button
              className="bg-c3/75 hover:bg-c3/50 w-full p-2 rounded-lg cursor-pointer"
              onClick={closeModal}
              disabled={isLoading}
            >
              CANCEL
            </button>
          </div>
        </div>
        {isLoading && (
          <div className="w-full h-full bg-black/25 rounded-lg inset-0 absolute flex justify-center items-center">
            <img src="/icons/loading.svg" alt="" width={75} />
          </div>
        )}
      </div>
    </div>
  );
}
