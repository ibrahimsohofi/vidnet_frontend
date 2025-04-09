import { useState } from "react";
import "./styles.css";
import DownloadProgress from "./DownloadProgress";
function HandleVideoInfo({ videoOpt, inputValue }) {
  const [itemsCount, setItemsCount] = useState(4);
  const [btnTitle, setBtnTitle] = useState("Load more video options");
  const [dlStatus, setDlStatus] = useState({
    progress: 0,
    isDownloading: false,
  });
  const handleDownloadStatus = () => {
    setDlStatus((prev) => ({ ...prev, isDownloading: false }));
  };
  const handleDownload = async (
    videoQuality,
    isAudioActive,
    fileExtension,
    fileUrl
  ) => {
    try {
      setDlStatus({ progress: 0, isDownloading: true });
      const response = await fetch(
        `https://4f29-34-27-45-175.ngrok-free.app/download?quality=${videoQuality}&audio=${isAudioActive}&extension=${fileExtension}&url=${encodeURIComponent(
          fileUrl
        )}`,

        { method: "GET", cache: "no-cache" },
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to start download");
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let content = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        content += decoder.decode(value);
        const lines = content.split("\n");
        lines.forEach((line) => {
          let lastProgress = 0;
          if (line.trim()) {
            try {
              const data = JSON.parse(line);
              if (data.progress !== undefined) {
                const progressValue = parseFloat(data.progress);
                if (progressValue >= lastProgress) {
                  lastProgress = progressValue;
                  setDlStatus((prev) => ({ ...prev, progress: lastProgress }));
                }
              }
              if (data.message === "Download completed") {
                setDlStatus({ progress: 100, isDownloading: false });
              }
            } catch (err) {
              console.error("Error parsing line:", line);
            }
          }
        });

        content = lines[lines.length - 1]; // Keep the last incomplete line (if any)
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred while downloading the video.");
      setDlStatus({ progress: 0, isDownloading: false });
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <table className="w-full text-center">
        <thead>
          <tr className="h-14 bg-slate-600 text-white font-bold font-Montserrat rounded-tr-sm">
            <th>Quality</th>
            <th>Size</th>
            <th>Format</th>
            <th className="rounded-tr-md"></th>
          </tr>
        </thead>
        <tbody className="text-center">
          {videoOpt
            ?.map((videoOption, index) => {
              return (
                <tr
                  className={`relative border-b-gray-300 border-b hover:bg-gray-200 ${
                    index === videoOpt.length - 1 ? "rounded-b-lg " : ""
                  }   ${index % 2 !== 0 ? "bg-white " : "bg-gray-100"}   `}
                  key={index}
                >
                  <td
                    className={`${
                      index === videoOpt.length - 1 ? "rounded-bl-lg" : ""
                    }`}
                  >
                    {videoOption.videoQuality}
                  </td>
                  <td> {videoOption.fileSize} </td>
                  <td>{videoOption.fileExtension}</td>
                  <td
                    className={`p-3   ${
                      index === videoOpt.length - 1 ? "rounded-br-lg" : ""
                    }`}
                  >
                    <button
                      onClick={() => {
                        handleDownload(1080, false, "mp4", inputValue);
                      }}
                      className={`h-8 bg-orange-600 text-white w-full rounded-[6px] flex items-center justify-center `}
                      key={`download-button-${index}`}
                    >
                      <img
                        src="./images/326639_download_file_icon.svg"
                        alt="download"
                      />
                    </button>
                  </td>
                </tr>
              );
            })
            .slice(0, itemsCount)}
        </tbody>
      </table>
      <button
        className="bg-gray-700 hover:bg-gray-800 rounded-[10px] w-9/12 p-2 font-bold text-2xl text-gray-100 m-2 flex justify-center items-center"
        onClick={() => {
          itemsCount === 4 ? setItemsCount(videoOpt.length) : setItemsCount(4);
          itemsCount === 4
            ? setBtnTitle("Show less options")
            : setBtnTitle("Load more video options");
        }}
      >
        {btnTitle}
      </button>
      {dlStatus.isDownloading ? (
        <DownloadProgress
          progress={dlStatus.progress}
          handleCancel={handleDownloadStatus}
        />
      ) : null}
    </div>
  );
}

export default HandleVideoInfo;
