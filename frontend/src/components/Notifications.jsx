import React, { useState } from "react";
import xicon from "../assets/images/x.svg"
import NoNotifications from "./NoNotifications";

const notificationsData = [
  {
    id: 1,
    type: "request",
    sender: "Dahmane Lharachi",
    message: "sent an editing request on your project",
    project: "Timeless Elegance: The Architecture of Algiers",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 2,
    type: "conflict",
    sender: "Dahmane Lharachi",
    message: "reported a conflict on your annotation",
    project: "Timeless Elegance: The Architecture of Algiers",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 3,
    type: "edit-accepted",
    message: "Your editing request is declined on project",
    project: "Timeless Elegance: The Architecture of Algiers",
    time: "1 day ago",
    unread: false,
  },
  {
    id: 4,
    type: "edit",
    message: "Your editing request is accepted on project",
    project: "Timeless Elegance: The Architecture of Algiers",
    time: "3 weeks ago",
    unread: false,
  },
  {
    id: 5,
    type: "annotation",
    sender: "Dahmane Lharachi",
    message: "added an annotation in your project",
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
    <div className="flex items-center justify-center h-screen bg-black bg-opacity-25">
      {notifications.length > 0 ? (
      <div className="w-3/4 h-80 overflow-y-auto bg-[#F3ECD6] rounded-lg shadow-lg ">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border-b border-[rgba(33, 56, 36, 0.2)] flex justify-between w-full ${
              notification.unread ? "bg-[#FFF8E3]" : "bg-[#F3ECD6]"
            }`}
          >
            <div>
              <p className="text-sm text-gray-800">
                {notification.sender && (
                  <strong className="font-semibold">{notification.sender} </strong>
                )}
                {notification.message}{" "}
                <strong className="font-semibold">{notification.project}</strong>
              </p>
              <span className="text-xs text-gray-500">{notification.time}</span>
            </div>

            <div className="flex flex-col items-end ">
              <button className="p-2 rounded-full hover:bg-[#00000022]"
              onClick={() => handleDelete(notification.id)}>
                <img src={xicon} alt="delete" className="w-3 h-3"/>
              </button>

              {/* Buttons Section */}
              <div className="mt-6 flex space-x-2">
                {notification.type === "request" && (
                  <>
                    <button className="px-4 pt-1 pb-2 text-[#213824CC] text-base rounded-full hover:text-[#21382499] border border-[#213824CC] hover:border-[#21382499]">
                      Decline
                    </button>
                    <button className="px-5 pt-1 pb-2 bg-[#213824CC] text-[#FFF8E3] text-base rounded-full hover:bg-[#21382499]">
                      Accept
                    </button>
                  </>
                )}

                {notification.type === "conflict" && (
                  <>
                    <button className="px-4 pt-1 pb-2 text-[#213824CC] text-base rounded-full hover:text-[#21382499] border border-[#213824CC] hover:border-[#21382499]">
                      Dismiss
                    </button>
                    <button className="px-6 pt-1 pb-2 bg-[#213824CC] text-[#FFF8E3] text-base rounded-full hover:bg-[#21382499]">
                      Open
                    </button>
                  </>
                )}


                {notification.type === "edit-accepted" && (
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
  );
};


export default NotificationBox;
