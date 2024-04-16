import React from "react";
// import {FaInstagram} from "react-icons/fa";
// import {FaTwitter} from "react-icons/fa";
// import {FaLinkedin} from "react-icons/fa";
// import {FaYoutube} from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-gray-50 w-full flex md:flex-row flex-col justify-between items-start py-20 px-[10rem]">
      <div className="">
        <ul>
          <p className="text-gray-800 font-bold text-3xl">Database Managed</p>
          {/* <div className="flex gap-6">
            <FaInstagram className='text-2xl cursor-pointer hover:text-yellow-600'/>
                <FaTwitter className='text-2xl cursor-pointer hover:text-blue-600'/>
                <FaLinkedin className='text-2xl cursor-pointer hover:text-yellow-600'/>
                <FaYoutube className='text-2xl cursor-pointer hover:text-red-600'/>
          </div> */}
        </ul>
      </div>
      <div className="flex gap-[10rem]">
        <div className="">
          <ul className="text-right">
            <p className="text-gray-800 font-bold text-2xl pb-4">Product</p>
            <li className="text-gray-500 text-md pb-2 font-semibold">Stocks</li>
            <li className="text-gray-500 text-md pb-2 font-semibold">
              Listings
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold">
              Sellers
            </li>
          </ul>
        </div>
        <div className="">
          <ul className="text-right">
            <p className="text-gray-800 font-bold text-2xl pb-4">Company</p>
            <li className="text-gray-500 text-md pb-2 font-semibold">About</li>
            <li className="text-gray-500 text-md pb-2 font-semibold">
              Product
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold">
              Pricing
            </li>
          </ul>
        </div>
        <div className="">
          <ul className="text-right">
            <p className="text-gray-800 font-bold text-2xl pb-4">Support</p>
            <li className="text-gray-500 text-md pb-2 font-semibold">
              Contact
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold">
              Contact Portal
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold">
              Talk to Agent
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
