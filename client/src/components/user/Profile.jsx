import { useState } from "react";
import { useUser } from "../../stores/userStore";

import Sidebar from "../layouts/Sidebar";

function Profile() {
  const [data, setData] = useState("");
  const [user, setUser] = useUser((state) => [state.user, state.setUser]);
  const [upDate, setUpDate] = useState(false);
  const [upload, setUpload] = useState(false);




  return (
    <div>
      <section className="py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row -mx-4">
            <Sidebar />
            <main className="md:w-2/3 lg:w-3/4 px-4">
              <figure className="flex items-start sm:items-center">
                <div className="relative">
                  <img
                    className="w-16 h-16 rounded-full mr-4"
                    src={
                      user?.avatar?.url ||
                       "/avatar.jpg"
                    }
                    alt={"user name"}
                  />
                </div>

                <figcaption>
                  {/* <h5 className="font-semibold text-lg">Ghulam</h5> */}
                  <p>
                    <b>Email:</b> {user?.email}
                  </p>
                </figcaption>
              </figure>


              {/* <UserAddresses /> */}

              <hr className="my-4" />
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;