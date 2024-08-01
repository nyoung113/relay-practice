import SearchResult from './SearchResult';
import { graphql, useLazyLoadQuery } from 'react-relay';
import type { SearchSectionQuery } from "../__generated__/SearchSectionQuery.graphql";


type Props = {
  keyword : string,
}

const Query = graphql`
  query SearchSectionQuery($keyword : String!){
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

const SearchSection : React.FC<Props> = ({keyword}) => {

 const {search} = useLazyLoadQuery<SearchSectionQuery>(Query, {keyword});

  return (
    <>
    <div>result for ${keyword}</div>
        <SearchResult searchResult={search}/>
    </>
  );
};

export default SearchSection;