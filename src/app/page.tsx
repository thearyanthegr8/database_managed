import Image from "next/image";
import "./globals.css";
import Sidemenu from "./_landing-page/side-menu";
import Footer from "./_footer/footer";
import { Sidedash } from "./_landing-page/side-dash";
import Productcard from "./_landing-page/product-card";

export default function Home() {
  return (
   <>
      {/* <Sidedash /> */}
      <div className="flex flex-wrap w-full gap-10 justify-center">
      <Productcard />
      <Productcard />
      <Productcard />
      <Productcard />
      <Productcard />
      <Productcard />
      <Productcard />
      <Productcard />
      </div>
      {/* <Product image="/image/product/product1.svg" /> */}
   <Footer />
   </> 
  )
}
