

import SearchResult from './SearchResult';
import { SearchResult_fragment$key } from "../__generated__/SearchResult_fragment.graphql";
import { Suspense } from 'react';
import SearchBar from './SearchBar';


type Props = {
  keyword : string,
  setKeyword : React.Dispatch<React.SetStateAction<string>>
  searchResult : SearchResult_fragment$key
}

const SearchSection : React.FC<Props> = ({keyword, setKeyword, searchResult}) => {
  return (
    <>
    <div>result for ${keyword}</div>
    <Suspense fallback="result loading..">
      <SearchBar setKeyword={setKeyword} keyword={keyword}/>
      <SearchResult searchResult={searchResult}/>
    </Suspense>
    </>
  );
};

export default SearchSection;