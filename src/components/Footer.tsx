import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className=" bg-black z-30 w-full fixed bottom-0 left-0 flex flex-col items-center text-white ">
      <div className=" flex items-center justify-center max-w-[390px] my-3 ">
        <Image
          className={"mt-2"}
          src={"/logo-white.png"}
          width={180}
          height={180}
          alt="bottom-logo"
        />
      </div>

      <div className="">
        <div className="my-3 flex flex-row items-center justify-around space-x-2">
          <a
            href="https://www.instagram.com/upper_eat/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={"/social-1.png"}
              width={30}
              height={30}
              alt="instagram"
            />
          </a>

          <a
            href="https://www.youtube.com/channel/UCD--FTzYEK0pevvotd6ZPsQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={"/social-2.png"} width={30} height={30} alt="youtube" />
          </a>

          <a
            href="https://www.linkedin.com/company/upper-eat/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={"/social-3.png"}
              width={30}
              height={30}
              alt="linkedin"
            />
          </a>
        </div>

        <div className=" flex flex-col items-center justify-center my-3 ">
          <h3 className="my-1">UpperEat</h3>
        </div>
      </div>
    </div>
  );
};

export default Footer;
