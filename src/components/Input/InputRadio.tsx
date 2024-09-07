import { InputProps } from "@/types";
import Input from "./Input";

function InputRadio({
    title,
    value,
    radioValues = [],
    readOnly = true,
    onChange,
    required = false,
    suport
  }: InputProps) {
    const handleInputChange = (e: any) => {
      const value = e.target.value;
      onChange(value);
    };
    return (
      <div className="relative">
        <Input
          title={title}
          value={value}
          readOnly={readOnly}
          onChange={onChange}
          required={required}
          suport={suport}
        />
        <div className="absolute top-4 flex w-full flex-row justify-evenly">
          {radioValues.map((radioValue) => (
            <div className="flex flex-row gap-4">
              <input
                type="radio"
                key={radioValue}
                id={radioValue}
                name={title}
                value={radioValue}
                className="accent-primary"
                onChange={handleInputChange}
              />
              <label htmlFor={radioValue}>{radioValue}</label>
            </div>
          ))}
        </div>
      </div>
    );
  }

  export default InputRadio;