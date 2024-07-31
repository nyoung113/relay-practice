import { RelayEnvironmentProvider } from "react-relay/hooks";
import { RelayEnvironment } from "./RelayEnvironment";

const App = () => (
	<RelayEnvironmentProvider environment={RelayEnvironment}>
		<div>Hello Relay</div>
	</RelayEnvironmentProvider>
);

export default App;
