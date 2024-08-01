
import { graphql } from "relay-runtime";
import { useFragment } from "react-relay";
import { SearchResult_fragment$key } from "../__generated__/SearchResult_fragment.graphql";

const Fragment = graphql`
fragment SearchResult_fragment on SearchResultItemConnection {
      userCount
      nodes {
        __typename
            ... on Repository {
        name
        archivedAt
        description
        isPrivate
      }
    }
}
`

type Props = {
    searchResult : SearchResult_fragment$key
}

const SearchResult : React.FC<Props> = ({searchResult}) => {
    const data = useFragment(Fragment, searchResult);
    console.log(data)
    return (
        <div />
    );
};

export default SearchResult;