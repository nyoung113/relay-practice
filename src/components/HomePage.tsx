

import SearchBar from "./SearchBar";
import SearchSection from "./SearchSection";
import { Suspense, useState } from "react";


const HomePage = () => {
  const [keyword, setKeyword] = useState("");
	return (
		<div>
			<h1>Home Page</h1>
      <SearchBar setKeyword={setKeyword} keyword={keyword}/>
			{/* <Viewer viewer={viewer} /> */}
      <Suspense fallback="result loading..">
        <SearchSection keyword={keyword} />
      </Suspense>
		</div>
	);
};

export default HomePage;
