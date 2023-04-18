import * as React from "react";
import Input from "../inputs/Input";
import { CiUser } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface IRegisterProps {}

const FormSchema = z.object({
  first_name: z
    .string()
    .min(2, "Primeiro nome deve ser maior que dois caracteres")
    .max(50, "O primeiro nome deve ter no máximo 50 caracteres")
    .regex(
      new RegExp("^[a-zA-Z]+$", "O nome não pode ter caracteres especiais")
    ),
});

type FormSchemaProps = z.infer<typeof FormSchema>;

const Register: React.FunctionComponent<IRegisterProps> = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaProps>({
    resolver: zodResolver(FormSchema),
  });
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
