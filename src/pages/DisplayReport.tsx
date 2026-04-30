import { useEffect, useState } from "react";
import GlobalLayout from "../components/GlobalLayout";
import { getFromStorage } from "../libs/storage";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../configs/redux/store";
export default function DisplayReport() {
  const { date } = useParams();

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (!date) return;

    const response = getFromStorage(date);
    setData(response);
  }, [date]);

  const { products } = useSelector((state: RootState) => state.product);

  return (
    <GlobalLayout isAuthenticationRequired={false}>
      <div className="">
        <div className="flex">
          <div className="cellParent" />
          {products.map((p: any) => {
            return <div className="cellChild text-center">{p.productName}</div>;
          })}
        </div>
        {data?.map((d: any) => {
          return (
            <div key={d.name}>
              <div className="flex">
                <div className="cellChild text-end">{d.name}</div>
                {d?.report?.map((r: any) => {
                  return (
                    <div className="cellChild">
                      {r.orderItems.map((t: any) => {
                        return (
                          <div className="text-center">{`${t.quantity}(${t.brand})`}</div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </GlobalLayout>
  );
}
