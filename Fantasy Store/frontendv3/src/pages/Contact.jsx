import React from "react";
import { Helmet } from "react-helmet-async";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetter from "../components/NewsLetter";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Fantasy Luxe - Customer Support & Inquiries</title>
        <meta name="description" content="Get in touch with Fantasy Luxe customer support team. We're here to help with any questions about orders, products, or services." />
        <meta name="keywords" content="contact, customer support, help, inquiries, Fantasy Luxe" />
      </Helmet>
      
      <div>
        <div className="text-center text-2xl pt-10 border-t">
          <Title text1={"CONTACT"} text2={"US"} />
        </div>

        <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
          <img
            className="w-full md:max-w-[480px]"
            src={assets.contact_img}
            alt="Contact us at Fantasy Luxe"
          />

          <div className="flex flex-col justify-center items-start gap-6">
            <p className="font-semibold text-xl text-gray-600">FANTASY LUXE</p>
            
            <div>
              <p className="font-semibold text-lg text-gray-800 mb-3">Get In Touch</p>
              <p className="text-gray-700">
                We'd love to hear from you! Have questions about our products, orders, or need support? Our team is here to help.
              </p>
            </div>

            <div>
              <p className="font-semibold text-lg text-gray-800 mb-3">Customer Support</p>
              <p className="text-gray-700 mb-2">
                Use our live chat feature (bottom right) to connect with our customer care team instantly. We typically respond within minutes during business hours.
              </p>
              <p className="text-gray-700">
                Average response time: Less than 24 hours
              </p>
            </div>

            <div>
              <p className="font-semibold text-lg text-gray-800 mb-3">Common Questions</p>
              <p className="text-gray-700">
                Visit our chat feature to ask about orders, shipping, returns, payments, sizing, product authenticity, and more. Our AI-powered support handles most inquiries instantly!
              </p>
            </div>

            <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
              Open Chat Support
            </button>
          </div>
        </div>

        <NewsLetter/>
      </div>
    </>
  );
};

export default Contact;
