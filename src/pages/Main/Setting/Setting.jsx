import { FaAngleRight } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import { routeLinkGenerators } from "../../../utils/routeLinkGenerators";
import { dashboardItems } from "../../../constants/router.constants";


const Setting = () => {

  return (
    <div className="rounded-lg py-4  shadow-lg mt-8 bg-[#373737]">
      <h3 className="text-2xl text-[#FAFDEA] mb-4 pl-5 border-b border-lightGray pb-3">Settings</h3>
      <div>
        {routeLinkGenerators(dashboardItems)
          .filter(({ children }) => children && children.length > 0) // Ensure only items with children are processed
          .map(({  children }, indx) => (
            <div key={indx} className="space-y-4 container mx-auto max-w-7xl pt-4 pb-32">
              {children.map(({ subName, subPath,  }, inx) => (
                <NavLink
                  key={inx}
                  to={`/${subPath}`}
                  className="flex   justify-between items-center p-4 border border-[#62C1BF] rounded-lg"
                >
                  <span className="text-[#62C1BF] text-xl"> {subName}</span>
                  <div className="text-lg font-medium text-gray-800">
                    <FaAngleRight color="black" />
                  </div>
                </NavLink>
              ))}
            </div>
          ))}
      </div>
      <div className="p-[24px] pt-0.5">
        <Outlet />
      </div>
    </div>
  )
}

export default Setting
