import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Main from "./Main";
import DownloadCard from "./DownloadCard";
import HowToUse from "./HowToUse";
import Error from "./Error";
import DownloadCardSkeleton from "./DownloadCardSkeleton";
import Faqs from "./Faqs";
import axios from "axios";

function Header() {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState({ error: "", isActive: false });
  const [showDownloadCard, setShowDownloadCard] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadStatus, setDownloadstatus] = useState(false);
  const scrollTo = useRef(null);
  const location = useLocation();
  const howToLocation = useLocation();
  useEffect(() => {
    if (location.hash === "#faqs") {
      setTimeout(() => {
        const faqsSection = document.getElementById("faqs");
        if (faqsSection) {
          faqsSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
    if (howToLocation.hash === "#howTo") {
      setTimeout(() => {
        const howToSection = document.getElementById("howTo");
        if (howToSection) {
          howToSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  }, [location, howToLocation]);
  useEffect(() => {
    document.title = "VidNet";
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1);
  }, []);
  function scrollToTop() {
    if (scrollTo.current !== null) {
      scrollTo.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
  function handleInputChange(e) {
    setInputValue(e.target.value);
  }
  const handleActiveError = () => {
    setError({ ...error, isActive: false });
  };
  function handleDownload() {
    if (inputValue.trim() !== "") {
      scrollToTop();
      setLoading(true);
      setShowDownloadCard(true);
      setDownloadstatus(true);
      setError({ ...error, isActive: false });
    } else {
      setError({
        ...error,
        error: "Please enter a valid URL to proceed.",
        isActive: true,
      });
      setShowDownloadCard(false);
      setLoading(false);
      setDownloadstatus(true);
    }
  }
  useEffect(() => {
    if (showDownloadCard && inputValue) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://4f29-34-27-45-175.ngrok-free.app/video-info?url=${encodeURIComponent(
              inputValue
            )}`,
            {
              headers: {
                "ngrok-skip-browser-warning": "true", // Correct header to bypass ngrok warning
                // Add other headers if needed
              },
            }
          ); //http://localhost:5000/video-info?url=${encodeURIComponent(inputValue)}
          console.log("response :", response);
          console.log("Fetched data:", response.data);
          // const jsonData = await response.json();

          setVideoData(response.data);
          setDownloadstatus(false);
          setLoading(false);
        } catch (err) {
          console.error("Fetch error:", err);
          setDownloadstatus(false);
          setError({ error: err.message, isActive: true });
          setLoading(false);
          setShowDownloadCard(false);
        }
      };
      fetchData();
    }
  }, [downloadStatus, showDownloadCard, inputValue]);
  const videoInfo = videoData
    ? {
        videoTitle: videoData.title || "Unknown Title",
        videoDuration: videoData.duration || "Unknown Duration",
        videoThumbnail: videoData.thumbnail || "",
        videoUrl: videoData.videoUrl || videoData.url,
        author: videoData.author || "Unknown Author",
        authorThumbnail: videoData.authorImg || "",
        channelUrl: videoData.channelUrl || "",
      }
    : {};
  const videoOptions =
    videoData && Array.isArray(videoData.formats)
      ? videoData.formats.map((format) => ({
          formatId: format.formatId || "Unknown",
          resolution: format.resolution || "Unknown",
          fileSize: format.fileSize || "Unknown",
          videoQuality: format.videoQuality || "Unknown",
          audioQuality: format.audioBitrate || "Unknown",
          fileExtension: format.ext || "Unknown",
          fileUrl: format.url || "",
          videoUrl: inputValue,
        }))
      : [];
  const handlePasteClipboard = async () => {
    try {
      const link = await navigator.clipboard.readText();
      setInputValue(link);
      setDownloadstatus(true);
    } catch (error) {
      setError("Failed to read clipboard contents:", error);
    }
  };
  useEffect(() => {
    if (downloadStatus && inputValue.trim() !== "") {
      handleDownload();
      setDownloadstatus(false);
    }
  }, [inputValue, downloadStatus]);

  return (
    <>
      <header className="w-full h-fit flex flex-col items-center justify-start gap-2 py-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-5xl text-gray-900 text-opacity-90 font-bold">
            Download <span className="text-orange-500">Videos & Audio</span>{" "}
            Instantly
          </h1>
          <p className="text-md opacity-90 font-Montserrat font-semibold text-gray-700">
            Download desired youtube videos with hight quality in just a few
            clicks!
          </p>
        </div>
        <div
          className=" my-5 px-3 flex items-center justify-center w-3/5 gap-1 "
          ref={scrollTo}
          style={{ scrollMarginTop: "20px" }}
        >
          <div className=" bg-gray-50 hover:bg-gray-200  w-20  h-16 border border-gray-300 rounded-lg mr-[-3px]">
            <button
              className="w-full h-full shadow-lg flex items-center justify-center focus:outline-none"
              onClick={handlePasteClipboard}
            >
              <img
                className="h-10 w-10 hover:scale-105"
                src="./svg/clipboard-outline.svg "
                alt="Clipboard"
              />
            </button>
          </div>
          <input
            value={inputValue}
            id="scrollTo"
            onChange={handleInputChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleDownload();
              }
            }}
            aria-label="Download URL input"
            type="url"
            className="text-gray-950 shadow-lg text-lg outline-none font-bold rounded-md h-16  px-5 w-full border-gray-600 border-2"
            placeholder="Paste the video link here..."
          />
          <button
            onClick={handleDownload}
            className=" bg-orange-500 hover:bg-orange-600 shadow-lg shadow-gray-300 text-white 
             font-semibold rounded-md h-16 w-40 px-5 text-3xl flex items-center justify-center "
          >
            Download
          </button>
        </div>
      </header>
      <main className="flex flex-col  items-center h-full w-full">
        {loading && <DownloadCardSkeleton />}
        <Main>
          {!inputValue && error.isActive ? (
            <Error error={error.error} activeError={handleActiveError} />
          ) : (
            <>
              {showDownloadCard && !loading && (
                <>
                  <DownloadCard
                    inputValue={inputValue}
                    videoInfo={videoInfo}
                    videoOpt={videoOptions}
                    audioOpt={videoOptions}
                  />
                </>
              )}
            </>
          )}
          <span id="howTo"></span>
          <HowToUse />
          <span id="faqs"></span>
          <Faqs />
        </Main>
      </main>
      {error.isActive ? (
        <Error error={error.error} activeError={handleActiveError} />
      ) : (
        <></>
      )}
    </>
  );
}

export default Header;
