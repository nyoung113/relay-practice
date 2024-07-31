import { RelayEnvironmentProvider } from "react-relay/hooks";
import { RelayEnvironment } from "./RelayEnvironment";
import { Suspense } from "react";
import HomePage from "./components/HomePage";

const App = () => (
	<RelayEnvironmentProvider environment={RelayEnvironment}>
		<Suspense fallback={"Loading..."}>
			<HomePage />
		</Suspense>
	</RelayEnvironmentProvider>
);

export default App;
