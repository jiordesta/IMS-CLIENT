import { useEffect, useState } from "react";
import { ModalAction, useModal } from "../hooks/UseModal";
import MultTextInput from "../inputs/MultTextInput";

type ProductModalProps = {
  action: ModalAction;
  payload?: any;
};

export default function ProductModal({ action, payload }: ProductModalProps) {
  const { closeModal } = useModal();

  const productForm = {
    names: [],
  };

  const [form, setForm] = useState(productForm);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!payload) return;
    if (ModalAction.UPDATE === action) {
      setForm({
        names: payload.names,
      });
    }
  }, [action, payload]);

  const handleCallBackCall = async () => {
    setLoading(true);
    await payload?.callBack(form, payload?.id).then(() => {
      closeModal();
      setLoading(false);
    });
  };

  return (
    <div className="w-full h-full relative flex flex-col justify-center items-center gap-2 p-4">
      <div className="w-full md:w-1/2 lg:w-1/4 bg-c2 p-4 text-c4 rounded-lg relative">
        <div className="w-full space-y-8">
          <h1 className="bg-c1 p-8 text-center font-bold rounded-lg">
            {payload?.title}
          </h1>
          <div className="flex flex-col gap-2">
            <MultTextInput value={form} dkey="names" setter={setForm} />
          </div>
          <div className="flex gap-2">
            <button
              className="bg-c3/75 hover:bg-c3/50 w-full p-2 rounded-lg cursor-pointer"
              disabled={isLoading}
              onClick={handleCallBackCall}
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
