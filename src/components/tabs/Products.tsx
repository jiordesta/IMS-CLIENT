import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../configs/redux/store";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import {
  createProduct,
  deleteProduct,
  fetchAllProducts,
  updateProduct,
} from "../../configs/redux/reducers/product";
import { ModalAction, ModalType, useModal } from "../hooks/UseModal";
import toast from "react-hot-toast";
import GlobalTable from "../GlobalTable";
import { HEADERTYPES } from "../../libs/enums";

type ProductTabProps = {
  setShowLoading: Dispatch<SetStateAction<boolean>>;
};

export default function Products({}: ProductTabProps) {
  const [refresh, setRefresh] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { openModal } = useModal();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { products } = useSelector((state: RootState) => state.product);
  const [isLoading, setLoading] = useState(false);

  const handleSelect = (productId: number) => {
    if (selected.includes(productId)) {
      setSelected(selected.filter((i) => i !== productId));
    } else {
      setSelected([...selected, productId]);
    }
  };

  const headers = [
    {
      label: "",
      dkey: "",
      type: HEADERTYPES.CHECKBOX,
      itemRenderer: (productId: number) => (
        <input
          type="checkbox"
          className="rounded-full cursor-pointer"
          checked={selected.includes(productId)}
          onChange={() => handleSelect(productId)}
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
      label: "product",
      dkey: "productName",
      col: 2,
    },
    {
      label: "other names",
      dkey: "otherNames",
      col: 12,
    },
  ];

  useEffect(() => {
    if (!accessToken) return;
    setLoading(true);
    dispatch(fetchAllProducts({ token: accessToken })).then(() => {
      setLoading(false);
    });
  }, [accessToken, refresh]);

  useEffect(() => {
    if (isSelectedAll) {
      setSelected(products.map((item) => item.id));
    } else {
      setSelected([]);
    }
  }, [isSelectedAll, refresh]);

  const handleCreateProduct = () => {
    if (!accessToken) return;

    const callBack = async (payload: any) => {
      if (!accessToken) return;
      dispatch(
        createProduct({
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

    openModal(ModalType.PRODUCT, ModalAction.CREATE, {
      callBack: callBack,
      title: "CREATE PRODUCT",
    });
  };

  const handleDeleteProduct = () => {
    if (!accessToken) return;

    const productIds = selected.join(",");

    const callBack = async () => {
      dispatch(
        deleteProduct({
          token: accessToken,
          payload: { productIds },
        }),
      ).then((res: any) => {
        if (res.error) {
          toast.error(res.error.message);
        } else {
          toast.success("Deleted Successfully");
        }

        setRefresh(!refresh);
      });
    };

    openModal(ModalType.CONFIRMATION, ModalAction.DELETE, {
      title: `DELETE PRODUCT${selected.length > 1 ? "S" : ""}?`,
      callBack: callBack,
    });
  };

  const handleUpdateProduct = () => {
    if (!accessToken) return;

    const callBack = async (payload?: any, id?: number) => {
      if (!accessToken) return;

      dispatch(
        updateProduct({
          payload: payload,
          token: accessToken,
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

    if (selected.length != 1) {
      toast.error("Please select only one product");
    } else {
      const product = products.find((product) => product.id === selected[0]);

      openModal(ModalType.PRODUCT, ModalAction.UPDATE, {
        callBack: callBack,
        title: "UPDATE PRODUCT",
        product: product,
      });
    }
  };

  const handleTableRefresh = () => {
    if (!accessToken) return;
    setRefresh(!refresh);
  };

  return (
    <div className="h-full w-full">
      <GlobalTable
        data={products}
        headers={headers}
        refresh={handleTableRefresh}
        add={handleCreateProduct}
        del={handleDeleteProduct}
        edit={handleUpdateProduct}
        isLoading={isLoading}
      />
    </div>
  );
}
