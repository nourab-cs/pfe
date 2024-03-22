import { useEffect, useState } from "react";
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
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden max-w-lg mx-auto mt-16">
      <div className="bg-gray-100 py-2 px-4">
        <h2 className="text-xl font-semibold text-gray-800">Users list</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {users.map((e, i) => {
          return (
            <li className="flex items-center py-4 px-6">
              <img
                className="w-12 h-12 rounded-full object-cover mr-4"
                src="https://randomuser.me/api/portraits/women/72.jpg"
                alt="User avatar"
              />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-800">
                  {e.username}
                </h3>
                <p className="text-gray-600 text-base">{e.email}</p>
              </div>
              {showModal && <Modal setOpenModal={setShowModal}  user={e} />}
              <button
                className="px-4 py-2 text-purple-100 bg-purple-600 rounded-md"
                type="button"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Edit{" "}
              </button>
            </li>
          );
        })}





      </ul>





    </div>
  );
}

export default AllUser;
