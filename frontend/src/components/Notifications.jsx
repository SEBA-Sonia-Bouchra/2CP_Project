import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import xicon from "../assets/images/x.svg";
import NoNotifications from "./NoNotifications";
import axios from 'axios';
import useCurrentUser from '../utils/useCurrentUser';

const NotificationBox = ({ toggleNotifications }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useCurrentUser();

  useEffect(() => {
    if (!user?._id) return;

    const fetchNotifications = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/notifications/user/${user._id}`
        );
        setNotifications(res.data);
      } catch (err) {
        console.error("Error fetching notifications:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [user?._id]);

  console.log(notifications);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notifications/delete/${id}`);
      setNotifications(notifications.filter(notification => notification._id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error.response?.data || error.message);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-25 font-montserral relative">
      <button
        className="absolute left-4 top-24 p-2 rounded-full flex items-center justify-center mt-7 mr-2 hover:bg-[#00000033]"
        onClick={toggleNotifications}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-7 h-7">
          <path fillRule="evenodd" d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.36a1 1 0 1 1 1.414 1.414L13.415 10.586l4.36 4.361a1 1 0 0 1-1.414 1.414L12 12l-4.361 4.361a1 1 0 0 1-1.414-1.414l4.36-4.36-4.36-4.36a1 1 0 0 1 0-1.415z" clipRule="evenodd"/>
        </svg>
      </button>

      {notifications.length > 0 ? (
        <div className="fixed top-32 w-3/4 h-3/4 overflow-y-auto bg-[#F3ECD6] rounded-lg shadow-lg ">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`p-4  border-b border-[rgba(33, 56, 36, 0.2)] flex w-full flex-col ${
                !notification.isRead ? "bg-[#FFF8E3]" : "bg-[#F3ECD6]"
              }`}
            >
              <div className="flex flex-row justify-between items-start">
                <p className="text-sm text-gray-800">{notification.message}</p>
                <button
                  className="p-2 rounded-full hover:bg-[#00000022]"
                  onClick={() => handleDelete(notification._id)}
                >
                  <img src={xicon} alt="delete icon" className="w-3 h-3 min-w-[12px] min-h-[12px]" />
                </button>
              </div>

              <span className="text-xs text-gray-500">{new Date(notification.createdAt).toLocaleString()}</span>
              <div className="flex flex-col items-end ">
                {/* Buttons Section */}
                <div className="space-x-2">
                  {notification.type === "request" && (
                    <>
                      <button
                        onClick={() => handleDelete(notification._id)}
                        className="px-4 pt-1 pb-1 text-[#213824CC] text-base rounded-full shadow-sm hover:text-[#21382499] border border-[#213824CC] hover:border-[#21382499]">
                        Decline
                      </button>

                      <button
                        onClick={() => handleDelete(notification._id)}
                        className="px-5 pt-1 pb-1 bg-[#213824CC] text-[#FFF8E3] text-base shadow-md rounded-full hover:bg-[#21382499]">
                        Accept
                      </button>

                    </>
                  )}

                  {notification.type === "conflict" && (
                    <>
                      <button
                        onClick={() => handleDelete(notification._id)}
                        className="px-4 pt-1 pb-1 text-[#213824CC] text-base rounded-full shadow-sm hover:text-[#21382499] border border-[#213824CC] hover:border-[#21382499]">
                        Dismiss
                      </button>

                      <Link to={`/projects/${notification?.projectId}`}>
                        <button className="px-6 pt-1 pb-1 bg-[#213824CC] text-[#FFF8E3] text-base shadow-md rounded-full hover:bg-[#21382499]">
                          Open
                        </button>
                      </Link>
                    </>
                  )}

                  {notification.type === "accepted-edit" && (
                    <>
                      <button
                        onClick={() => handleDelete(notification._id)}
                        className="px-4 pt-1 pb-1 text-[#213824CC] text-base rounded-full shadow-sm hover:text-[#21382499] border border-[#213824CC] hover:border-[#21382499]">
                        Dismiss
                      </button>

                    <Link to={`/projects/${notification?.projectId}/edit`}>
                    <button className="px-7 pt-1 pb-1 shadow-md bg-[#213824CC] text-[#FFF8E3] text-base rounded-full hover:bg-[#21382499]">
                      Edit
                    </button>
                    </Link>
                    </>
                  )}

                  {notification.type === "annotation" && (
                    <>
                      <button
                        onClick={() => handleDelete(notification._id)}
                        className="px-4 pt-1 pb-1 text-[#213824CC] text-base rounded-full shadow-sm hover:text-[#21382499] border border-[#213824CC] hover:border-[#21382499]">
                        Dismiss
                      </button>

                    <Link to={`/projects/${notification?.projectId}`}>
                    <button className="px-6 pt-1 pb-1 shadow-md bg-[#213824CC] text-[#FFF8E3] text-base rounded-full hover:bg-[#21382499]">
                      Open
                    </button>
                    </Link>
                    </>
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
