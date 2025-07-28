import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";
import { usePrivacyPoliciesQuery } from "../../redux/features/privacySlice";
import Loading from "../../Components/Loading";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
    const {data, isLoading} = usePrivacyPoliciesQuery(undefined)

  if (isLoading) {
    return <div><Loading /></div>;
  }
  return (
    <>
      <div onClick={() => navigate(-1)} className="flex items-center gap-2 text-xl text-white">
        <FaAngleLeft />
        <h1>Privacy & Policy</h1>
      </div>
      <div className="rounded-lg py-4 border-lightGray border-2 shadow-lg mt-8 bg-[#373737] text-white">
        <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
          <h3 className="text-2xl text-white mb-4 border-b-2 border-lightGray/40 pb-3 pl-16">
            Privacy & Policy
          </h3>
          <div className="w-full px-16">

                         <p dangerouslySetInnerHTML={{ __html: data?.data.map((item) => item?.content).join("") }} />

            <div className="flex justify-end pt-4">
              <Button
                onClick={() => navigate(`edit`)}
                size="large"
                type="primary"
                className="px-8 bg-[#62C1BF] text-white hover:bg-black/90 rounded-full font-semibold w-1/4"
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
