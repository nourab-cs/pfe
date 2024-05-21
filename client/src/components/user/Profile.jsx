import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useUser } from "../../stores/userStore";
import { axiosClient } from "../../services/axiosClient";

function Profile() {
  const [data, setData] = useState("");
  const [user, setUser] = useUser((state) => [state.user, state.setUser]);
  const [upDate, setUpDate] = useState(false);
  const [upload, setUpload] = useState(false);
  const [username, setUsername] = useState(user.username);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      setData(reader.result);
      console.log(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const updates = await axiosClient.put(
        "/user/update?id=" + user._id,
        {
          img: data,
          username,
        },
        { withCredentials: true }
      );
      setUser(updates.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {" "}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <button
              onClick={() => {
                setUpDate(!upDate);
              }}
              type="button"
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              {upDate ? "cancel" : "edit"}
            </button>

            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  {!upDate ? (
                    <img
                      className="h-12 w-12 text-gray-300"
                      aria-hidden="true"
                      src={user?.avatar?.url || "/logo.png"}
                      alt={"user name"}
                      style={{ borderRadius: "30%" }}
                    />
                  ) : (
                    <img
                      className="h-12 w-12 text-gray-300"
                      style={{ borderRadius: "30%" }}
                      width={200}
                      src={data || "/logo.png"}
                    ></img>
                  )}
                  {upDate && (
                    <input
                      onChange={handleFileInputChange}
                      placeholder="Change photo "
                      type="file"
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    />
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      disabled={!upDate}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      Value={user?.username}
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      Value={user?.email}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      disabled
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              {/* <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                About
              </label>
            
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div> */}
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          {upDate && (
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Mettre a jour
            </button>
          )}
        </div>
      </form>
    </>
  );
}
export default Profile;
