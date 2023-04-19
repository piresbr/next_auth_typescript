import * as React from "react";
import Input from "../inputs/Input";
import { CiUser, CiLock } from "react-icons/ci";
import { FiLock, FiMail } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import validator from "validator";
import zxcvbn from "zxcvbn";
import Link from "next/link";
import RegisterSubmit from "../buttons/RegisterSubmit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IRegisterProps {}

//validação de cada campo do formulário, warnings de cada campo
const FormSchema = z
  .object({
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
    password: z
      .string()
      .min(6, "A senha tem que ter no mínimo 6 caracteres")
      .max(52, "A senha tem que ter no mínimo 6 caracteres"),
    confirmPassword: z.string(),
    accept: z.literal(true, {
      errorMap: () => ({
        message: "Concorde com todos os termos e política de privacidade. ",
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não são iguais. Redigite por favor!",
    path: ["confirmPassword"],
  });

//criação desse type em referencia aos dados inseridos nos campos, depois ele usa no resolver do submit quando clicado.
type FormSchemaProps = z.infer<typeof FormSchema>;

const Register: React.FunctionComponent<IRegisterProps> = (props) => {
  const [passwordScore, setPasswordScore] = React.useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaProps>({
    resolver: zodResolver(FormSchema),
  });
  const onSubmit: SubmitHandler<FormSchemaProps> = async (values) => {
    try {
      const { data } = await axios.post("/api/auth/signup", { ...values });

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

  //força da senha
  const validatePasswordStrength = (data: any) => {
    let password = watch(data).password;
    return zxcvbn(password ? password : "").score;
  };

  // console.log(zxcvbn("asas123!!@@@asda44AAAsdasq!@2(")); //check score password

  //toda vez que a senha é digitado o estado é renderizado novamente
  React.useEffect(() => {
    setPasswordScore(validatePasswordStrength);
  }, [watch().password]);

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
          icon={<BsTelephone />}
          register={register}
          error={errors?.phone?.message}
          disabled={isSubmitting}
        />
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

        {/* medidor força da senha */}
        {watch().password?.length > 0 && (
          <div className="flex mt-2 col-span-1 sm:col-span-2">
            {Array.from(Array(5).keys()).map((span, i) => (
              <span className="w-1/5 px-1" key={i}>
                <div
                  className={`h-2 rounded-lg ${
                    passwordScore <= 2
                      ? "bg-red-600"
                      : passwordScore < 4
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                ></div>
              </span>
            ))}
          </div>
        )}

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

        <div className="col-span-1 sm:col-span-2 relative flex flex-col items-center">
          <div className="w-full">
            <input
              type="checkbox"
              id="accept"
              className="focus:ring-1 rounded"
              {...register("accept")}
            />
            <label htmlFor="accept" className="ml-1 text-gray-700">
              Eu aceito os
              <Link
                href=""
                target="_blank"
                className="text-blue-600 hover:text-blue-400 ml-1"
              >
                termos e a política de privacidade
              </Link>
            </label>
          </div>

          {errors?.accept && (
            <p className="text-[#ED4337] p-0 mx-0 text-xs w-full">
              {errors?.accept.message}
            </p>
          )}
        </div>
      </div>
      <RegisterSubmit
        type="submit"
        text="Registrar"
        slide_text="Registre-se com segurança"
        // className=" hover:bg-blue-700 hover:transition-all hover:duration-200 overflow-hidden group"
        icon={<FiLock />}
        disabled={isSubmitting}
      />
    </form>
  );
};

export default Register;
