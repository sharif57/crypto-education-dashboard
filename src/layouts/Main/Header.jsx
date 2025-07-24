import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Badge } from "antd";
import { TbBellRinging } from "react-icons/tb";
import { useUserProfileQuery } from "../../redux/features/useSlice";

const Header = () => {
  const navigate = useNavigate();
  const loacatin = useLocation();
  const notificationRef = useRef(null);
  const [, setNotificationPopup] = useState(false);
  const {data} =useUserProfileQuery();
  console.log(data?.data.full_name ,'data?.data.email')
  const user = data?.data


  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setNotificationPopup(false);
  }, [loacatin.pathname]);

  return (

    <div className="w-full h-[88px] text-white flex justify-between items-center rounded-lg py-[16px] px-[32px] shadow-lg bg-[#373737] border border-[#62C1BF]">
      <div className="text-start space-y-0.5">
        <p className="text-sm md:text-xl font-light">
          {`Welcome, ${user?.full_name || "User"}`}
        </p>
        <p className="text-sm md:text-xl">{"Have a nice day!"}</p>
      </div>
      <div className="flex gap-x-[41px]">
        <div
          onClick={() => navigate("/notifications")}
          className="relative flex items-center "
        >
          <Badge style={{ backgroundColor: "#000000", width: '20px', height: '20px', objectFit: 'contain' }} count={1}>
            <TbBellRinging
              style={{ cursor: "pointer" }}
              className={` w-6 h-6 rounded-full shadow-sm  font-bold transition-all`}
            />
          </Badge>
        </div>
        <div className="flex items-center">
          <Link to={'/settings/profile'}>
            <img src={user?.image || '/logo.png'} alt="" className="rounded-full  h-[42px] w-[42px]" />
          </Link>
       
        </div>
      </div>
    </div>
  );
};

export default Header;
