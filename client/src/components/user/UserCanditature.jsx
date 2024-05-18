import { useEffect, useState } from "react";
import { axiosClient } from "../../services/axiosClient";
import { useUser } from "../../stores/userStore";

function UserCanditature() {
  const [data, setData] = useState([]);
  const [user] = useUser((state) => [state.user, state.setUser]);

  useEffect(() => {
    axiosClient
      .post(
        "/postuler/get-candidates-by-email",
        { email: user.email },
        { withCredentials: true }
      )
      .then((res) => {
        setData(res.data);
      });
  }, []);
  return <div>display candidate candiatures here </div>;
}

export default UserCanditature;
