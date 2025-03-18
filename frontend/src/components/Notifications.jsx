import React, { useState } from "react";
import xicon from "../assets/images/x.svg"
import NoNotifications from "./NoNotifications";

const notificationsData = [
  {
    id: 1,
    type: "request",
    sender: "Dahmane Lharachi",
    project: "Timeless Elegance: The Architecture of Algiers",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 2,
    type: "conflict",
    sender: "Dahmane Lharachi",
    project: "Timeless Elegance: The Architecture of Algiers",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 3,
    type: "accepted-edit",
    project: "Timeless Elegance: The Architecture of Algiers",
    time: "1 day ago",
    unread: false,
  },
  {
    id: 4,
    type: "rejected-edit",
    project: "Timeless Elegance: The Architecture of Algiers",
    time: "3 weeks ago",
    unread: false,
  },
  {
    id: 5,
    type: "annotation",
    sender: "Dahmane Lharachi",
    project: "Timeless Elegance: The Architecture of Algiers",
    time: "1 month ago",
    unread: false,
  },
];

const NotificationBox = () => {
  const [notifications, setNotifications] = useState(notificationsData);

  const handleDelete = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  return (
    <>
    <div className="flex items-center justify-center h-screen bg-black bg-opacity-25">
      {notifications.length > 0 ? (
      <div className="w-3/4 h-80 overflow-y-auto bg-[#F3ECD6] rounded-lg shadow-lg ">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4  border-b border-[rgba(33, 56, 36, 0.2)] flex w-full flex-col ${
              notification.unread ? "bg-[#FFF8E3]" : "bg-[#F3ECD6]"
            }`}
          >
            <div className="flex flex-row justify-between items-start">
              <p className="text-sm text-gray-800">
                {notification.sender && (
                  <strong className="font-semibold">{notification.sender} </strong>
                )}
                {notification.type === "request" && (
                  <span >sent an editing request on your project: </span>
                )}
                {notification.type === "conflict" && (
                  <span >reported a conflict on your annotationto the project: </span>
                )}
                {notification.type === "accepted-edit" && (
                  <span >Your editing request is declined on project: </span>
                )}
                {notification.type === "rejected-request" && (
                  <span >Your editing request is accepted on project: </span>
                )}
                {notification.type === "annotation" && (
                  <span >added an annotation in your project: </span>
                )}
                <strong className="font-semibold">{notification.project}</strong>
              </p>
              <button className="p-2 rounded-full hover:bg-[#00000022]"
              onClick={() => handleDelete(notification.id)}>
                <img src={xicon} alt="delete icon" className="w-3 h-3 min-w-[12px] min-h-[12px]"/>
              </button>
            </div>

              <span className="text-xs text-gray-500">{notification.time}</span>
              <div className="flex flex-col items-end ">

              {/* Buttons Section */}
              <div className="space-x-2">
                {notification.type === "request" && (
                  <>
                    <button className="px-4 pt-1 pb-1 text-[#213824CC] text-base rounded-full hover:text-[#21382499] border border-[#213824CC] hover:border-[#21382499]">
                      Decline
                    </button>
                    <button className="px-5 pt-1 pb-1 bg-[#213824CC] text-[#FFF8E3] text-base rounded-full hover:bg-[#21382499]">
                      Accept
                    </button>
                  </>
                )}

                {notification.type === "conflict" && (
                  <>
                    <button className="px-4 pt-1 pb-1 text-[#213824CC] text-base rounded-full hover:text-[#21382499] border border-[#213824CC] hover:border-[#21382499]">
                      Dismiss
                    </button>
                    <button className="px-6 pt-1 pb-1 bg-[#213824CC] text-[#FFF8E3] text-base rounded-full hover:bg-[#21382499]">
                      Open
                    </button>
                  </>
                )}


                {notification.type === "accepted-edit" && (
                  <button className="px-7 pt-1 pb-2 bg-[#213824CC] text-[#FFF8E3] text-base rounded-full hover:bg-[#21382499]">
                    Edit
                  </button>
                )}

                {notification.type === "annotation" && (
                  <button className="px-6 pt-1 pb-2 bg-[#213824CC] text-[#FFF8E3] text-base rounded-full hover:bg-[#21382499]">
                    Open
                  </button>
                )}
              </div>
            </div>
          </div> 
        ))}
      </div>
      ) : (
        <NoNotifications />
      )}
    </div>

    </>
  );
};


export default NotificationBox;
