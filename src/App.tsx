import { Provider } from "react-redux";
import { store } from "./configs/redux/store.ts";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home.tsx";
import Authenticate from "./pages/Authenticate.tsx";
import DisplayReport from "./pages/DisplayReport.tsx";

const Fallback = ({ error }: any) => (
  <div>
    <h2>Something went wrong:</h2>
    <pre>{error.message}</pre>
  </div>
);

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <Provider store={store}>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{ duration: 7500 }}
        />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:tab" element={<Home />} />
            <Route path="/reports/:date" element={<DisplayReport />} />
            <Route path="/authenticate" element={<Authenticate />} />
            <Route path="/authenticate/:action" element={<Authenticate />} />
          </Routes>
        </Router>
      </Provider>
    </ErrorBoundary>
  );
}
