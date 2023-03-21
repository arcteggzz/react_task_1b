import React from "react";
import icon_try from "../../assets/icon_try.png";
import like_icon from "../../assets/Group.png";

const VideoDetails = ({ videoDetails }) => {
  return (
    <>
      <div className="w-full flex justify-between items-center gap-[72px] py-[16px] px-[24px] border-[1px] border-gray-500 rounded-[1.5rem]">
        <div className="flex gap-[30px] items-center">
          <p className="text-white text-[20px] leading-[28px] font-extralightthin">
            {videoDetails.id}
          </p>
          <img src={videoDetails.photo} alt="" className="w-[20%] h-auto" />
          <h3 className="text-white text-[20px] leading-[28px] font-extralightthin">
            {videoDetails.title}
          </h3>
          <h3 className="text-[#DBFD51] text-[16px] leading-[20px] font-extralightthin">
            {videoDetails.username}
          </h3>
        </div>

        <div className="flex gap-[10px]">
          <h2 className="text-white text-[16px] leading-[20px] font-extralightthin">
            {videoDetails.like}
          </h2>
          <img src={like_icon} alt="" />
        </div>
      </div>
    </>
  );
};

export default VideoDetails;
