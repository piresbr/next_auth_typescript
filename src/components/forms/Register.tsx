import * as React from "react";
import Input from "../inputs/Input";
import { CiUser } from "react-icons/ci";
import { FiMail } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import validator from "validator";

interface IRegisterProps {}

const FormSchema = z.object({
  first_name: z
    .string()
    .min(2, "Primeiro nome deve ser maior que 2 caracteres")
    .max(50, "O primeiro nome deve ter no máximo 50 caracteres")
    .regex(
      new RegExp("^[a-zA-Z]+$"),
      "O nome não pode ter caracteres especiais"
    ),
  last_name: z
    .string()
    .min(2, "Sobrenome deve ser maior que 2 caracteres")
    .max(70, "O sobrenome deve ter no máximo 70 caracteres")
    .regex(
      new RegExp("^[a-zA-Z]+$"),
      "O nome não pode ter caracteres especiais"
    ),
  email: z.string().email("Email inválido"),
  phone: z
    .string()
    .startsWith(
      "+55",
      "Insira o seu código de discagem no ínicio do telefone, exemplo: +55"
    )
    .min(13, "O número precisa estar no formato +55(99)9999-9999")
    .refine(validator.isMobilePhone, {
      message: "Insira um número de telefone válido",
    }),
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3">
        <Input
          name="first_name"
          label="First name"
          type="text"
          className="col-span-1 sm:col-span-1 relative"
          placeholder="Primeiro nome"
          icon={<CiUser />}
          register={register}
          error={errors?.first_name?.message}
          disabled={isSubmitting}
        />
        <Input
          name="last_name"
          label="Last name"
          type="text"
          className="col-span-1 sm:col-span-1 relative"
          placeholder="Sobrenome"
          icon={<CiUser />}
          register={register}
          error={errors?.last_name?.message}
          disabled={isSubmitting}
        />
        <Input
          name="email"
          label="Email"
          type="text"
          className="col-span-1 sm:col-span-2 relative"
          placeholder="joao@exemplo.com"
          icon={<FiMail />}
          register={register}
          error={errors?.email?.message}
          disabled={isSubmitting}
        />
        <Input
          name="phone"
          label="Telefone"
          type="text"
          className="col-span-1 sm:col-span-2 relative"
          placeholder="+55(17) 99999-9999"
          icon={<FiMail />}
          register={register}
          error={errors?.phone?.message}
          disabled={isSubmitting}
        />
        <button
          type="submit"
          className="col-span-1 sm:col-span-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-700 hover:transition-all hover:duration-200"
        >
          Cadastrar
        </button>
      </div>
    </form>
  );
};

export default Register;
