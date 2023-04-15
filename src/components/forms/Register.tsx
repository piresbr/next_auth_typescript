import * as React from "react";
import Input from "../inputs/Input";
import { CiUser } from "react-icons/ci";

interface IRegisterProps {}

const Register: React.FunctionComponent<IRegisterProps> = (props) => {
  return (
    <form className="my-8 text-sm">
      <div className="gap-2 md:flex">
        <Input
          name="first_name"
          label="First name"
          type="text"
          icon={<CiUser />}
        />
      </div>
    </form>
  );
};

export default Register;
