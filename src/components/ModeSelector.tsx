import Image from "next/image";
import { signIn } from "next-auth/react";

interface SelectorProps {
  list: () => void;
  create: () => void;
}

const ModeSelector = ({ create, list }: SelectorProps) => {
  return (
    <div className="mt-[650px] z-30 flex flex-col space-y-6">
      <Image
        className="mb-8 ml-2"
        src={"/upperEatLogo.png"}
        width={300}
        height={200}
        alt="main"
      />

      <button
        onClick={create}
        className="bg-red text-lg font-semibold text-white w-[320px] py-3 rounded-lg"
      >
        Crea una nueva reserva
      </button>
      <button
        onClick={list}
        className="bg-softBlack text-lg font-semibold text-white w-[320px] py-3 rounded-lg"
      >
        Ver el listado de reservas
      </button>

      <h2 className="text-center font-bold text-black text-xl pt-8">
        Inicia sesión en
        <span className="text-red font-extrabold"> UpperEat</span>
      </h2>

      <button
        onClick={() => signIn("google")}
        className="flex flex-row items-center justify-center bg-softBlack text-lg font-semibold text-white w-[320px] py-3 rounded-lg"
      >
        <>
          <Image
            className="mr-4"
            src={"/google.png"}
            width={30}
            height={30}
            alt="main"
          />
          <h3>Continua con Google</h3>
        </>
      </button>
    </div>
  );
};

export default ModeSelector;
