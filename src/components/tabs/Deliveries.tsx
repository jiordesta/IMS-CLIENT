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

export default function Deliveries({ setShowLoading }: DeliveryTabProps) {
  const [refresh, setRefresh] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { openModal } = useModal();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { deliveries } = useSelector((state: RootState) => state.delivery);

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
      label: "Product Name",
      dkey: "productName",
      col: 4,
    },
    {
      label: "Brand",
      dkey: "brand",
      col: 4,
    },
    {
      label: "Quantity",
      dkey: "quantity",
      col: 4,
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
    setShowLoading(true);
    dispatch(fetchAllDeliveries({ token: accessToken })).then(() =>
      setShowLoading(false),
    );
  }, [accessToken, refresh]);

  const handleTableRefresh = () => {
    setRefresh(!refresh);
  };

  const handleNewDelivery = () => {
    const callBack = async (payload: any) => {
      if (!accessToken) return;
      dispatch(
        createDelivery({
          token: accessToken,
          payload: payload,
        }),
      ).then((res: any) => {
        if (res.error) {
          toast.error(res.error.message);
        } else {
          toast.success("Done Successfully");
        }

        setRefresh(!refresh);
      });
    };

    openModal(ModalType.DELIVERY, ModalAction.CREATE, {
      callBack: callBack,
      title: "CREATE DELIVERY",
    });
  };

  const handleEditDelivery = () => {
    if (selected.length != 1) {
      toast.error("Please select only one delivery");
    } else {
      if (!accessToken) return;

      const callBack = async (payload: any, id?: number) => {
        if (!accessToken) return;
        dispatch(
          updateDelivery({
            token: accessToken,
            payload: payload,
            id: id,
          }),
        ).then((res: any) => {
          if (res.error) {
            toast.error(res.error.message);
          } else {
            toast.success("Done Successfully");
          }

          setRefresh(!refresh);
        });
      };

      const delivery = deliveries.find((item) => item.id === selected[0]);

      openModal(ModalType.DELIVERY, ModalAction.UPDATE, {
        delivery: delivery,
        callBack: callBack,
      });
    }
  };

  return (
    <div className="h-full">
      <GlobalTable
        data={deliveries}
        headers={headers}
        add={handleNewDelivery}
        refresh={handleTableRefresh}
        edit={handleEditDelivery}
      />
    </div>
  );
}
