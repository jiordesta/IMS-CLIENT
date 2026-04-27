import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { ModalAction, ModalType, useModal } from "../hooks/UseModal";
import {
  createOrder,
  deleteOrder,
  fetchOrdersByDate,
} from "../../configs/redux/reducers/order";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../configs/redux/store";
import GlobalTable from "../GlobalTable";
import { HEADERTYPES, OrderStatus } from "../../libs/enums";
import { fetchAllShops } from "../../configs/redux/reducers/shop";
import toast from "react-hot-toast";

type OrderTabProps = {
  setShowLoading: Dispatch<SetStateAction<boolean>>;
};

export default function Orders({ setShowLoading }: OrderTabProps) {
  const [refresh, setRefresh] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { orders } = useSelector((state: RootState) => state.order);
  const { openModal } = useModal();

  const [filters, setFilters] = useState({
    status: OrderStatus.PENDING,
  });

  const { shops } = useSelector((state: RootState) => state.shop);

  const handleSelect = (productId: number) => {
    if (selected.includes(productId)) {
      setSelected(selected.filter((i) => i !== productId));
    } else {
      setSelected([...selected, productId]);
    }
  };

  useEffect(() => {
    if (isSelectedAll) {
      setSelected(orders.map((item) => item.id));
    } else {
      setSelected([]);
    }
  }, [isSelectedAll, refresh]);

  const handleShowList = (orderId: number) => {
    const displayHeaders = [
      {
        label: "Name",
        dkey: "productName",
        col: 12,
      },
      {
        label: "Brand",
        dkey: "brand",
        col: 8,
      },
      {
        label: "QTY",
        dkey: "quantity",
        col: 4,
      },
    ];

    const targetOrder = orders.find((item) => item.id === orderId);

    openModal(ModalType.DISPLAY, ModalAction.DISPLAY, {
      items: targetOrder?.orderItems,
      displayHeaders: displayHeaders,
      title: "Order Details",
    });
  };

  const headers = [
    {
      label: "select",
      dkey: "select",
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
      label: "User",
      dkey: "user",
      col: 4,
    },
    {
      label: "Date",
      dkey: "orderDate",
      col: 4,
      type: "date",
    },
    {
      label: "Time",
      dkey: "orderDate",
      col: 4,
      type: "time",
    },
    {
      label: "",
      dkey: "viewOrderItems",
      col: 2,
      type: HEADERTYPES.SHOW,
      displayItemsRenderer: (orderId: number) => (
        <button
          className="cursor-pointer"
          onClick={() => handleShowList(orderId)}
        >
          <img src="/icons/showlist.svg" width={18} alt="" />
        </button>
      ),
    },
  ];

  useEffect(() => {
    if (!accessToken) return;
    setShowLoading(true);
    dispatch(fetchAllShops({ token: accessToken }));
    dispatch(
      fetchOrdersByDate({
        payload: filters,
        token: accessToken,
      }),
    ).then(() => setShowLoading(false));
  }, [accessToken, refresh, filters]);

  const handleDeleteOrder = () => {
    const orderIds = selected.join(",");

    if (!orderIds) {
      toast.error("Please select at least one order");
      return;
    }

    const callBack = async () => {
      if (!accessToken) return;

      setShowLoading(true);

      dispatch(
        deleteOrder({
          token: accessToken,
          payload: { orderIds },
        }),
      ).then((res: any) => {
        if (res.error) {
          toast.error(res.error.message);
        } else {
          toast.success("Deleted Successfully");
        }
        setShowLoading(false);
        setRefresh(!refresh);
      });
    };

    openModal(ModalType.CONFIRMATION, ModalAction.CONFIRM, {
      title: `DELETE ORDER${selected.length > 1 ? "S" : ""}?`,
      callBack: callBack,
    });
  };

  const handleCreateOrder = () => {
    const callBack = async (payload: any) => {
      if (!accessToken) return;
      setShowLoading(true);
      dispatch(
        createOrder({
          token: accessToken,
          payload: payload,
        }),
      ).then((res: any) => {
        if (res.error) {
          toast.error(res.error.message);
        } else {
          toast.success("Order Placed Successfully");
        }
        setShowLoading(false);
        setRefresh(!refresh);
      });
    };

    openModal(ModalType.ORDER, ModalAction.DELETE, {
      callBack: callBack,
      title: "DELETE ORDER?",
    });
  };

  const handleTableRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <GlobalTable
      data={orders}
      headers={headers}
      add={handleCreateOrder}
      refresh={handleTableRefresh}
      del={handleDeleteOrder}
      setFilters={setFilters}
      filters={filters}
      shops={shops}
    />
  );
}
