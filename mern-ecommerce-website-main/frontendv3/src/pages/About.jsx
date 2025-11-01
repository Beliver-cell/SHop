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
            Welcome to Fantasy Luxe, your number one source for all things
            luxury and style. We are dedicated to providing you with the best
            products that elevate your fashion game and make you stand out
            from the crowd.
          </p>
          <p>
            At Fantasy Luxe, we believe that luxury should be accessible to everyone. 
            That's why we curate a collection of high-quality products that combine
            style, comfort, and affordability. Whether you're looking for trendy
            apparel, statement accessories, or elegant footwear, we have something
            for every fashion enthusiast.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            To be a global leader in the fashion industry, setting trends and
            inspiring individuals to express their unique style.    
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            To provide you with the best and luxury products. making you stylish,
            winning over trends and making sure you attract attention wherever
            you go.
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
            We provde top Quality which are specialy crafted to fit your style. 
            From our lastest collections to our most selling we provide you
            with top notch products that keeps you hot at all seasons.
          </p>
        </div>

        <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ">
          <b>Convenience:</b>
          <p className="text-gray-500">
            Shop on your schedule with fast, reliable shipping and a smooth
            checkout experience. We offer multiple payment methods, easy order
            tracking, and a simple returns process so you can buy with confidence.
          </p>
        </div>

        <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-500">
            Our dedicated support team is here to help — from sizing advice to
            order questions and returns. We respond quickly and personally to
            ensure a smooth shopping experience.
          </p>
        </div>
      </div>

      <NewsLetter/>
    </div>
  );
};

export default About;
