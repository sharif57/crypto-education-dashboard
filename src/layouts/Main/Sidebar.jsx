
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "/logo.png";
import { createElement, useEffect, useState } from "react";
import { routeLinkGenerators } from "../../utils/routeLinkGenerators";
import { dashboardItems } from "../../constants/router.constants";
import Swal from "sweetalert2";
import { LogOut } from "lucide-react";


const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [, setOpenNome] = useState({});

  const handleLogOut = () => {
    Swal.fire({
      text: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonText: "     Sure    ",
      cancelButtonText: "Cancel",
      showConfirmButton: true,
      confirmButtonColor: "#DC2626",
      reverseButtons: true,
    }).then((res) => {
      if (res.isConfirmed) {
        // dispatch(logout());
        localStorage.removeItem("accessToken");
        // localStorage.removeItem("user-update");
        navigate("/auth");
      }
    });
  };
  useEffect(() => {
    // console.log(location.pathname.includes("earnings"));
  }, [location.pathname]);
  return (
    <div className="fixed top-0 left-0 w-[290px] min-h-screen h-full pr-0 bg-[#373737]">
      <div className="h-full flex flex-col justify-between  pt-[50px]  drop-shadow">
        <div className="space-y[24px">
          <div className="">
            <img className=" mx-auto" src={logo} alt="" />
          </div>
          <ul className="mt-10 max-h-[650px] overflow-y-auto space-y-1 xl:space-y-2 px-4">
            {routeLinkGenerators(dashboardItems).map(
              ({ name, icon, path, children }, indx) =>
                children?.length ? null
                
                  : (
                    <li
                      onClick={() => {
                        setOpenNome((c) => ({
                          name: c?.name === name ? null : name,
                        }));
                      }}
                      key={indx}
                    >
                      <NavLink
                        to={path}
                        className={({ isActive }) =>
                          isActive
                            ? "bg-[#62C1BF] text-black" +
                            " w-full px-4 py-3 flex items-center justify-start  gap-3 text-md transition-all rounded-full"
                            : " hover:text-white  hover:bg-[#62C1BF]" +
                            " w-full px-4 py-3 flex items-center justify-start text-[#E0E0E0] gap-3 text-md transition-all rounded-full"
                        }
                      >
                        <div>{createElement(icon, { size: "18" })}</div>
                        <span> {name}</span>
                      </NavLink>
                    </li>
                  )
            )}
          </ul>
        </div>
        <div className="p-4 mt-auto  text-center">
          <button
            onClick={handleLogOut}
            className=" w-full bg-red text-black  font-semibold px-12 py-3 flex items-center justify-center gap-3 text-md outline-none rounded-full"
          >
            <LogOut size={18} className="text-white" />
            <span className="text-white font-light">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
