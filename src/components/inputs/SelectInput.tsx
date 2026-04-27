import { useState, useRef, useEffect } from "react";
import {
  getValueByPath,
  updateFormField,
  type AnyForm,
} from "../../libs/utils.ts";

interface CustomSelectProps {
  options: any[];
  placeholder?: string;
  value: AnyForm;
  setter: any;
  dkey: string;
  labelKey: string;
  fkey: string;
  disabled?: boolean;
}

export default function SelectInput({
  options,
  placeholder,
  value,
  setter,
  dkey,
  labelKey,
  fkey,
  disabled,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option[dkey] === value[fkey]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onInputChange = (id: number) => {
    updateFormField(fkey, id, setter);
  };

  return (
    <div ref={selectRef} className="relative w-full">
      <button
        onClick={() => setOpen(!open)}
        disabled={disabled}
        className="rounded-lg px-4 py-1  cursor-pointer bg-c1 flex justify-between items-center w-full"
      >
        <span className="w-full text-center">
          {selectedOption
            ? getValueByPath(selectedOption, labelKey)
            : placeholder}
        </span>
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>
      {open && (
        <div className="absolute w-full bg-c1 rounded-lg mt-1 shadow-lg z-50 max-h-60 overflow-y-auto text-center">
          {options.map((option) => (
            <div
              key={option[dkey]}
              onClick={() => {
                onInputChange(option[dkey]);
                setOpen(!open);
              }}
              className={`px-4 py-1 cursor-pointer bg-c1 hover:bg-c2/50 ${
                option[dkey] === value[dkey] ? "bg-blue-100" : ""
              }`}
            >
              {getValueByPath(option, labelKey)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
