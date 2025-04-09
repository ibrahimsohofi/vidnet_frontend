import React, { useState } from "react";
import ChevronDown from "./Icons/ChevronDown";
import { HashLink as Link } from "react-router-hash-link";

function Faqs() {
  function handleScroll() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  const faqsData = [
    {
      question: "How do I download a video from YouTube?",
      answer:
        "Simply copy the video URL, paste it into the input field on our website, select your preferred format and resolution, and click the download button. It's that easy!",
    },
    {
      question: "How does it work?",
      answer: (
        <>
          1- Copy the YouTube video link. <br />
          2- Paste it into the Vidly search bar. <br />
          3- Choose your desired format and resolution. <br />
          4- Click 'Download' and enjoy your video offline!
        </>
      ),
    },
    {
      question: "What are the supported formats and resolutions?",
      answer:
        "VidNet supports a wide range of formats, including MP4, MP3, and more. Resolutions available include 720p, 1080p, and higher. You can choose the option that best suits your needs.",
    },
    {
      question: "What types of files can I convert?",
      answer:
        "Our converter tool supports various file types, including documents, images, audio, and video files. For a full list, visit the 'Converter' page.",
    },
    {
      question: "How do I use the downloader tool?",
      answer:
        "Go to the 'Downloader' page from the navigation menu. Enter the file URL and click 'Download'. The file will be saved to your device.",
    },
    {
      question: "Is this service free?",
      answer:
        "Yes, our basic services are free. However, we offer premium features that require a subscription. Visit our 'About' page for more details.",
    },
    {
      question: "Is there a limit to the file size I can upload?",
      answer:
        "Yes, the maximum file size you can upload is 100MB. If your file exceeds this limit, consider compressing it before uploading.",
    },
    {
      question: "Are my files secure on this website?",
      answer:
        "Yes, we prioritize your privacy and security. All uploaded files are encrypted and accessible only to you.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "Visit the 'Contact' page and fill out the contact form. Our support team will respond as soon as possible.",
    },
    {
      question: "What is this website about?",
      answer:
        "This platform provides tools for downloading and converting files, along with information about our services and support.",
    },
  ];
  return (
    <article className="border-gray-300 border w-[98.4%] m-3 mb-5 h-fit rounded-lg bg-white shadow-lg">
      <section className="flex justify-evenly p-6 items-center rounded-lg">
        <div className="w-7/12 flex-col flex-wrap flex gap-4 text-md pr-14">
          <h1 className="text-3xl w-full font-Montserrat text-center font-bold text-gray-800">
            How Can We Assist You?
          </h1>

          <p className="  ">
            Ever struggled to save your favorite YouTube videos for offline
            viewing?{" "}
            <a href="/" className="text-orange-500 font-semibold underline">
              VidNet
            </a>{" "}
            is here to help! Whether it's a tutorial, a music video, or anything
            else, our platform offers a fast, secure, and user-friendly way to
            download videos in just a few clicks.
          </p>
          <p>
            Once you're ready, you can choose the video format and resolution
            that works best for you. Vidly works seamlessly across all devices
            for a smooth experience.
          </p>
          <p>
            To get started, simply watch the video below for a quick
            walkthrough. It will show you exactly how to begin downloading your
            videos.
          </p>
          <p>
            And if you need any further assistance, our FAQ section has all the
            answers, and we're always here to help
          </p>
        </div>

        <div className="w-2/5 flex p-2 pt-6 justify-end items-center">
          <video
            src="./videos/Ecommerce.mkv"
            className="rounded-lg h-auto w-full"
            controls
          ></video>
        </div>
      </section>
      <section className="flex justify-start  flex-col  px-8 py-2  gap-5 rounded-lg w-full ">
        <div className="w-full">
          <h1 className="text-4xl w-full font-Montserrat text-gray-900  pt-5 text-center font-bold">
            Frequently Asked Questions (FAQs)
          </h1>
          <p className="text-gray-700 w-full text-center text-lg p-1">
            Explore answers to common questions{" "}
          </p>
        </div>
        <div className="gap-2 grid-cols-1 flex-col flex justify-center items-center ">
          {faqsData.map((item, index) => (
            <QuestionCard key={index} {...item} />
          ))}
        </div>
      </section>
      <section className="w-full flex flex-col justify-center items-center ">
        <h5 className="p-3 text-xl text-gray-800 font-semibold">
          Didn't find what you are looking for?
        </h5>
        <Link to="/contact">
          <button
            className="bg-orange-500 p-2 w-36 text-white text-xl rounded-lg  shadow-lg mb-3  hover:scale-[1.02]"
            onClick={handleScroll}
          >
            Contact us
          </button>
        </Link>
      </section>
    </article>
  );
}
function QuestionCard({ question, answer }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <div className="flex flex-col w-11/12 ">
        <h2
          role="button"
          onClick={() => {
            setIsVisible(isVisible ? false : true);
          }}
          className="relative flex-wrap hover:scale-[1.003] h-fit bg-gray-100 hover:bg-gray-200  justify-between items-center p-4  text-xl font-semibold rounded-lg w-full flex"
        >
          {question}
          <button
            className="focus:outline-none"
            onClick={() => {
              setIsVisible(isVisible ? false : true);
            }}
          >
            <ChevronDown
              className={`w-4 h-4 duration-500 transition-transform hover:scale-[1.3] hover:duration-300 ${
                isVisible ? "rotate-0" : "-rotate-90"
              }`}
            />
          </button>
        </h2>

        <div
          className={`transition-max-height duration-[500ms] ease-in-out  ${
            isVisible ? "max-h-40" : "max-h-0"
          }`}
        >
          <p
            className={`px-4 bg-gray-100 transition-max-height rounded-lg mt-1 duration-[550ms] ${
              isVisible
                ? "opacity-100  py-4"
                : " overflow-hidden opacity-0 py-0"
            }`}
          >
            {answer}
          </p>
        </div>
      </div>
    </>
  );
}

export default Faqs;
