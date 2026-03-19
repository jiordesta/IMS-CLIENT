import { Provider } from "react-redux";
import { store } from "./configs/redux/store.ts";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import { ErrorBoundary } from "react-error-boundary";

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
						<Route
							path="/authentication"
							element={<Authentication />}
						/>
						<Route
							path="/authentication/:action"
							element={<Authentication />}
						/>
					</Routes>
				</Router>
			</Provider>
		</ErrorBoundary>
	);
}
