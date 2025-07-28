import { Button, Form, Input } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { FaAngleLeft, FaRegEdit } from "react-icons/fa";
import { useUserProfileQuery } from "../../redux/features/useSlice";

const MyProfile = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useUserProfileQuery();

  // Extract user data from the query response
  const user = data?.data;

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading profile data...</div>;
  }

  if (isError) {
    return <div>Error loading profile data. Please try again later.</div>;
  }

  return (
    <>
      <div
        onClick={() => navigate(-1)}
        className="flex cursor-pointer items-center gap-2 text-xl text-[#FAFDEA]"
      >
        <FaAngleLeft />
        <h1>Personal information</h1>
      </div>
      <div className="rounded-lg py-4 border-lightGray border-2 shadow-lg mt-8 bg-[#373737]">
        <h3 className="text-2xl text-white mb-4 pl-5 border-b-2 border-lightGray/40 pb-3">
          Personal information
        </h3>
        <div>
          <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
            <div className="w-full">
              <div className="py-4 px-8 flex justify-end items-center">
                <Button
                  onClick={() => navigate("edit")}
                  size="large"
                  type="default"
                  className="px-8 bg-black text-white hover:bg-black/90 rounded-full font-semibold"
                >
                  <FaRegEdit />
                  Edit Profile
                </Button>
              </div>

              <Form
                name="basic"
                layout="vertical"
                className="w-full grid grid-cols-12 gap-x-10 px-14 py-8"
                autoComplete="off"
              >
                <div className="col-span-3 space-y-6">
                  <div className="min-h-[300px] flex flex-col items-center justify-center p-8 border border-black bg-lightGray/15">
                    <div className="my-2">
                      <img
                        src={user?.image || "/logo.png"}
                        alt="Profile"
                        className="h-28 w-28 rounded-full border-4 border-black"
                      />
                    </div>
                    <h5 className="text-lg text-white">Profile</h5>
                    <h4 className="text-2xl text-white">
                      {user?.role || "N/A"}
                    </h4>
                  </div>
                </div>
                <div className="col-span-9 space-y-[14px] w-full">
                  <Form.Item
                    className="text-lg font-medium text-black bg-[#373737] -mb-1"
                    label="Name"
                    name="name"
                  >
                    <Input
                      readOnly
                      value={user?.full_name || "User"}
                      defaultValue={user?.full_name || "User"}
                      size="large"
                      className="h-[53px] rounded-lg"
                    />
                  </Form.Item>
                  <Form.Item
                    className="text-lg font-medium text-black"
                    label="Email"
                    name="email"
                  >
                    <Input
                      readOnly
                      value={user?.email || "Email"}
                      defaultValue={user?.email || "Email"}
                      size="large"
                      className="h-[53px] rounded-lg"
                    />
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
        </div>
        <div className="p-[24px] pt-0.5">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MyProfile;