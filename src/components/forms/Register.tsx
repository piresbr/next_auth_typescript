import * as React from "react";
import Input from "../inputs/Input";
import { CiUser } from "react-icons/ci";
import { useForm } from "react-hook-form";

interface IRegisterProps {}

const Register: React.FunctionComponent<IRegisterProps> = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
      <div className="gap-2 md:flex">
        <Input
          name="first_name"
          label="First name"
          type="text"
          placeholder="Primeiro nome"
          icon={<CiUser />}
          register={register}
          error={errors?.first_name?.message}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
};

export default Register;
