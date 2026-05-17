import { useEffect, useState } from "react";
import { HEADERTYPES } from "../../libs/enums";
import { getValueByPath, updateFormField } from "../../libs/utils";

type MultSelectInputProps = {
  label: string;
  placeholder: string;
  value: any;
  options: any;
  setter: any;
  dkey: string;
};

export default function MultSelectInput({
  label,
  placeholder,
  value,
  options,
  setter,
  dkey,
}: MultSelectInputProps) {
  const [selected, setSelected] = useState(value[dkey]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);

  const handleSelect = (optionId: number) => {
    if (selected.includes(optionId)) {
      setSelected(selected.filter((i: any) => i !== optionId));
    } else {
      setSelected([...selected, optionId]);
    }
  };

  useEffect(() => {
    if (isSelectedAll) {
      setSelected(options.map((option: any) => option.id));
    } else {
      setSelected([]);
    }
  }, [isSelectedAll]);

  useEffect(() => {
    updateFormField(dkey, selected, setter);
  }, [selected]);

  const headers = [
    {
      label: "",
      dkey: "",
      type: HEADERTYPES.CHECKBOX,
      itemRenderer: (optionId: number) => (
        <input
          type="checkbox"
          className="rounded-full cursor-pointer"
          checked={selected.includes(optionId)}
          onChange={() => handleSelect(optionId)}
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
      label: "Select All",
      dkey: "permission",
      col: 4,
    },
  ];

  const Item = ({ item }: any) => {
    return (
      <div
        className={`p-2 z-40 col-span-24 cursor-pointer mb-0`}
        onClick={() => setSelected?.([...selected, item])}
      >
        <ul className="grid grid-cols-24 gap-2 ">
          {headers.map((header: any) => (
            <li
              key={header.label}
              className="overflow-hidden flex items-center justify-start"
              style={{
                gridColumn: `span ${header.col} / span ${header.col}`,
              }}
            >
              {header.type === HEADERTYPES.CHECKBOX &&
                header.itemRenderer &&
                header.itemRenderer(item.id)}
              {header.type === HEADERTYPES.SHOW &&
                header.displayItemsRenderer &&
                header.displayItemsRenderer(item.id)}
              {header.typeValueRenderer ? (
                header.typeValueRenderer(item[header.dkey])
              ) : (
                <h1 className="whitespace-nowrap overflow-hidden">
                  {getValueByPath(item, header.dkey, header.type)}
                  {header.endLabel || ""}
                </h1>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="h-full bg-c2 rounded-lg">
      <div className="min-w-250">
        <div className="grid grid-cols-24 gap-2 p-2">
          {headers.map((header: any) => (
            <div
              key={header.label}
              style={{
                gridColumn: `span ${header.col} / span ${header.col}`,
              }}
              className="whitespace-nowrap overflow-hidden text-start sticky top-0 font-bold uppercase flex items-center"
            >
              {header.headerRenderer ? header.headerRenderer() : header.label}
            </div>
          ))}
        </div>
        <hr className="mb-2 mx-1" />
        <div className="col-span-24 space-y-2 h-100 overflow-auto">
          {options?.map((d: any) => (
            <Item key={d.id} item={d} />
          ))}
        </div>
      </div>
    </div>
  );
}
