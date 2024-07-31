import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import type { Viewer_fragment$key } from "../__generated__/Viewer_fragment.graphql";

const Fragment = graphql`
  fragment Viewer_fragment on User {
    login
  }
`;

type props = {
	viewer: Viewer_fragment$key;
};

const Viewer = ({ viewer }: props) => {
	const data = useFragment(Fragment, viewer);
	console.log("data: ", data);

	return (
		<div>
			<h2>Viewer</h2>
			<div>Login: {data.login}</div>
		</div>
	);
};

export default Viewer;