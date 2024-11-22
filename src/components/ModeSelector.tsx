import Image from "next/image";
import { signIn } from "next-auth/react";

interface SelectorProps {
  list: () => void;
  exploreRestaurants: () => void;
}

const ModeSelector = ({ list, exploreRestaurants }: SelectorProps) => {
  return (
    <div className=" z-30 mt-3 flex flex-col space-y-6">
      <Image
        className="mb-8 ml-2  "
        src={"/upperEatLogo.png"}
        width={300}
        height={200}
        alt="main"
      />

      <button
        onClick={list}
        className="bg-softBlack text-lg font-semibold text-white w-[320px] py-3 rounded-lg"
      >
        View reservation list
      </button>

      <button
        onClick={exploreRestaurants}
        className="bg-green-600 text-lg font-semibold text-white w-[320px] py-3 rounded-lg"
      >
        Explore restaurants
      </button>

      <h2 className="text-center font-bold text-black text-xl pt-4">
        Log in to
        <span className="text-green-600 font-extrabold"> UpperEat</span>
      </h2>

      <button
        onClick={() => signIn("google", { callbackUrl: "/reservations" })}
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
          <h3>Continue with Google</h3>
        </>
      </button>
    </div>
  );
};

export default ModeSelector;
