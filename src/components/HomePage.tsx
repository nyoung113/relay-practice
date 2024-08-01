
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "relay-runtime";
import type { HomePageQuery } from "../__generated__/HomePageQuery.graphql";
import Viewer from "./Viewer";
import SearchSection from "./SearchSection";
import { useState } from "react";

const Query = graphql`
  query HomePageQuery($keyword : String!){
      viewer {
    # ... => fragment
        ...Viewer_fragment
      }
      # enum type
      search (query: $keyword type: REPOSITORY) {
        ...SearchResult_fragment # 여기에 쓰면 generated 폴더에 생성됨
    }
  }
`;

const HomePage = () => {
  const [keyword, setKeyword] = useState("");
  // 변수는 위에서 관리? 
	const { viewer, search } = useLazyLoadQuery<HomePageQuery>(Query, {
    keyword
  });

	return (
		<div>
			<h1>Home Page</h1>
			<Viewer viewer={viewer} />
      <SearchSection keyword={keyword} setKeyword={setKeyword} searchResult={search} />
		</div>
	);
};

export default HomePage;
