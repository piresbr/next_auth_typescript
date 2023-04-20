import * as React from "react";
import Input from "../inputs/Input";
import { CiLock } from "react-icons/ci";
import { FiLock, FiMail } from "react-icons/fi";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import LoginSubmit from "../buttons/LoginSubmit";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

interface ILoginFormProps {
  callbackUrl: string;
  csrfToken: string;
}

const FormSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(6, "A senha tem que ter no mínimo 6 caracteres")
    .max(52, "A senha tem que ter no mínimo 6 caracteres"),
});

type FormSchemaProps = z.infer<typeof FormSchema>;

const LoginForm: React.FunctionComponent<ILoginFormProps> = (props) => {
  const { callbackUrl, csrfToken } = props;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaProps>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaProps> = async (values) => {
    const res: any = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl,
    });

    if (res.error) {
      return toast.error(res.error);
    } else {
      return router.push("/");
    }
  };

  return (
    <form
      className="mb-8 text-sm"
      method="post"
      action="/api/auth/signin/email"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
        Faça seu login
      </h2>
      <p className="text-center text-sm text-gray-600 mt-2 mb-8">
        Você não tem uma conta?
        <Link className="text-bold text-blue-500 ml-1" href="?tab=signup">
          Clique aqui para se registrar
        </Link>
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3">
        <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
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
      </div>

      <LoginSubmit
        type="submit"
        text="Entrar"
        slide_text="Faça seu login com segurança"
        icon={<FiLock />}
        disabled={isSubmitting}
      />
    </form>
  );
};

export default LoginForm;
