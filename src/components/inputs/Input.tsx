import * as React from "react";
import { FieldError } from "react-hook-form/dist/types";
import { IoAlertCircle } from "react-icons/io5";
import { ImEye, ImEyeBlocked } from "react-icons/im";

interface IInputProps {
  name: string;
  label: string;
  type: string;
  className?: string;
  icon: JSX.Element;
  placeholder: string;
  register: any;
  error: FieldError | any;
  disabled: boolean;
}

const Input: React.FunctionComponent<IInputProps> = (props) => {
  const {
    name,
    label,
    type,
    className,
    icon,
    placeholder,
    register,
    error,
    disabled,
  } = props;

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className={`${className}`}>
      <label htmlFor={name} className="text-gray-500">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-event-none absolute left-0 inset-y-0 flex items-center pl-3">
          <span className="text-gray-500 text-sm">{icon}</span>
        </div>
        <input
          type={showPassword ? "text" : type}
          className={`w-full mb-1 py-2 pl-8 pr-2 block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-indigo-500 focus:ring-2 text-sm ${
            error ? "border-1 solid border-red-500 focus:border-red-500" : ""
          }`}
          placeholder={placeholder}
          {...register(name)}
        />

        {(name == "password" || name == "confirmPassword") && (
          <div
            className="absolute top-2 right-2 text-xl text-gray-700 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <ImEye /> : <ImEyeBlocked />}
          </div>
        )}
      </div>

      {error && (
        <div className="fill-red-500 absolute right-1 text-xl">
          <IoAlertCircle fill="#ED4337" />
        </div>
      )}
      {error && (
        <p className="text-[#ED4337] max-w-[calc(100%_-_28px)] text-xs">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
