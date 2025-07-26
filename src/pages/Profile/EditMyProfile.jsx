import { Button, Form, Input, Upload, message } from "antd";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";
import { useUpdateProfileMutation, useUserProfileQuery } from "../../redux/features/useSlice";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

const EditMyProfile = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useUserProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  // Extract user data from the query response
  const user = data?.data;

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading profile data. Please try again later.</div>;
  }

  // Handle form submission
  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("full_name", values.name);
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      }

      const response = await updateProfile(formData).unwrap();
    console.log(response);
      message.success("Profile updated successfully!");
      navigate(-1); // Navigate back to the profile page
    } catch (error) {
      message.error("Failed to update profile. Please try again.");
      console.error("Update error:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Form submission failed:", errorInfo);
  };

  // Handle image upload
  const handleUploadChange = ({ fileList: newFileList }) => {
    // Limit to one file
    setFileList(newFileList.slice(-1));
  };

  // Image upload props
  const uploadProps = {
    name: "file",
    fileList,
    onChange: handleUploadChange,
    beforeUpload: () => false, // Prevent automatic upload
    accept: "image/*",
  };

  return (
    <>
      <div
        onClick={() => navigate(-1)}
        className="flex text-white cursor-pointer items-center gap-2 text-xl"
      >
        <FaAngleLeft />
        <h1>Personal information</h1>
      </div>
      <div className="rounded-lg py-4 border-lightGray border-2 shadow-lg mt-8 bg-[#373737]">
        <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
          <h3 className="text-2xl text-white mb-4 pl-5 border-b-2 border-lightGray/40 pb-3">
            Personal information
          </h3>
          <div className="w-full">
            <Form
              form={form}
              name="basic"
              layout="vertical"
              className="w-full grid grid-cols-12 gap-x-10 px-14 py-8"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              initialValues={{
                name: user?.full_name || "User",
                email: user?.email || "Email",
              }}
            >
              <div className="col-span-3 space-y-6">
                <div className="min-h-[300px] flex flex-col items-center justify-center p-8 border border-black bg-lightGray/15">
                  <div className="my-2">
                    <img
                      src={fileList[0]?.thumbUrl || user?.image || "/logo.png"}
                      alt="Profile"
                      className="h-28 w-28 rounded-full border-4 border-black"
                    />
                  </div>
                  <Form.Item name="profile">
                    <Upload {...uploadProps}>
                      <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
                    </Upload>
                  </Form.Item>
                  <h5 className="text-lg text-[#222222]">Profile</h5>
                  <h4 className="text-2xl text-[#222222]">{user?.role || "N/A"}</h4>
                </div>
              </div>
              <div className="col-span-9 space-y-[14px] w-full">
                <Form.Item
                  className="text-lg font-medium text-black -mb-1"
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: "Please input your name!" }]}
                >
                  <Input size="large" className="h-[53px] rounded-lg" />
                </Form.Item>
                <Form.Item
                  className="text-lg font-medium text-black"
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "Please input your email!" }]}
                >
                  <Input readOnly size="large" className="h-[53px] rounded-lg" />
                </Form.Item>
                <Form.Item className="flex justify-end pt-4">
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={isUpdating}
                    className="px-8 bg-[#6F6F6F] text-white hover:bg-black/90 rounded-full font-semibold"
                  >
                    Save Changes
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMyProfile;