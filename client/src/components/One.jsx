import { Routes, Route ,Link } from "react-router-dom";

function One(props) {
  console.log(props)
  return (
    <div>

      <Link to={"/test"}></Link>
    <Routes>
    <Route path="/one/test"></Route>


    </Routes>
      
      
    </div>
  )
}

export default One