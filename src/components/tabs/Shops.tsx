import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { ModalAction, ModalType, useModal } from "../hooks/UseModal";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../configs/redux/store";
import { createShop, fetchAllShops } from "../../configs/redux/reducers/shop";
import GlobalTable from "../GlobalTable";
import { HEADERTYPES } from "../../libs/enums";
import toast from "react-hot-toast";

type ShopTabProps = {
  setShowLoading: Dispatch<SetStateAction<boolean>>;
};

export default function Shops({ setShowLoading }: ShopTabProps) {
  const [refresh, setRefresh] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { openModal } = useModal();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { shops } = useSelector((state: RootState) => state.shop);
  const [isSelectedAll, setIsSelectedAll] = useState(false);

  const handleSelect = (productId: number) => {
    if (selected.includes(productId)) {
      setSelected(selected.filter((i) => i !== productId));
    } else {
      setSelected([...selected, productId]);
    }
  };

  useEffect(() => {
    if (isSelectedAll) {
      setSelected(shops.map((item) => item.id));
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
      label: "shop",
      dkey: "shopName",
      col: 4,
    },
    {
      label: "Owner",
      dkey: "ownerName",
      col: 4,
    },
    {
      label: "Username",
      dkey: "username",
      col: 4,
    },
    {
      label: "balance",
      dkey: "",
      col: 4,
      endLabel: "0.00 PHP",
    },
  ];

  useEffect(() => {
    if (!accessToken) return;
    setShowLoading(true);
    dispatch(fetchAllShops({ token: accessToken })).then(() =>
      setShowLoading(false),
    );
  }, [accessToken, refresh]);

  const handleCreateShop = () => {
    if (!accessToken) return;
    const callBack = async (payload: any) => {
      if (!accessToken) return;
      dispatch(
        createShop({
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

    openModal(ModalType.SHOP, ModalAction.CREATE, {
      callBack: callBack,
      title: "CREATE SHOP",
    });
  };

  const handleTableRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <GlobalTable
      data={shops}
      headers={headers}
      add={handleCreateShop}
      refresh={handleTableRefresh}
    />
  );
}
