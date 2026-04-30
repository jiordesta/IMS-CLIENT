import { useState } from "react";
import { ModalAction, useModal } from "../hooks/UseModal";
import toast from "react-hot-toast";
import DatePicker from "../inputs/DatePicker";
import { getNewDate } from "../../libs/utils";

type CreateReportModalProps = {
  action: ModalAction;
  payload?: any;
};

export default function CreateReportModal({ payload }: CreateReportModalProps) {
  const { closeModal } = useModal();

  const reportForm = {
    date: getNewDate(),
  };

  const [form, setForm] = useState(reportForm);
  const handleCallBackCall = async () => {
    setLoading(true);

    try {
      await payload?.callBack(form);
      toast.success(payload?.success);
      closeModal();
    } catch (err) {
      toast.error(payload?.error);
    } finally {
      setLoading(false);
    }
  };

  const [isLoading, setLoading] = useState(false);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-2 relative p-4">
      <div className="w-full md:w-1/2 lg:w-1/4 bg-c2 p-4 text-c4 rounded-2xl relative">
        <div className="w-full space-y-8">
          <h1 className="bg-c1 p-8 text-center font-bold rounded-lg">
            {payload?.title}
          </h1>
          <div className="flex flex-col gap-2">
            <DatePicker value={form} setter={setForm} dkey={"date"} />
          </div>
          <div className="flex gap-2 font-bold">
            <button
              onClick={handleCallBackCall}
              className="flex gap-2 bg-c3/75 hover:bg-c3/50 p-2 rounded-lg cursor-pointer w-full justify-center items-center"
            >
              <img src="/icons/yes.svg" width={20} alt="" />
              CONFIRM
            </button>
            <button
              onClick={closeModal}
              className="flex gap-2 bg-c3/75 hover:bg-c3/50 p-2 rounded-lg cursor-pointer w-full justify-center items-center"
            >
              <img src="/icons/no.svg" width={20} alt="" />
              CANCEL
            </button>
          </div>
        </div>
        {isLoading && (
          <div className="w-full h-full bg-black/50 rounded-xl inset-0 absolute flex justify-center items-center">
            <img src="/icons/loading2.svg" alt="" width={75} />
          </div>
        )}
      </div>
    </div>
  );
}
