import { useEffect, useState } from "react";
import { ModalAction, useModal } from "../hooks/UseModal";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../configs/redux/store";
import { fetchallUsers } from "../../configs/redux/reducers/user";
import { fetchPermissionsList } from "../../configs/redux/reducers/config";
import TextInput from "../inputs/TextInput";
import MultSelectInput from "../inputs/MultSelectInput";

type RoleModalProps = {
  action: ModalAction;
  payload?: any;
};

export default function RoleModal({ action, payload }: RoleModalProps) {
  const { closeModal } = useModal();

  const roleForm = {
    roleName: "",
    permissionsIds: [],
  };

  const [form, setForm] = useState(roleForm);

  const { accessToken } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const [isLoading, setLoading] = useState(false);

  const { permissions } = useSelector((state: RootState) => state.config);

  useEffect(() => {
    if (!accessToken) return;
    dispatch(fetchallUsers({ token: accessToken }));
    dispatch(fetchPermissionsList({ token: accessToken }));
  }, [action, payload]);

  useEffect(() => {
    if (!payload) return;
    if (ModalAction.UPDATE === action) {
      setForm({
        roleName: payload.roleName,
        permissionsIds: payload.permissionsIds,
      });
    }
  }, [action, payload]);

  const handleCallBackCall = async () => {
    setLoading(true);
    await payload?.callBack(form, payload?.product?.id).then(() => {
      closeModal();
      setLoading(false);
    });
  };

  return (
    <div className="w-full h-full relative flex flex-col justify-center items-center gap-2 p-2">
      <div className="w-full md:w-1/2 lg:w-1/4 bg-c2 p-2 text-c4 rounded-lg relative">
        <div className="w-full space-y-2">
          <h1 className="bg-c1 p-8 text-center font-bold rounded-lg">
            {payload?.title}
          </h1>
          <div className="flex flex-col gap-2">
            <div className="p-2">
              <TextInput
                label="Role Name"
                placeholder="Enter Role Name"
                value={form}
                setter={setForm}
                dkey={"roleName"}
              />
            </div>
            <MultSelectInput
              label="Role"
              placeholder="Role Name"
              value={form}
              options={permissions}
              setter={setForm}
              dkey={"permissionsIds"}
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
          <div className="w-full h-full bg-black/25 rounded-lg inset-0 absolute flex justify-center items-center">
            <img src="/icons/loading2.svg" alt="" width={75} />
          </div>
        )}
      </div>
    </div>
  );
}
