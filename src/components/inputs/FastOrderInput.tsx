import { useEffect, useState } from "react";
import { updateFormField, upsertItem, type AnyForm } from "../../libs/utils";
import toast from "react-hot-toast";

interface FastOrderInputProps {
  item: any;
  value: AnyForm;
  setter: any;
  activeInput: any;
  setActiveInput: React.Dispatch<React.SetStateAction<any>>;
}

export default function FastOrderInput({
  item,
  value,
  setter,
  activeInput,
  setActiveInput,
}: FastOrderInputProps) {
  const [isActive, setIsActive] = useState(false);
  const [wasClicked, setWasClicked] = useState(false);

  const { id, productName, brand } = item;

  const itemForm = {
    itemId: id,
    quantity: 0,
    additional: [] as number[],
  };

  const [form, setForm] = useState(itemForm);

  useEffect(() => {
    setForm(value?.items?.find((item: any) => item.itemId === id) || itemForm);
  }, []);

  useEffect(() => {
    if (activeInput?.id !== id) {
      if (isActive && form.quantity !== 0) {
        setWasClicked(true);

        const lastAdditionalValue = form.additional[form.additional.length - 1];

        if (!lastAdditionalValue || lastAdditionalValue !== 0) {
          updateFormField("additional", [...form.additional, 0], setForm);
        }
      }
      setIsActive(false);
    }
  }, [activeInput]);

  const onUpdate = (input: number) => {
    if (input < 0 && form.quantity <= 0) {
      toast.error("Invalid");
      return;
    }

    if (wasClicked) {
      const lastIndex = form.additional.length - 1;

      const newAdditional = [...form.additional];
      newAdditional[lastIndex] =
        input === 0 ? 0 : (newAdditional[lastIndex] || 0) + input;

      updateFormField("additional", newAdditional, setForm);
    } else {
      const newQuantity = input === 0 ? 0 : form.quantity + input;
      updateFormField("quantity", newQuantity, setForm);
    }
  };

  useEffect(() => {
    updateFormField("items", upsertItem(value.items, form, "itemId"), setter);
  }, [form]);

  const FastOrderNumberInput = () => {
    const buttonStyle =
      "bg-c3/50 rounded-lg w-14 cursor-pointer hover:bg-c3/75 transition-all duration-300";

    return (
      <div className="flex gap-2">
        <div className="flex flex-row gap-2 justify-end w-full">
          <button
            className={buttonStyle}
            onClick={() => {
              updateFormField("additional", [], setForm);
              updateFormField("quantity", 0, setForm);
              setWasClicked(false);
            }}
          >
            reset
          </button>
          <button className={buttonStyle} onClick={() => onUpdate(0)}>
            clear
          </button>
          <button className={buttonStyle} onClick={() => onUpdate(-1)}>
            -1
          </button>
          <button className={buttonStyle} onClick={() => onUpdate(1)}>
            +1
          </button>
          <button className={buttonStyle} onClick={() => onUpdate(5)}>
            +5
          </button>
          <button className={buttonStyle} onClick={() => onUpdate(10)}>
            +10
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-c1/75 rounded-lg text-c4 flex flex-col whitespace-nowrap transition-all duration-300 ease-in-out">
      <div
        className="grid grid-cols-24 w-full px-4 p-2 cursor-pointer rounded-lg bg-c1"
        onClick={() => {
          setIsActive(!isActive);
          setActiveInput(item);
        }}
      >
        <h1 className="col-span-4 font-bold uppercase">{productName}</h1>
        <h1 className="col-span-4 font-bold uppercase">{brand}</h1>
        <div className="col-span-16 flex gap-2 w-full justify-end">
          {form.quantity > 0 && <h1>{form.quantity}box</h1>}
          <div className="flex gap-2">
            {form.additional.map((additional, index) => {
              if (additional === 0) return null;
              return (
                <div key={index}>
                  <h1>+{additional}box</h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-250 ease-in-out ${
          isActive ? "max-h-40" : "max-h-0"
        }`}
      >
        <div className="px-4 p-2">
          <FastOrderNumberInput />
        </div>
      </div>
    </div>
  );
}
