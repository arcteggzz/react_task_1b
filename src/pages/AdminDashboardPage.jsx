import React, { useState, useEffect } from "react";
import AdminNavbar from "./Components/AdminNavbar";
import VideoDetails from "./Components/VideoDetails";
import MkdSDK from "../utils/MkdSDK";

const AdminDashboardPage = () => {
  const [videoList, setVideoList] = useState([]);
  const [fullVideoList, setFullVideoList] = useState([]);
  const [canPrevious, setCanPrevious] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [current, setCurrent] = useState(1);

  const getRequiredList = (arr, num) => {
    return arr.slice(num * 10 - 10, num * 10);
  };

  const viewPrevious = () => {
    if (canPrevious && current > 1) {
      setCurrent(current - 1);
      const newDisplay = getRequiredList(fullVideoList, current);
      setVideoList(newDisplay);
    } else {
      setCanNext(true);
    }
    console.log("previous", canPrevious, canNext, current);
  };

  const viewNext = () => {
    setCanPrevious(true);
    if (canNext && current < 9) {
      setCurrent(current + 1);
      const newDisplay = getRequiredList(fullVideoList, current);
      setVideoList(newDisplay);
    }
    console.log("nextPage", canPrevious, canNext, current);
  };

  useEffect(() => {
    let sdk = new MkdSDK();
    const payload = { page: 1, limit: 100 };
    const method = "PAGINATE";
    const getVideos = async (payload, method) => {
      const response = await sdk.callRestAPI(payload, method);
      console.log(response.list);
      setFullVideoList(response.list);
      const firstTen = getRequiredList(response.list, 1);
      setVideoList(firstTen);
    };

    getVideos(payload, method);
  }, []);

  return (
    <>
      <div className="w-screen flex flex-col min-h-screen px-[122px] bg-black">
        <AdminNavbar />
        <div className="flex flex-col gap-[16px]">
          {videoList.length > 0 ? (
            <>
              {videoList.map((videoDetails) => {
                return (
                  <VideoDetails
                    key={videoDetails.id}
                    videoDetails={videoDetails}
                  />
                );
              })}
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="flex justify-between w-full mt-[24px]">
          <button
            className="bg-[#9BFF00] px-[24px] py-[14px] rounded-[40px] cursor-pointer"
            disabled={!canPrevious}
            onClick={viewPrevious}
          >
            Previous Page
          </button>
          <button
            className="bg-[#9BFF00] px-[24px] py-[14px] rounded-[40px] cursor-pointer"
            disabled={!canNext}
            onClick={viewNext}
          >
            Next Page
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
