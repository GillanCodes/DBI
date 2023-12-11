import { useEffect, useState } from "react";
import Routes from "./Routes";
import './Styles/index.scss';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUser } from "./actions/user.actions";

function App() {

  const [UId, setUId] = useState(null);
  const dispatch:any = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
        await axios({
          method:"GET",
          withCredentials: true,
          url: `${process.env.REACT_APP_API_URL}/jwtid`
        }).then((res) => {
          setUId(res.data);
        })
    }
    fetchToken();
    if (UId)
    {
      dispatch(getUser(UId));
    }
  }, [UId, dispatch]);

  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
