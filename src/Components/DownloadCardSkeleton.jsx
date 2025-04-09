import "./styles.css";

function DownloadCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      role="status"
      aria-live="polite"
      className="flex flex-row items-center justify-between h-[76vh] w-[98%] bg-white p-4 
                 border rounded-lg  border-b border-gray-300 m-3  relative overflow-hidden shimmer"
    >
      <div className="w-[45%] h-full flex gap-2 flex-col ">
        <div className="bg-gray-400 h-[17rem] rounded-lg "></div>
        <div className=" h-2/6  gap-4 flex flex-col w-11/12 ">
          <div className="bg-gray-400 h-9 rounded-md"></div>
          <div className=" h-12 rounded-lg flex items-center  gap-4">
            <div className="h-16 w-16 bg-gray-400 rounded-full"></div>
            <div className="h-7 w-5/6 bg-gray-400 rounded-md "></div>
          </div>
        </div>
      </div>
      <div className=" w-4/6 h-full  px-4 gap-2 flex flex-col   ">
        <div className="h-9 w-1/2 bg-gray-400 rounded-md"></div>
        <div className="h-9  w-full bg-gray-400 rounded-md"></div>
        <div className="h-9  w-full bg-gray-400 rounded-md"></div>
        <div className="h-9  w-full bg-gray-400 rounded-md"></div>
        <div className="h-9  w-full bg-gray-400 rounded-md"></div>
        <div className="h-9  w-full bg-gray-400 rounded-md"></div>
        <div className="h-9  w-full bg-gray-400 rounded-md"></div>
        <div className="h-9  w-full bg-gray-400 rounded-md"></div>
        <div className="h-9  w-3/5 bg-gray-400 rounded-md mx-auto"></div>
      </div>
    </div>
  );
}
export default DownloadCardSkeleton;
