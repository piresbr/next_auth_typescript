import * as React from "react";
import Input from "../inputs/Input";
import { CiLock } from "react-icons/ci";
import { FiLock } from "react-icons/fi";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import RegisterSubmit from "../buttons/RegisterSubmit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IResetFormProps {
  token: string;
}

//validação de cada campo do formulário, warnings de cada campo
const FormSchema = z
  .object({
    password: z
      .string()
      .min(6, "A senha tem que ter no mínimo 6 caracteres")
      .max(52, "A senha tem que ter no mínimo 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não são iguais. Redigite por favor!",
    path: ["confirmPassword"],
  });

//criação desse type em referencia aos dados inseridos nos campos, depois ele usa no resolver do submit quando clicado.
type FormSchemaProps = z.infer<typeof FormSchema>;

const ResetForm: React.FunctionComponent<IResetFormProps> = (props) => {
  const { token } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaProps>({
    resolver: zodResolver(FormSchema),
  });
  const onSubmit: SubmitHandler<FormSchemaProps> = async (values) => {
    try {
      const { data } = await axios.post("/api/auth/reset", {
        password: values.password,
        token,
      });

      toast.success(data.message, {
        position: "top-center",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return values;
    } catch (error: any) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return false;
    }
  };

  return (
    <form className="mb-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
        Redefinição de senha
      </h2>
      <p className="text-center text-sm text-gray-600 mt-2 mb-8">
        Você tem uma conta?
        <Link href="/auth" className="text-bold text-blue-500 ml-1">
          Clique aqui para entrar
        </Link>
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3">
        <Input
          name="password"
          label="Senha"
          type="password"
          className="col-span-1 sm:col-span-2 relative"
          placeholder="Digite sua senha"
          icon={<CiLock />}
          register={register}
          error={errors?.password?.message}
          disabled={isSubmitting}
        />

        <Input
          name="confirmPassword"
          label="Confirmação de senha"
          type="password"
          className="col-span-1 sm:col-span-2 relative"
          placeholder="Digite novamente sua senha"
          icon={<CiLock />}
          register={register}
          error={errors?.confirmPassword?.message}
          disabled={isSubmitting}
        />
      </div>
      <RegisterSubmit
        type="submit"
        text="Confirmar nova senha"
        slide_text="Confirma nova senha com segurança"
        icon={<FiLock />}
        disabled={isSubmitting}
      />
    </form>
  );
};

export default ResetForm;
