import * as React from "react";

interface IInputProps {
  name: string;
  label: string;
  type: string;
  icon: JSX.Element;
}

const Input: React.FunctionComponent<IInputProps> = (props) => {
  const { name, label, type, icon } = props;
  return <></>;
};

export default Input;
