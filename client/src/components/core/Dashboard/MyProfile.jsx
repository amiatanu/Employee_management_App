import React from "react";
import { useSelector } from "react-redux";

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="py-10">
      <h1 className="text-4xl font-semibold text-[#4066ff] mb-14 ">
        My Profile
      </h1>
      <div className="flex flex-col md:flex-row max-md:gap-y-6 items-center justify-between px-10 py-8 rounded-lg  bg-custom-gradient">
        <div className="flex flex-col sm:flex-row max-sm:gap-y-2 gap-x-4 items-center">
          <img
            src={`https://api.dicebear.com/5.x/initials/svg?seed=${user?.FirstName} ${user?.LastName}`}
            alt=""
            className="object-cover aspect-square w-[78px] rounded-full border-white border-2"
          />
          <div className="">
            <p className="text-xl font-medium text-white">
              {user?.FirstName} {user?.LastName}
            </p>
            <p className="text-slate-300 text-sm mt-1">{user?.Email}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-10 py-8 rounded-lg  bg-custom-gradient my-10">
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold text-white">Personal Details</p>
        </div>
        <div className="mt-10 text-slate-300 flex flex-col md:flex-row justify-between max-w-[500px]">
          <div className="flex flex-col gap-y-5">
            <div className="">
              <p className="text-sm mb-2">First Name</p>
              <p className="text-white text-md">{user?.FirstName}</p>
            </div>
            <div className="">
              <p className="text-sm mb-2">Email</p>
              <p className="text-white text-md">{user?.Email}</p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5 ">
            <div className="">
              <p className="text-sm mb-2">Last Name</p>
              <p className="text-white text-md">{user?.LastName}</p>
            </div>
            <div className="">
              <p className="text-sm mb-2">Role</p>
              <p className="text-white text-md">{user?.Role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
