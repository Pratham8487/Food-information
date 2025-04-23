import { Facebook, Twitter, Instagram, X, Github, Leaf } from "lucide-react";
import { useState } from "react";

function Footer() {
  const [follow, setFollow] = useState("+Follow");
  return (
    <footer className=" text-gray-400 font-medium py-6 px-4 sm:px-6 lg:px-8 mt-auto bg-[#F1F5F9] ">
      <div className="flex flex-col md:flex-row border-b border-gray-300 justify-between items-center py-4  mx-auto px-4">
        <div>
          <h1>Get connected us on social media</h1>
        </div>
        <div className="flex space-x-4">
          <Facebook className="w-5 h-5 hover:text-[#4292C6] hover:scale-110 transition-all duration-300 ease-out" />
          <Twitter className="w-5 h-5 hover:text-[#4292C6] hover:scale-110 transition-all duration-300 ease-out" />
          <Instagram className="w-5 h-5 hover:text-[#4292C6] hover:scale-110 transition-all duration-300 ease-out" />
          <X className="w-5 h-5 hover:text-[#4292C6] hover:scale-110 transition-all duration-300 ease-out" />
          <Github className="w-5 h-5 hover:text-[#4292C6] hover:scale-110 transition-all duration-300 ease-out" />
        </div>
      </div>
      <div className="border-b border-gray-300 flex flex-col lg:flex-row flex-wrap justify-between px-4 sm:px-6 lg:px-8 items-start gap-6 mt-4">
        <div className="pb-4 w-full sm:w-1/2 lg:w-1/4 px-2 break-normal">
          <h1 className="flex items-center text-lg font-bold mt-4">
            <Leaf
              className="text-[#4292C6] mr-2 group-hover:text-[#2171B5] transition-colors"
              size={24}
            />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-[#08519C] ">
              NutriFind
            </span>
          </h1>

          <p className="mt-4"></p>
          <p className="mt-4 text-sm">
            Follow us for updates and news!
            <span
              onClick={() =>
                setFollow(follow === "+Follow" ? "Followed..." : "+Follow")
              }
              className="inline-block cursor-pointer p-2 text-blue-500 hover:underline"
            >
              <span
                key={follow}
                className="block transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                {follow}
              </span>
            </span>
          </p>
        </div>

        <div className="pb-4 w-full sm:w-1/2 lg:w-1/4 px-2 break-normal">
          <h1 className="flex items-center text-lg font-bold mt-4">
            <span className="uppercase text-black">Contact Us</span>
          </h1>
          <p className="mt-4 text-sm">
            For inquiries, please reach out to us at{" "}
            <span className="text-blue-500 hover:underline hover:cursor-pointer">
              support@care.com
            </span>
          </p>
        </div>

        <div className="pb-4 w-full sm:w-1/2 lg:w-1/4 px-2 break-normal">
          <h1 className="flex items-center text-lg font-bold mt-4">
            <span className="uppercase text-black">Information</span>
          </h1>

          <ul className="gap-2">
            {["About us", "Testimonials", "Blog"].map((items) => (
              <li key={items} className="text-sm">
                <span>{items}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* <div className="pb-4 w-full sm:w-1/2 lg:w-1/4 px-2 break-normal">
          <h1 className="flex items-center text-lg font-bold mt-4">
            <span className="uppercase text-black">Our Menu</span>
          </h1>
          <ul className="">
            {["Breakfast", "Lunch", "Dinner"].map((items) => (
              <li key={items} className="text-sm">
                <span>{items}</span>
              </li>
            ))}
          </ul>
        </div> */}
      </div>
      <div className="text-center flex flex-col sm:flex-row gap-2 justify-between items-center p-4 container mx-auto px-4">
        <p className="">&copy; 2025 All rights reserved.</p>
        <div className="flex flex-wrap justify-center sm:justify-end gap-2">
          <p className=" hover:text-blue-400 hover:underline hover:cursor-pointer">
            Terms of Service
          </p>
          <p className=" hover:text-blue-400 hover:underline hover:cursor-pointer">
            | Privacy Policy
          </p>
          <p className=" hover:text-blue-400 hover:underline hover:cursor-pointer">
            | Cookie Policy
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
