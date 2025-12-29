

// import { useState } from "react";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
// import {
//   useWithdrawalManagerQuery,
//   useWithdrawApprovedMutation,
// } from "../redux/features/useSlice";
// import toast from "react-hot-toast";

// const Withdraw = () => {
//   const { data, isLoading, refetch } = useWithdrawalManagerQuery();
//   const [withdrawApproved, { isLoading: isUpdating }] = useWithdrawApprovedMutation();

//   const [openActionMenuId, setOpenActionMenuId] = useState(null);

//   const toggleActionMenu = (id) => {
//     setOpenActionMenuId((prev) => (prev === id ? null : id));
//   };

//   const handleStatusChange = async (id, status) => {
//     try {
//       await withdrawApproved({ id, status }).unwrap();
//       toast.success(`Withdrawal ${status === "approved" ? "approved" : "rejected"} successfully!`);
//       setOpenActionMenuId(null);
//       await refetch();
//     } catch (error) {
//       toast.error(`Failed to ${status === "approved" ? "approve" : "reject"} withdrawal.`);
//       console.error(error);
//     }
//   };

//   // Filter only pending withdrawals
//   const pendingWithdrawals = data?.data?.filter((item) => item.status === "pending") || [];

//   // Helper function to safely format dates
//   const formatDate = (dateString) => {
//     if (!dateString) return "-";
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return "Invalid Date";
//     return date.toLocaleString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   if (isLoading) {
//     return <div className="text-center py-10">Loading withdrawals...</div>;
//   }

//   return (
//     <div className="customTable overflow-y-auto mb-4 w-full flex flex-col items-center gap-5 mt-10">
//       <div className="w-full mx-auto">
//         <div className="customTable w-full rounded-md border overflow-hidden dark:border-slate-700 border-gray-200">
//           <table className="w-full text-sm">
//             <thead className="bg-gray-100 dark:bg-slate-900">
//               <tr>
//                 <th className="p-3 text-left font-medium dark:text-[#abc2d3] text-gray-700">
//                   Amount
//                 </th>
//                 <th className="p-3 text-left font-medium dark:text-[#abc2d3] text-gray-700">
//                   Payout Method
//                 </th>
//                 <th className="p-3 text-left font-medium dark:text-[#abc2d3] text-gray-700">
//                   Wallet Address
//                 </th>
//                 <th className="p-3 text-left font-medium dark:text-[#abc2d3] text-gray-700">
//                   Status
//                 </th>
//                 <th className="p-3 text-left font-medium dark:text-[#abc2d3] text-gray-700">
//                   Requested At
//                 </th>
//                 <th className="p-3 text-left font-medium dark:text-[#abc2d3] text-gray-700">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {pendingWithdrawals.map((item, index) => (
//                 <tr
//                   key={item.id}
//                   className="border-t dark:border-slate-700 dark:hover:bg-slate-900 border-gray-200 hover:bg-gray-50"
//                 >
//                   <td className="p-3 dark:text-[#abc2d3] font-semibold">${item.amount}</td>
//                   <td className="p-3 dark:text-[#abc2d3]">{item.payout_method}</td>
//                   <td className="p-3 dark:text-[#abc2d3] font-mono text-xs break-all">
//                     {item.wallet_address}
//                   </td>
//                   <td className="p-3">
//                     <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
//                       {item.status}
//                     </span>
//                   </td>
//                   <td className="p-3 dark:text-[#abc2d3]">
//                     {formatDate(item.requested_at)}
//                   </td>
//                   <td className="p-3 relative">
//                     <BsThreeDotsVertical
//                       onClick={() => toggleActionMenu(item.id)}
//                       className="text-xl cursor-pointer text-gray-600 dark:text-[#abc2d3] hover:text-gray-800 dark:hover:text-white"
//                     />

//                     {openActionMenuId === item.id && (
//                       <div
//                         className={`absolute z-50 right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 ${
//                           index > pendingWithdrawals.length - 4 ? "bottom-[100%]" : "top-[100%]"
//                         }`}
//                       >
//                         <div className="py-1">
//                           <button
//                             onClick={() => handleStatusChange(item.id, "approved")}
//                             disabled={isUpdating}
//                             className="w-full text-left px-4 py-2 text-sm flex items-center gap-2 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 disabled:opacity-50"
//                           >
//                             <IoCheckmarkDoneOutline />
//                             Approve
//                           </button>
//                           <button
//                             onClick={() => handleStatusChange(item.id, "rejected")}
//                             disabled={isUpdating}
//                             className="w-full text-left text-red px-4 py-2 text-sm flex items-center gap-2 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 disabled:opacity-50"
//                           >
//                             <IoCloseOutline />
//                             Reject
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {pendingWithdrawals.length === 0 && (
//             <div className="py-12 text-center">
//               <p className="text-gray-500 dark:text-gray-400 text-lg">
//                 No pending withdrawals at the moment.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Withdraw;
import { useState } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import {
  useWithdrawalManagerQuery,
  useWithdrawApprovedMutation,
} from "../redux/features/useSlice";
import toast from "react-hot-toast";

const Withdraw = () => {
  const { data, isLoading, refetch } = useWithdrawalManagerQuery();
  const [withdrawApproved, { isLoading: isUpdating }] = useWithdrawApprovedMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
  const [actionType, setActionType] = useState(""); // "approved" or "rejected"

  

  const openConfirmModal = (item, status) => {
    setSelectedWithdrawal(item);
    setActionType(status);
    setModalOpen(true);
  };

  const handleConfirm = async () => {
    if (!selectedWithdrawal) return;

    try {
      await withdrawApproved({
        id: selectedWithdrawal.id,
        status: actionType,
      }).unwrap();
      toast.success(
        `Withdrawal ${actionType === "approved" ? "approved" : "rejected"} successfully!`
      );
      setModalOpen(false);
      setSelectedWithdrawal(null);
      await refetch();
    } catch (error) {
      toast.error(
        `Failed to ${actionType === "approved" ? "approve" : "reject"} withdrawal.`
      );
      console.error(error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedWithdrawal(null);
    setActionType("");
  };

  // Filter only pending withdrawals
  const pendingWithdrawals = data?.data?.filter((item) => item.status === "pending") || [];

  // Helper function to safely format dates
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading withdrawals...</div>;
  }

  return (
    <>
      <div className="customTable overflow-y-auto mb-4 w-full flex flex-col items-center gap-5 mt-10">
        <div className="w-full mx-auto">
          <div className="customTable w-full rounded-md border overflow-hidden dark:border-slate-700 border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 dark:bg-slate-900">
                <tr>
                  <th className="p-3 text-left font-medium dark:text-[#abc2d3] text-gray-700">
                    Amount
                  </th>
                  <th className="p-3 text-left font-medium dark:text-[#abc2d3] text-gray-700">
                    Payout Method
                  </th>
                  <th className="p-3 text-left font-medium dark:text-[#abc2d3] text-gray-700">
                    Wallet Address
                  </th>
                  <th className="p-3 text-left font-medium dark:text-[#abc2d3] text-gray-700">
                    Status
                  </th>
                  <th className="p-3 text-left font-medium dark:text-[#abc2d3] text-gray-700">
                    Requested At
                  </th>
                  <th className="p-3 text-left font-medium dark:text-[#abc2d3] text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {pendingWithdrawals.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t dark:border-slate-700 dark:hover:bg-slate-900 border-gray-200 hover:bg-gray-50"
                  >
                    <td className="p-3 dark:text-[#abc2d3] font-semibold">${item.amount}</td>
                    <td className="p-3 dark:text-[#abc2d3]">{item.payout_method}</td>
                    <td className="p-3 dark:text-[#abc2d3] font-mono text-xs break-all">
                      {item.wallet_address}
                    </td>
                    <td className="p-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3 dark:text-[#abc2d3]">
                      {formatDate(item.requested_at)}
                    </td>
                    <td className="p-3 relative">
                      
                    <button className="mr-2 text-black bg-green-400 p-2 rounded-lg" onClick={() => openConfirmModal(item, "approved")} >Approved</button>
                    <button className="mr-2 text-white bg-red p-2 rounded-lg" onClick={() => openConfirmModal(item, "rejected")} >Rejected</button>
                     
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {pendingWithdrawals.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No pending withdrawals at the moment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

     {/* Confirmation Modal - Fixed Version */}
{modalOpen && selectedWithdrawal && (
  <div 
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
    onClick={closeModal} // Click outside to close
  >
    <div 
      className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl p-6 max-w-md w-full mx-4 animate-in fade-in zoom-in-95 duration-200"
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Confirm {actionType === "approved" ? "Approval" : "Rejection"}
      </h3>
      
      <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300 mb-6">
        <div className="flex justify-between">
          <span className="font-medium">Amount:</span>
          <span className="font-semibold text-lg">${selectedWithdrawal.amount}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Method:</span>
          <span>{selectedWithdrawal.payout_method}</span>
        </div>
        <div>
          <span className="font-medium block mb-1">Wallet Address:</span>
          <span className="font-mono text-xs break-all bg-gray-100 dark:bg-slate-900 px-3 py-2 rounded block">
            {selectedWithdrawal.wallet_address}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Requested:</span>
          <span>{formatDate(selectedWithdrawal.requested_at)}</span>
        </div>
      </div>

      <p className="text-gray-700 dark:text-gray-200 mb-8 text-center">
        Are you sure you want to{" "}
        <span className={`font-bold ${actionType === "approved" ? "text-green-600" : "text-red-600"}`}>
          {actionType === "approved" ? "approve" : "reject"}
        </span>{" "}
        this withdrawal request?
      </p>

      <div className="flex justify-end gap-4">
        <button
          onClick={closeModal}
          disabled={isUpdating}
          className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-slate-700 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          disabled={isUpdating}
          className={`px-5 py-2.5 text-sm font-medium text-white rounded-lg flex items-center gap-2 transition disabled:opacity-50 ${
            actionType === "approved"
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red hover:bg-red-700"
          }`}
        >
          {isUpdating ? (
            <>Processing...</>
          ) : (
            <>
              {actionType === "approved" ? <IoCheckmarkDoneOutline className="text-lg" /> : <IoCloseOutline className="text-lg" />}
              {actionType === "approved" ? "Approve" : "Reject"}
            </>
          )}
        </button>
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default Withdraw;