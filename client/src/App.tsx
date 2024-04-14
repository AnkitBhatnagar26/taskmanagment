import { NotificationContextProvider } from "./store/notification-context";
import { LoaderContextProvider } from './store/loader-context';
import { BrowserRouter } from 'react-router-dom';

// routes
import Router from "./routes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NotificationContextProvider>
          <LoaderContextProvider>
            <Router />
          </LoaderContextProvider>
        </NotificationContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
