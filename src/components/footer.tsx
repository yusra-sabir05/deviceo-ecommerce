import React from "react";
import Container from "./container";
import { footerData } from "@/constants";
import Link from "next/link";
import { FaLinkedin, FaGithub } from "react-icons/fa"; // Importing icons

const Footer = () => {
  return (
    <div className="py-5 bg-bgLight">
      <Container className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {footerData?.map((item) => (
          <div key={item?._id}>
            <h3 className="text-darkblueViolet/90 text-lg font-semibold mb-3">
              {item?.title}
            </h3>
            <div className="flex flex-col gap-0.5">
              {item?.listItem?.map((list) =>
                list?.listData?.map((data) => (
                  <Link
                    key={data}
                    href={"/"}
                    className="py-1 font-medium text-blueViolet hover:text-darkblueViolet/90 hoverEffect"
                  >
                    {data}
                  </Link>
                ))
              )}
            </div>
          </div>
        ))}
      </Container>

      {/* Connect with Me Section */}
      <div className="flex flex-col items-center py-5">
        <h4 className="text-lg font-semibold text-darkblueViolet mb-2">
          Connect with me
        </h4>
        <div className="flex justify-center items-center">
          <Link
            href="https://www.linkedin.com/in/yusra-sabir-997b272b9"
            target="_blank"
            className="mx-3 transition-colors"
          >
            <FaLinkedin
              size={30}
              className="text-blue-700 hover:text-blue-800"
            />{" "}
            {/* Default LinkedIn color */}
          </Link>
          <Link
            href="https://github.com/yusra-sabir05"
            target="_blank"
            className="mx-3 transition-colors"
          >
            <FaGithub size={30} className="text-gray-700 hover:text-gray-800" />{" "}
            {/* Default GitHub color */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
