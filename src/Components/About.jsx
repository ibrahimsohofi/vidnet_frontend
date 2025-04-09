import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SpeedIcon from "./Icons/SpeedIcon";
import SafeShieldICon from "./Icons/SafeShieldIcon";
import FormatsIcon from "./Icons/FormatsIcon";

function AboutUs() {
  const FEATURES_DATA = [
    {
      icon: <SpeedIcon className={"h-20 w-20"} />,
      title: "Fast Downloads",
      description: "Experience high-speed downloads with minimal wait times.",
    },
    {
      icon: <SafeShieldICon className={"h-16 w-16 fill-green-600"} />,
      title: "Secure Downloads",
      description: "Your data is safe with our top-tier security protocols.",
    },
    {
      icon: null,
      title: "Simple Interface",
      description: "Our intuitive interface ensures easy navigation and use.",
    },
    {
      icon: <FormatsIcon className={"h-20 w-20 p-1"} />,
      title: "Multiple Formats",
      description: "Download videos in various formats, including MP4 and MP3.",
    },
  ];
  useEffect(() => {
    document.title = "About";
  });
  function handleScroll() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <article className="w-full  mx-auto bg-gray-50  flex flex-col justify-center items-center ">
      <section className="about h-[30rem] gap-4">
        <h1 className="text-orange-500 font-bold font-Montserrat text-6xl">
          <span className="text-gray-900 font-semibold"> Welcome to</span>{" "}
          VidNet
        </h1>
        <p className="text-gray-700 text-xl text-center  w-7/12">
          The fastest and most reliable way to download YouTube videos.Start
          your journey with us today!
        </p>
        <Link to="/">
          <button
            className="bg-orange-500 p-3 text-xl rounded-full font-semibold  shadow-lg px-6 text-white hover:scale-[1.05]"
            onClick={handleScroll}
          >
            Start Downloading Now
          </button>
        </Link>
      </section>
      <section className="about h-fit p-8 ">
        <h1 className="text-6xl font-bold text-orange-600 font-Montserrat">
          <span className="text-gray-800 font-semibold">About </span> VidNet
        </h1>
        <div className="flex items-center h-fit">
          <div className=" gap-5 justify-center flex p-10  flex-col h-full w-1/2 text-justify">
            <p className="text-gray-800 text-lg">
              <span className="text-2xl font-semibold">- </span>
              <span className="text-orange-500 font-semibold"> VidNet</span> is
              your ultimate solution for downloading YouTube videos
              effortlessly. Designed with simplicity and speed in mind,
              <span className="text-orange-500  font-semibold"> VidNet </span>
              empowers you to save videos in the format and quality of your
              choice, all while ensuring a secure and seamless experience.
            </p>
            <p className="text-gray-800 text-lg">
              <span className="text-2xl font-semibold">- </span>
              Our mission is simple: to provide a user-friendly platform that
              lets you enjoy your favorite content offline, anytime, anywhere.
              With features like customizable downloads and lightning-fast
              processing,
              <span className="text-orange-500  font-semibold">
                {" "}
                VidNet
              </span>{" "}
              sets a new standard in convenience.
            </p>
            <p className="text-gray-800 text-lg">
              <span className="text-2xl font-semibold">- </span>
              Built with trust and transparency,
              <span className="text-orange-500  font-semibold"> VidNet </span>
              values your privacy and delivers an ad-free, safe environment.
              Whether you’re saving tutorials, music videos, or entertainment
              for the road,
              <span className="text-orange-500  font-semibold">
                {" "}
                VidNet
              </span>{" "}
              has you covered.
            </p>
          </div>
          <div className="w-1/2 ">
            <img
              src="./images/coffe.jpg"
              alt=""
              className="w-full h-[22rem] rounded-xl shadow-xl object-cover "
            />
          </div>
        </div>
      </section>
      <section className="about h-[30rem] p-8">
        <h1 className="text-6xl font-bold text-orange-600 font-Montserrat">
          <span className="text-gray-800 font-semibold">Why </span> VidNet?
        </h1>
        <p className="text-gray-700 text-ms text-center w-5/12 flex-wrap  p-2 font-[500] ">
          At VidNet, we believe in empowering users to access and enjoy their
          favorite content offline anytime, anywhere.
        </p>
        <div className="gap-5 flex flex-col h-full p-5 items-center">
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 lg:grid-cols-2 md:grid-cols-2 ">
            {FEATURES_DATA.map((feature, index) => (
              <Feature key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
function Feature({ icon, title, description }) {
  return (
    <div className="bg-white gap-3 flex px-3 shadow-md relative items-center justify-start rounded-lg">
      {icon}
      <div className="gap-1 flex flex-col">
        <h2 className="text-gray-900  font-bold text-xl">{title} </h2>
        <p className="text-gray-700 font-semibold text-lg">{description}</p>
      </div>
    </div>
  );
}

export default AboutUs;
