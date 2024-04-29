import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../services/admin.services";
import Modal from "../layouts/Modal";

function AllUser() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        console.log(res);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const openModal = (user) => {
    setShowModal(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Users List</h1>
        <div className="grid grid-cols-1 gap-6">
          {users.map((user,i) => (
            <div
              key={user.email}
              className="bg-white shadow-md rounded-md overflow-hidden flex items-center justify-between px-4 py-3"
            >
              <div className="flex items-center">
                <img
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  src="https://randomuser.me/api/portraits/women/72.jpg"
                  alt="User avatar"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-900">{user.username}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  className="px-4 py-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-md hover:bg-gray-300"
                  type="button"
                  onClick={() => openModal(user)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-md hover:bg-gray-300"
                  type="button"
                >
                  View
                </button>
              </div>
              {showModal && <Modal setOpenModal={setShowModal} user={users[i]} />} {/* Assuming users[0] for testing */}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllUser;
