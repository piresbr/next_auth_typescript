import { NextPageContext } from "next";

interface IErrorProps {
  statusCode?: number;
}

function ErrorComponent({ statusCode }: IErrorProps): JSX.Element {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-slate-100 text-xl bold font-semibold p-6 text-center">
      {statusCode
        ? `Página não existente ou ocorreu um erro ${statusCode} por parte do servidor.\n Tente novamente mais tarde. `
        : `Erro durante o carregamento na parte do cliente. `}
    </div>
  );
}

ErrorComponent.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorComponent;
