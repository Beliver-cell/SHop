import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetter from "../components/NewsLetter";
const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px] "
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Welcome to Fantasy Luxe, your premier destination for luxury fashion and accessories.
            We pride ourselves on offering an exceptional shopping experience with carefully curated collections
            that embody sophistication and elegance. Our commitment to excellence ensures that every piece
            in our store meets the highest standards of quality and style.
          </p>
          <p>
            At Fantasy Luxe, we believe in delivering excellence in every aspect of our service.
            From personalized styling advice to seamless shopping experience, we go above and beyond
            to ensure your satisfaction. Our team of fashion experts is dedicated to helping you
            discover pieces that perfectly match your style and preferences.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Experience the world of luxury fashion through our expertly curated collections.
            Our mission is to bring you the finest selection of designer pieces, exclusive collaborations,
            and trending styles. We strive to make high-end fashion accessible while maintaining
            the exceptional quality that Fantasy Luxe is known for.
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"}></Title>
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ">
          <b>Quality Assurance:</b>
          <p className="text-gray-500">
            At Fantasy Luxe, we maintain the highest standards of quality control. Each item in our collection undergoes rigorous inspection to ensure it meets our exceptional standards. We partner with renowned designers and manufacturers to bring you the finest luxury goods.
          </p>
        </div>

        <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ">
          <b>Convenience:</b>
          <p className="text-gray-500">
            Shop luxury at your convenience with Fantasy Luxe's seamless online experience. We offer worldwide shipping, easy returns, and secure payment options. Our user-friendly platform ensures you can browse and purchase your favorite items with ease.
          </p>
        </div>

        <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-500">
            Our dedicated team at Fantasy Luxe is committed to providing personalized assistance and expert guidance. We're here to help you find the perfect pieces and ensure your shopping experience exceeds expectations.
          </p>
        </div>
      </div>

      <NewsLetter/>
    </div>
  );
};

export default About;
