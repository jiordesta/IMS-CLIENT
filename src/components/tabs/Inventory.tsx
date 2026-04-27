import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../configs/redux/store";
import { fetchAllItems } from "../../configs/redux/reducers/inventory";
import GlobalTable from "../GlobalTable";
import { HEADERTYPES } from "../../libs/enums";

type InventoryTabProps = {
  setShowLoading: Dispatch<SetStateAction<boolean>>;
};

export default function Inventory({ setShowLoading }: InventoryTabProps) {
  const [refresh, setRefresh] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.inventory);

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
      col: 4,
    },
    {
      label: "brand",
      dkey: "brand",
      col: 4,
    },
    {
      label: "Pumasok",
      dkey: "quantity",
      col: 4,
      endLabel: " Boxes",
    },
    {
      label: "Total Out",
      dkey: "totalOut",
      col: 4,
      endLabel: " Boxes",
    },
  ];

  useEffect(() => {
    if (!accessToken) return;
    setShowLoading(true);
    dispatch(fetchAllItems({ token: accessToken })).then(() =>
      setShowLoading(false),
    );
  }, [accessToken, refresh]);

  const handleTableRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <GlobalTable data={items} headers={headers} refresh={handleTableRefresh} />
  );
}
