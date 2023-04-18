import * as React from "react";
import { FieldError } from "react-hook-form/dist/types";
import { IoAlertCircle } from "react-icons/io5";

interface IInputProps {
  name: string;
  label: string;
  type: string;
  icon: JSX.Element;
  placeholder: string;
  register: any;
  error: FieldError | any;
  disabled: boolean;
}

const Input: React.FunctionComponent<IInputProps> = (props) => {
  const { name, label, type, icon, placeholder, register, error, disabled } =
    props;
  return (
    <div className="mt-3 w-full">
      <label htmlFor={name} className="text-gray-500">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-event-none absolute left-0 inset-y-0 flex items-center pl-3">
          <span
            className={`text-gray-500 text-sm ${
              error ? "translate-y-[-10px]" : ""
            }`}
          >
            {icon}
          </span>
        </div>
        <input
          type={type}
          className="w-full ру-2 pl-8 pr-7 block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-indigo-500 focus:ring-2 text-sm"
          placeholder={placeholder}
          {...register(name)}
          style={{ borderColor: `${error ? "#ED4337" : ""}` }}
        />
        {error && (
          <div className="fill-red-500 absolute right-2 text-xl">
            <IoAlertCircle fill="#ED4337" />
          </div>
        )}
        {error && <p className="text-[#ED4337]">{error}</p>}
      </div>
    </div>
  );
};

export default Input;
