import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../configs/redux/store";
import { ModalAction, ModalType, useModal } from "../hooks/UseModal";
import {
  createDelivery,
  fetchAllDeliveries,
  updateDelivery,
} from "../../configs/redux/reducers/delivery";
import GlobalTable from "../GlobalTable";
import { HEADERTYPES } from "../../libs/enums";
import toast from "react-hot-toast";

type DeliveryTabProps = {
  setShowLoading: Dispatch<SetStateAction<boolean>>;
};

export default function Deliveries({}: DeliveryTabProps) {
  const [refresh, setRefresh] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { openModal } = useModal();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { deliveries } = useSelector((state: RootState) => state.delivery);
  const [isLoading, setLoading] = useState(false);

  const handleSelect = (productId: number) => {
    if (selected.includes(productId)) {
      setSelected(selected.filter((i) => i !== productId));
    } else {
      setSelected([...selected, productId]);
    }
  };

  useEffect(() => {
    if (isSelectedAll) {
      setSelected(deliveries.map((item) => item.id));
    } else {
      setSelected([]);
    }
  }, [isSelectedAll, refresh]);

  const headers = [
    {
      label: "",
      dkey: "",
      type: HEADERTYPES.CHECKBOX,
      itemRenderer: (deliveryId: number) => (
        <input
          type="checkbox"
          className="rounded-full cursor-pointer"
          checked={selected.includes(deliveryId)}
          onChange={() => handleSelect(deliveryId)}
        />
      ),
      headerRenderer: () => (
        <input
          type="checkbox"
          className="rounded-full cursor-pointer"
          checked={isSelectedAll}
          onChange={() => setIsSelectedAll(!isSelectedAll)}
        />
      ),
      col: 1,
    },
    {
      label: "Item",
      dkey: "productName",
      col: 3,
    },
    {
      label: "Brand",
      dkey: "brand",
      col: 4,
    },
    {
      label: "qty",
      dkey: "quantity",
      col: 2,
    },
    {
      label: "Date",
      dkey: "deliveryDate",
      col: 4,
      type: "date",
    },
    {
      label: "Time",
      dkey: "deliveryDate",
      col: 4,
      type: "time",
    },
  ];

  useEffect(() => {
    if (!accessToken) return;
    setLoading(true);
    dispatch(fetchAllDeliveries({ token: accessToken })).then(() =>
      setLoading(false),
    );
  }, [accessToken, refresh]);

  const handleTableRefresh = () => {
    setRefresh(!refresh);
  };

  const handleNewDelivery = () => {
    const callBack = async (payload: any) => {
      if (!accessToken) return;
      return dispatch(
        createDelivery({
          token: accessToken,
          payload: payload,
        }),
      ).then(() => {
        setRefresh(!refresh);
      });
    };

    openModal(ModalType.DELIVERY, ModalAction.CREATE, {
      callBack: callBack,
      title: "CREATE DELIVERY",
      success: "Created",
      error: "Failed to create",
    });
  };

  const handleEditDelivery = () => {
    if (selected.length != 1) {
      toast.error("Please select only one delivery");
    } else {
      if (!accessToken) return;

      const callBack = async (payload: any, id?: number) => {
        if (!accessToken) return;
        return dispatch(
          updateDelivery({
            token: accessToken,
            payload: payload,
            id: id,
          }),
        ).then(() => {
          setRefresh(!refresh);
        });
      };

      const delivery = deliveries.find((item) => item.id === selected[0]);

      openModal(ModalType.DELIVERY, ModalAction.UPDATE, {
        delivery: delivery,
        callBack: callBack,
        error: "Failed to update",
        success: "Updated",
      });
    }
  };

  return (
    <GlobalTable
      data={deliveries}
      headers={headers}
      add={handleNewDelivery}
      refresh={handleTableRefresh}
      edit={handleEditDelivery}
      isLoading={isLoading}
    />
  );
}
