import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";
import { useTermsQuery } from "../../redux/features/privacySlice";
import Loading from "../../Components/Loading";

const TermsConditions = () => {
  const navigate = useNavigate();
const {data, isLoading} = useTermsQuery();
console.log("Terms Conditions Data:", data?.data);

if (isLoading){
  return <div><Loading /></div>;
}

  return (
    <>
      <div onClick={() => navigate(-1)} className="flex items-center gap-2 text-xl text-white">
        <FaAngleLeft />
        <h1>Terms & Condition</h1>
      </div>
      <div className="rounded-lg py-4 border-lightGray border-2 shadow-lg mt-8 bg-[#373737] text-white">
        <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
          <h3 className="text-2xl text-white mb-4 border-b-2 border-lightGray/40 pb-3 pl-16">
            Terms & Condition
          </h3>
          <div className="w-full px-16">
               {/* "data": [
        {
            "id": 2,
            "title": "Terms & Conditions",
            "content":  */}
     
            <div className="space-y-5 text-white text-sm">
              {
                data?.data?.map((item) => (
                  <div key={item.id}>
                    <div dangerouslySetInnerHTML={{__html: item.content}}></div>
                  </div>
                ))
              }
            </div>
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

export default TermsConditions;
