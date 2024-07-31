import { useLazyLoadQuery } from "react-relay";
import { graphql } from "relay-runtime";
import type { HomePageQuery } from "../__generated__/HomePageQuery.graphql";
import Viewer from "./Viewer";

const Query = graphql`
  query HomePageQuery {
    viewer {
	# ... => fragment
      ...Viewer_fragment
    }
  }
`;

const HomePage = () => {
	const { viewer } = useLazyLoadQuery<HomePageQuery>(Query, {});

	return (
		<div>
			<h1>Home Page</h1>

			<Viewer viewer={viewer} />
		</div>
	);
};

export default HomePage;
