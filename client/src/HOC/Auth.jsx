
import { useEffect } from "react";

function Auth(props) {

  useEffect(() => {

    console.log("hello from auth ")
  }, []);


  return <> {true? <div>{props.children}</div> : null}</>;
}

export default Auth;
