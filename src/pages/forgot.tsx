import ForgotForm from "@/components/forms/Forgot";

export default function forgot() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-100">
        {/*----Form----*/}
        <div className="w-5/6 md:w-2/3 lg:w1/2 xl:w-2/4 2xl:w-1/3 h-full bg-white flex flex-col items-center justify-center rounded-md py-6">
          <div className="w-full flex items-center justify-between px-4 lg:px-6">
            <div className="w-full p-6">
              <ForgotForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
