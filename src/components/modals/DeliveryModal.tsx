import { useEffect, useState } from "react";
import { ModalAction, useModal } from "../hooks/UseModal";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../configs/redux/store";
import NumberInput from "../inputs/NumberInput";
import SelectInput from "../inputs/SelectInput";
import { fetchAllProducts } from "../../configs/redux/reducers/product";
import TextInput from "../inputs/TextInput";
import toast from "react-hot-toast";

type DeliveryModalProps = {
  action: ModalAction;
  payload?: any;
};

export default function DeliveryModal({ action, payload }: DeliveryModalProps) {
  const { closeModal } = useModal();

  const deliverForm = {
    productId: undefined,
    quantity: undefined,
    brand: "",
  };

  const [form, setForm] = useState(deliverForm);
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { products } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!accessToken) return;
    dispatch(fetchAllProducts({ token: accessToken }));
  }, [action, payload]);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!payload) return;
    if (ModalAction.UPDATE === action) {
      setForm({
        productId: payload.delivery.productId,
        quantity: payload.delivery.quantity,
        brand: payload.delivery.brand,
      });
    }
  }, [action, payload]);

  const handleCallBackCall = async () => {
    setLoading(true);

    try {
      await payload?.callBack(form, payload?.delivery?.id);
      toast.success(payload?.success);
      closeModal();
    } catch (err) {
      toast.error(payload?.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-2 p-4">
      <div className="w-full md:w-1/2 lg:w-1/4 bg-c2 p-4 text-c4 rounded-lg relative">
        <div className="w-full space-y-4">
          <h1 className="bg-c1 p-8 text-center font-bold rounded-lg">
            {payload?.title}
          </h1>
          <div className="flex flex-col gap-2">
            <SelectInput
              options={products}
              placeholder="Select Product"
              value={form}
              setter={setForm}
              dkey={"id"}
              fkey={"productId"}
              labelKey="productName"
              disabled={ModalAction.UPDATE === action}
            />
            <TextInput
              label="Brand"
              placeholder="Enter Product Brand"
              value={form}
              setter={setForm}
              dkey={"brand"}
            />
            <NumberInput
              label="Quantity"
              placeholder="Enter Quantity"
              value={form}
              setter={setForm}
              dkey={"quantity"}
            />
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
          <div className="w-full h-full bg-c1/50 rounded-lg inset-0 absolute flex justify-center items-center">
            <img src="/icons/loading2.svg" alt="" width={75} />
          </div>
        )}
      </div>
    </div>
  );
}
