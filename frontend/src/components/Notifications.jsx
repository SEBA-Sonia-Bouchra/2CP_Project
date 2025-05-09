import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import xicon from "../assets/images/x.svg";
import NoNotifications from "./NoNotifications";
import axios from 'axios';
import useCurrentUser from '../utils/useCurrentUser';
import { useRef } from 'react';
import { io } from 'socket.io-client';

const NotificationBox = ({ toggleNotifications, setUnreadCount }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useCurrentUser();
  const socketRef = useRef(null);

  // useEffect(() => {
  //   if (!user?._id) return;
  
  //   const fetchNotifications = async () => {
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:5000/api/notifications/user/${user._id}`
  //       );
  //       const data = res.data;
  //       setNotifications(data);
  
  //     } catch (err) {
  //       console.error("Error fetching notifications:", err.response?.data || err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  
  //   fetchNotifications();
  // }, [user?._id]);

  useEffect(() => {
    if (!user?._id) return;
  
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/notifications/user/${user._id}`
        );
        const data = res.data;
        setNotifications(data);
        const unread = data.filter(n => !n.isRead).length;
        setUnreadCount(unread); // You'll need to pass this setter from MainLayout
      } catch (err) {
        console.error("Error fetching notifications:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchNotifications();
  }, [user?._id]);  

useEffect(() => {
  if (!user?._id) return;

  // 1. Connect to the socket server
  const socket = io("http://localhost:5000", {
    transports: ["websocket"],
  });

  // 2. Save the socket instance in a ref (to avoid reconnects)
  socketRef.current = socket;

  // 3. Register the user (join the room)
  socket.emit("register", user._id);

  // 4. Listen for new notifications
  socket.on("newNotification", (notification) => {
    setNotifications((prev) => [notification, ...prev]);
  });

  // 5. Clean up on unmount
  return () => {
    socket.disconnect();
  };
}, [user?._id]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notifications/delete/${id}`);
      setNotifications(notifications.filter(notification => notification._id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error.response?.data || error.message);
    }
  };

  const markNotificationAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/notifications/read/${id}`);
      setNotifications(prev =>
        prev.map(n => n._id === id ? { ...n, isRead: true } : n)
      );
    } catch (err) {
      console.error("Error marking notification as read:", err.response?.data || err.message);
    }
  };
  
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-25 font-montserral relative">
      <button
        className="absolute left-4 top-24 p-2 rounded-full flex items-center justify-center mt-7 mr-2 hover:bg-[#00000033]"
        onClick={() => {
          // Mark unread notifications as read before closing
          const unread = notifications.filter(n => !n.isRead);
          unread.forEach(n => markNotificationAsRead(n._id));
          setUnreadCount(0);
          toggleNotifications(); // Then close the box
        }} 
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
                  onClick={() => {handleDelete(notification._id)}}
                >
                  <img src={xicon} alt="delete icon" className="w-3 h-3 min-w-[12px] min-h-[12px]" />
                </button>
              </div>

              <span className="text-xs text-gray-500">{new Date(notification.createdAt).toLocaleString()}</span>
              <div className="flex flex-col items-end ">
                {/* Buttons Section */}
                <div className="space-x-2">
                {notification.type === "edit-request" && notification.status === "none" && (
                  <>
                    <button
                        onClick={() => handleDelete(notification._id)}
                        className="px-4 pt-1 pb-1 text-[#213824CC] text-base rounded-full shadow-sm hover:text-[#21382499] border border-[#213824CC] hover:border-[#21382499]">
                        Dismiss
                      </button>

                      <Link to={`/projects/${notification?.projectId}`}>
                        <button className="px-6 pt-1 pb-1 bg-[#213824CC] text-[#FFF8E3] text-base shadow-md rounded-full hover:bg-[#21382499]"
                        onClick={() => {
                          // Mark unread notifications as read before closing
                        const unread = notifications.filter(n => !n.isRead);
                        unread.forEach(n => markNotificationAsRead(n._id));
                        setUnreadCount(0);
                        toggleNotifications();}}>
                          Open project
                        </button>
                      </Link>
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
                        <button className="px-6 pt-1 pb-1 bg-[#213824CC] text-[#FFF8E3] text-base shadow-md rounded-full hover:bg-[#21382499]"
                         onClick={() => {
                          // Mark unread notifications as read before closing
                        const unread = notifications.filter(n => !n.isRead);
                        unread.forEach(n => markNotificationAsRead(n._id));
                        setUnreadCount(0);
                        toggleNotifications();}}>
                          Open project
                        </button>
                      </Link>
                    </>
                  )}

                  {notification.type === "edit-request" && notification.status === "accepted" && (
                    <>
                      <button
                        onClick={() => handleDelete(notification._id)}
                        className="px-4 pt-1 pb-1 text-[#213824CC] text-base rounded-full shadow-sm hover:text-[#21382499] border border-[#213824CC] hover:border-[#21382499]">
                        Dismiss
                      </button>

                    <Link to={`/projects/${notification?.projectId}/edit`}>
                      <button className="px-7 pt-1 pb-1 shadow-md bg-[#213824CC] text-[#FFF8E3] text-base rounded-full hover:bg-[#21382499]"
                       onClick={() => {
                        // Mark unread notifications as read before closing
                      const unread = notifications.filter(n => !n.isRead);
                      unread.forEach(n => markNotificationAsRead(n._id));
                      setUnreadCount(0);
                      toggleNotifications();}}>
                        Edit project
                      </button>
                    </Link>
                    </>
                  )}
                  {notification.type === "edit-request" && notification.status === "rejected" && (
                    <>
                      <button
                        onClick={() => handleDelete(notification._id)}
                        className="px-4 pt-1 pb-1 text-[#213824CC] text-base rounded-full shadow-sm hover:text-[#21382499] border border-[#213824CC] hover:border-[#21382499]">
                        Dismiss
                      </button>
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
                    <button className="px-6 pt-1 pb-1 shadow-md bg-[#213824CC] text-[#FFF8E3] text-base rounded-full hover:bg-[#21382499]"
                     onClick={() => {
                      // Mark unread notifications as read before closing
                      const unread = notifications.filter(n => !n.isRead);
                      unread.forEach(n => markNotificationAsRead(n._id));
                      setUnreadCount(0);
                      toggleNotifications();}}>
                      Open project
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
