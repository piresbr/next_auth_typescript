import * as React from "react";
import Input from "../inputs/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiLock, FiMail } from "react-icons/fi";
import SlideButton from "../buttons/RegisterSubmit";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import axios from "axios";

interface IResetFormProps {}

const FormSchema = z.object({
  email: z.string().email("Por favor entre com um email válido. "),
});

type FormSchemaType = z.infer<typeof FormSchema>;
const ResetForm: React.FunctionComponent<IResetFormProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });
  const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
    try {
      const { data } = await axios.post("/api/auth/forgot", {
        email: values.email,
      });
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full py-4">
      <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
        Recuperação de senha
      </h2>
      <p className="text-center text-sm text-gray-600 mt-2">
        <Link
          href="/auth"
          className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
        >
          Clique aqui
        </Link>
        &nbsp;para fazer login
      </p>
      <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <Input
            name="email"
            label="Email"
            type="text"
            icon={<FiMail />}
            placeholder="joao@emaple.com"
            register={register}
            error={errors?.email?.message}
            disabled={isSubmitting}
          />

          <SlideButton
            type="submit"
            text="Recuperar"
            slide_text="Secure"
            icon={<FiLock />}
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

export default ResetForm;
