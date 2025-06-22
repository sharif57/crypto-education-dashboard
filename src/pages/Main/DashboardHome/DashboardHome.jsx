import DashboardHomeTable from "../../../Components/DashboardHomeTable";

const DashboardHome = () => {
  return (
    <div className="space-y-[24px]">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-x-10 lg:gap-x-10  gap-y-10 ">
        <div className=" flex items-center justify-center gap-6 rounded-lg bg-gradient-to-b z-10 relative from-[#1A1A1A] via-[#1A1A1A] to-[#3f3d3d]  border border-[#62C1BF] px-[24px]  py-[20px] w-96 md:w-full">
          <div className="bg-[#676767] p-6 rounded-2xl">
            <svg
              width="41"
              height="32"
              viewBox="0 0 41 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.587821"
                d="M30.667 8.88867C33.4281 8.88889 35.6668 11.2765 35.667 14.2217C35.667 17.1671 33.4282 19.5554 30.667 19.5557C27.9056 19.5557 25.667 17.1672 25.667 14.2217C25.6672 11.2764 27.9057 8.88867 30.667 8.88867ZM15.667 0C19.3487 0.000187898 22.333 3.18409 22.333 7.11133C22.3329 11.0385 19.3487 14.2225 15.667 14.2227C11.9852 14.2227 9.00011 11.0386 9 7.11133C9 3.18397 11.9851 0 15.667 0Z"
                fill="#62C1BF"
              />
              <path
                d="M15.6394 17.7778C23.6189 17.778 30.1743 21.8547 30.6628 30.5776C30.6823 30.9251 30.6629 32.0005 29.4109 32.0005H1.87961C1.4617 32.0005 0.632819 31.0389 0.667693 30.5767C1.3137 22.0919 7.77032 17.7778 15.6394 17.7778ZM30.0027 21.3364C35.6796 21.403 40.3148 24.4628 40.6638 30.9331C40.6778 31.1937 40.6637 32.0005 39.7595 32.0005H33.3327C33.3327 27.9996 32.0937 24.3072 30.0027 21.3364Z"
                fill="#62C1BF"
              />
            </svg>
          </div>
          <div className="text-center">
            <h3 className="text-[20px] text-white">{"Total users"}</h3>
            <h3 className=" text font-medium text-[48px] text-white">400</h3>
          </div>
        </div>
        <div className=" flex items-center justify-center gap-6 rounded-lg bg-gradient-to-b z-10 relative from-[#1A1A1A] via-[#1A1A1A] to-[#3f3d3d]  border border-[#62C1BF] px-[24px]  py-[20px] w-96 md:w-full">
          <div className="bg-[#676767] p-6 rounded-2xl">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 32H34C35.1046 32 36 32.8954 36 34C36 35.1046 35.1046 36 34 36H2C0.895431 36 0 35.1046 0 34V2C0 0.895431 0.895431 0 2 0C3.10457 0 4 0.895431 4 2V32Z" fill="#62C1BF"/>
<path opacity="0.5" d="M11.459 23.3677C10.7036 24.1735 9.43789 24.2144 8.63206 23.4589C7.82624 22.7035 7.78541 21.4378 8.54087 20.632L16.0409 12.632C16.7715 11.8526 17.9856 11.785 18.7982 12.4785L24.7177 17.5297L32.4302 7.76055C33.1146 6.89359 34.3723 6.74563 35.2392 7.43007C36.1062 8.11451 36.2542 9.37217 35.5697 10.2391L26.5697 21.6391C25.8667 22.5296 24.5647 22.6576 23.7017 21.9212L17.6536 16.7602L11.459 23.3677Z" fill="#62C1BF"/>
</svg>

          </div>
          <div className="text-center">
            <h3 className="text-[20px] text-white">{"Total Earnings"}</h3>
            <h3 className=" text font-medium text-[48px] text-white">$89,000</h3>
          </div>
        </div>

      
      </div>
      {/* <BarChartComponent /> */}
      <DashboardHomeTable />
    </div>
  );
};

export default DashboardHome;
