// import { Table } from "antd";
// import exlamIcon from "../assets/images/exclamation-circle.png";
// import { useState } from "react";
// import DashboardModal from "./DashboardModal";

// const DashboardHomeTable = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalData, setModalData] = useState({});

//   const showModal = (data) => {
//     setIsModalOpen(true);
//     setModalData(data);
//   };

//   const columns = [
//     {
//       title: "#SI",
//       dataIndex: "transIs",
//       key: "transIs",
//       render: (text) => <a>{text}</a>,
//     },
//     {
//       title: "User Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Email",
//       dataIndex: "Email",
//       key: "Email",
//     },
//     {
//       title: "Subscription",
//       key: "subscription",
//       dataIndex: "subscription",
//     },
//     {
//       title: "Date",
//       key: "date",
//       dataIndex: "date",
//     },
//     {
//       title: "Action",
//       key: "Review",
//       aligen: "center",
//       render: (_, data) => (
//         <div className="  items-center justify-around textcenter flex ">
//           {/* Review Icon */}
//           <img
//             src={exlamIcon}
//             alt=""
//             className="btn  px-3 py-1 text-sm rounded-full cursor-pointer"
//             onClick={() => showModal(data)}
//           />
//         </div>
//       ),
//     },
//   ];

//   const data = [];
//   for (let index = 0; index < 6; index++) {
//     data.push({
//       transIs: `${index + 1}`,
//       name: "Henry",
//       Email: "sharif@gmail.com",
//       subscription: "monthly",
//       Review: "See Review",
//       date: "16 Apr 2024",
//       _id: index,
//     });
//   }

//   return (
//     <div className="rounded-lg border py-4 bg-white mt-8 recent-users-table">
//       <h3 className="text-2xl text-black mb-4 pl-2">Recent Transactions</h3>
//       {/* Ant Design Table */}
//       <Table
//         columns={columns}
//         dataSource={data}
//         pagination={{ position: ["bottomCenter"] }}
//         className="rounded-lg"
//       />
//       <DashboardModal
//         isModalOpen={isModalOpen}
//         setIsModalOpen={setIsModalOpen}
//         maxWidth="500px"
//       >
//         <div>
//           <h2 className="text-lg text-center mb-4">User Details</h2>
//           <div className="flex justify-between mb-2 text-gray-600">
//             <p>#SL</p>
//             <p>{modalData.transIs}</p>
//           </div>
//           <div className="flex justify-between mb-2 text-gray-600">
//             <p>User Name</p>
//             <p>{modalData.name}</p>
//           </div>
//           <div className="flex justify-between mb-2 text-gray-600">
//             <p>Email</p>
//             <p>{modalData.Email}</p>
//           </div>
//           <div className="flex justify-between mb-2 text-gray-600">
//             <p>Mobile Phone</p>
//             <p>{modalData.Phone}</p>
//           </div>
//           <div className="flex justify-between mb-2 text-gray-600">
//             <p>Service</p>
//             <p>{modalData.transIs}</p>
//           </div>
//           <div className="flex justify-between mb-2 text-gray-600">
//             <p>Date</p>
//             <p>{modalData.transIs}</p>
//           </div>
//           <div className="flex justify-between mb-2 text-gray-600">
//             <p>Time</p>
//             <p>{modalData.transIs}</p>
//           </div>
//           <div className="flex justify-between mb-2 text-gray-600">
//             <p>Amount</p>
//             <p>{modalData.transIs}</p>
//           </div>
//         </div>
//       </DashboardModal>
//     </div>
//   );
// };

// export default DashboardHomeTable;


import { useState } from "react";
import { Search, Info, X, Download } from "lucide-react";

export default function DashboardHomeTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    { id: "1", sl: 1, userName: "User 1", email: "user1@example.com", date: "1 Jan, 2025" },
    { id: "2", sl: 2, userName: "User 2", email: "user2@example.com", date: "1 Jan, 2025" },
    { id: "3", sl: 3, userName: "User 3", email: "user3@example.com", date: "1 Jan, 2025" },
    { id: "4", sl: 4, userName: "User 4", email: "user4@example.com", date: "1 Jan, 2025" },
    { id: "5", sl: 5, userName: "User 5", email: "user5@example.com", date: "1 Jan, 2025" },
    { id: "6", sl: 6, userName: "User 6", email: "user6@example.com", date: "1 Jan, 2025" },
    { id: "7", sl: 7, userName: "User 7", email: "user7@example.com", date: "1 Jan, 2025" },
    { id: "8", sl: 8, userName: "User 8", email: "user8@example.com", date: "1 Jan, 2025" },
    { id: "9", sl: 9, userName: "User 9", email: "standard@example.com", date: "1 Jan, 2025" },
    { id: "10", sl: 10, userName: "User 10", email: "standard@example.com", date: "1 Jan, 2025" },
    { id: "11", sl: 11, userName: "User 11", email: "standard@example.com", date: "1 Jan, 2025" },
  ];

  const handleActionClick = (user) => {
    setSelectedUser({
      ...user,
      userId: "#446178",
      transactionAmount: "$9.99",
      subscription: "Monthly",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen  bg-[#373737] rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-6 py-4">
        <h1 className="text-white text-2xl font-medium">Recent Users</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by User Name"
              className="bg-gray-700 text-white placeholder-gray-400 px-4 py-2 rounded-md pr-10 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="w-8 h-8 bg-[#62C1BF] rounded-full flex items-center justify-center">
            <Search className="size-4 " />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="w-full  overflow-hidden">
        {/* Table Header */}
        <div className="bg-[#62C1BF] px-6 py-4 grid grid-cols-5 gap-4 text-white font-medium text-sm">
          <div>#SL</div>
          <div>User Name</div>
          <div>Email</div>
          <div>Date</div>
          <div className="text-center">Action</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-600 ">
          {users.map((user) => (
            <div
              key={user.id}
              className="px-6 py-4 grid grid-cols-5 gap-4 text-gray-300 text-sm hover:bg-gray-600 transition-colors"
            >
              <div>#{user.sl}</div>
              <div>{user.userName}</div>
              <div>{user.email}</div>
              <div>{user.date}</div>
              <div className="text-center">
                <button
                  onClick={() => handleActionClick(user)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-700 rounded-lg p-6 w-full max-w-md relative">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-lg font-medium">User Details</h2>
              <button
                onClick={closeModal}
                className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-300">User ID</span>
                <span className="text-white">{selectedUser.userId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Date</span>
                <span className="text-white">{selectedUser.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">User Name</span>
                <span className="text-white">{selectedUser.userName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Transaction Amount</span>
                <span className="text-white">{selectedUser.transactionAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Subscription</span>
                <span className="text-white">{selectedUser.subscription}</span>
              </div>
            </div>

            {/* Download Button */}
            <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
}