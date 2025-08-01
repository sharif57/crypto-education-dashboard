import { Table } from "antd";
import { useState } from "react";
import DashboardModal from "../../../Components/DashboardModal";
import { BsExclamation } from "react-icons/bs";
// import DashboardModal from "./DashboardModal";

const Transaction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  const columns = [
    {
      title: "#SI",
      dataIndex: "transIs",
      key: "transIs",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Subscription",
      dataIndex: "PartyName",
      key: "PartyName",
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
    },
  
    {
      title: "Action",
      key: "Review",
      aligen: "center",
      render: (_, data) => (
        <div className="  items-center justify-around textcenter flex ">
          {/* Review Icon */}
          <BsExclamation
            className="btn  px-3 py-1 text-sm rounded-full cursor-pointer"
            onClick={() => showModal(data)}
          />
        </div>
      ),
    },
  ];

  const data = [];
  for (let index = 0; index < 6; index++) {
    data.push({
      transIs: `${index + 1}`,
      name: "Henry",
      PartyName: "Party Name",
      date: "16 Apr 2024",
      _id: index,
    });
  }

  return (
    <div className="rounded-lg border py-4 bg-white mt-8 recent-users-table">
      <h3 className="text-2xl text-black mb-4 pl-2">Earnings</h3>
      {/* Ant Design Table */}
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ position: ["bottomCenter"] }}
        className="rounded-lg"
      />
      <DashboardModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        maxWidth="500px"
      >
        <div>
          <h2 className="text-lg text-center mb-4">User Details</h2>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>#SL</p>
            <p>{modalData.transIs}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>User Name</p>
            <p>{modalData.name}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Email</p>
            <p>{modalData.Email}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Mobile Phone</p>
            <p>{modalData.Phone}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Service</p>
            <p>{modalData.transIs}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Date</p>
            <p>{modalData.transIs}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Time</p>
            <p>{modalData.transIs}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Amount</p>
            <p>{modalData.transIs}</p>
          </div>
        </div>
      </DashboardModal>
    </div>
  );
};

export default Transaction;
