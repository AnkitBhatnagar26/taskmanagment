import { Provider } from "react-redux";
import { store } from './store/redux/store'
import { NotificationContextProvider } from "./store/notification-context";
import { LoaderContextProvider } from './store/loader-context';
import { BrowserRouter } from 'react-router-dom';

// routes
import Router from "./routes";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <NotificationContextProvider>
            <LoaderContextProvider>
              <Router />
            </LoaderContextProvider>
          </NotificationContextProvider>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
