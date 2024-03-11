import { useEffect, useState } from "react";

function Profile() {
  const [test, setTest] = useState("");

  useEffect(() => {
    console.log("hello from profile ");
  }, [test]);
  return (
    <div>
      <input
        onChange={(e) => {
          setTest(e.target.value);
        }}
      ></input>
    </div>
  );
}

export default Profile;
