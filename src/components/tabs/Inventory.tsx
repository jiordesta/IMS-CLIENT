import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../configs/redux/store";
import {
  fetchAllItems,
  fetchInventoryItemFlow,
} from "../../configs/redux/reducers/inventory";
import GlobalTable from "../GlobalTable";
import { HEADERTYPES } from "../../libs/enums";
import { ModalAction, ModalType, useModal } from "../hooks/UseModal";

type InventoryTabProps = {
  setShowLoading: Dispatch<SetStateAction<boolean>>;
};

export default function Inventory({}: InventoryTabProps) {
  const [refresh, setRefresh] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.inventory);
  const [isLoading, setLoading] = useState(false);
  const { openModal } = useModal();

  const handleSelect = (productId: number) => {
    if (selected.includes(productId)) {
      setSelected(selected.filter((i) => i !== productId));
    } else {
      setSelected([...selected, productId]);
    }
  };

  useEffect(() => {
    if (isSelectedAll) {
      setSelected(items.map((item) => item.id));
    } else {
      setSelected([]);
    }
  }, [isSelectedAll, refresh]);

  const handleShowInventoryItemFlow = (inventoryItemId: number) => {
    const displayHeaders = [
      {
        label: "Receiver",
        dkey: "receiver",
        col: 8,
      },
      {
        label: "Qty",
        dkey: "quantity",
        col: 6,
      },
      {
        label: "Date",
        dkey: "orderDate",
        col: 10,
        type: "date",
      },
    ];

    const apiCall = () => {
      if (!accessToken) return;

      return dispatch(
        fetchInventoryItemFlow({
          token: accessToken,
          payload: {},
          id: inventoryItemId,
        }),
      )
        .unwrap()
        .then((res) => {
          setRefresh((prev) => !prev);
          return res;
        });
    };

    openModal(ModalType.DISPLAY, ModalAction.DISPLAY, {
      items: [],
      displayHeaders: displayHeaders,
      title: "Item Flow",
      apiCall: apiCall,
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
      label: "Item",
      dkey: "productName",
      col: 3,
    },
    {
      label: "brand",
      dkey: "brand",
      col: 3,
    },
    {
      label: "Pumasok",
      dkey: "quantity",
      col: 3,
      endLabel: " Boxes",
    },
    {
      label: "Lumabas",
      dkey: "totalOut",
      col: 3,
      endLabel: " Boxes",
    },
    {
      label: "Tira",
      dkey: "stocksLeft",
      col: 3,
      endLabel: " Boxes",
    },
    {
      label: "",
      dkey: "viewOrderItems",
      col: 2,
      type: HEADERTYPES.SHOW,
      displayItemsRenderer: (inventoryItemId: number) => (
        <button
          className="cursor-pointer"
          onClick={() => handleShowInventoryItemFlow(inventoryItemId)}
        >
          <img src="/icons/showlist.svg" width={18} alt="" />
        </button>
      ),
    },
  ];

  useEffect(() => {
    if (!accessToken) return;
    setLoading(true);
    dispatch(fetchAllItems({ token: accessToken })).then(() =>
      setLoading(false),
    );
  }, [accessToken, refresh]);

  const handleTableRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <GlobalTable
      data={items}
      headers={headers}
      refresh={handleTableRefresh}
      isLoading={isLoading}
    />
  );
}
