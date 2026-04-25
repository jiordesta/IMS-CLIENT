import { useEffect, useState } from "react";
import { updateFormField, type AnyForm } from "../../libs/utils";

interface MultTextInputProps {
  value: AnyForm;
  setter: any;
  dkey: string;
}

export default function MultTextInput({
  dkey,
  setter,
  value,
}: MultTextInputProps) {
  const [inputs, setInputs] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addInput = () => {
    if (inputValue === "") return;
    setInputs([...inputs, inputValue]);
    setInputValue("");
  };

  const removeInput = (index: number) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
  };

  useEffect(() => {
    setInputs(value[dkey]);
  }, [value]);

  useEffect(() => {
    if (inputs.length > 0) {
      updateFormField(dkey, inputs, setter);
    }
  }, [inputs]);

  return (
    <div className="">
      <div className="grid grid-cols-24 gap-2">
        {inputs.map((val, i) => (
          <div key={i} className="col-span-8 flex items-center">
            <div className="gap-2 flex bg-c1 p-1 rounded-sm w-full">
              <h1 className="w-full overflow-hidden">{val}</h1>

              <button
                className="bg-c3/75 px-1 cursor-pointer rounded"
                onClick={() => removeInput(i)}
              >
                x
              </button>
            </div>
          </div>
        ))}
      </div>
      <form
        className="flex items-center justify-center gap-2 mt-2"
        onSubmit={(e) => {
          e.preventDefault();
          addInput();
        }}
      >
        <div className="w-full border-b">
          <input
            type="text"
            value={inputValue}
            className="w-full mb-2 border-none outline-none bg-transparent focus:ring-0"
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <button className="bg-c3/75 px-2 py-1 cursor-pointer rounded">+</button>
      </form>
    </div>
  );
}
