import { useState } from "react";

function HandleAudioInfo({ audioOpt }) {
  const [itemsCount, setItemsCount] = useState(4);
   const [btnTitle, setBtnTitle] = useState("Load more audio options");
   return (
     <div className="w-full  flex flex-col items-center">
       <table className="w-full text-center ">
         <thead>
           <tr className="h-14 bg-slate-600 text-white  font-bold font-Montserrat rounded-tr-sm ">
             <th>Quality</th>
             <th>Size</th>
             <th>Format </th>
             <th className="rounded-tr-md"></th>
           </tr>
         </thead>
        <tbody className="text-center ">
          {audioOpt.map((audioOption, index) => {
            return (
              <tr
                  className={` border-b-gray-300 border-b hover:bg-gray-200 ${
                    index === audioOpt.length - 1 ? "rounded-b-lg " : ""
                  }   ${index % 2 !== 0 ? "bg-white " : "bg-gray-100"}   `}
                  key={index}
                >
                <td
                    className={`   ${
                      index === audioOpt.length - 1 ? "rounded-bl-lg" : ""
                    }`}
                  >
                    {audioOption.videoQuality}
                  </td>
                <td > {audioOption.fileSize} </td>
                <td >
                  {audioOption.fileExtension} 
                </td>
                <td
                    className={`p-3   ${
                      index === audioOpt.length - 1 ? "rounded-br-lg" : ""
                    }`}
                  >
                    <a href={audioOption.fileUrl} download>
                      <button className="h-8 bg-orange-600 text-white w-full rounded-[6px] flex items-center justify-center">
                        <img
                          src="./images/326639_download_file_icon.svg"
                          alt="download"
                        />
                      </button>
                    </a>
                  </td>
              </tr>
            );
          }).slice(0, itemsCount)}
        </tbody>
      </table>
      <button
        className="bg-gray-700 hover:bg-gray-800 rounded-[10px] w-9/12 p-2 font-bold text-2xl text-gray-100 m-2 flex justify-center items-center"
        onClick={() => {
          itemsCount === 4 ? setItemsCount(audioOpt.length) : setItemsCount(4);
          itemsCount === 4
            ? setBtnTitle("Show less options")
            : setBtnTitle("Load more audio options");
        }}
      >
        {btnTitle}
      </button>
    </div>
  );
}
export default HandleAudioInfo;
