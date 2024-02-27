import { useEffect, useState } from "react";
import Routes from "./Routes";
import './Styles_old/index.scss';
// import './Styles/index.css';
import { useDispatch } from "react-redux";
import axios from "axios";
import { getUser } from "./actions/user.actions";
import { UIdContext } from "./App.context";
import { getFolders } from "./actions/folder.actions";
import { getTags } from "./actions/tag.actions";
import { getProperties } from "./actions/property.actions";
import { ToastContextProvider } from "./Components/Utils/Toast/ToastContext";
import { getCategories } from "./actions/category.action";

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
      dispatch(getFolders());
      dispatch(getTags());
      dispatch(getProperties());
      dispatch(getCategories());
    }
  }, [UId, dispatch]);

  return (
    <UIdContext.Provider value={UId}>
      <ToastContextProvider>
        <div className="App">
          <Routes />
        </div>
      </ToastContextProvider>
    </UIdContext.Provider>
  );
}

export default App;
