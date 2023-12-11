import ReactDOM from 'react-dom/client';
import App from './App';
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from 'react-redux';

import thunk from "redux-thunk";

const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk))
)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

