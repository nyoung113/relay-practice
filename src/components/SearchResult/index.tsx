import React from 'react'
import { graphql, usePaginationFragment } from 'react-relay'

import { SearchResult_fragment$key } from '../../__generated__/SearchResult_fragment.graphql'
import SearchResultItem from './SearchResultItem'

const SEARCHRESULT_DEFAULT_SIZE = 10

const Fragment = graphql`
    fragment SearchResult_fragment on Query
    @argumentDefinitions(
        count: { type: "Int", defaultValue: 10 }
        keyword: { type: "String!" }
        cursor: { type: "String", defaultValue: "" }
    )
    @refetchable(queryName: "SearchResultPaginationQuery") {
        search(
            first: $count
            after: $cursor
            query: $keyword
            type: REPOSITORY
        ) @connection(key: "SearchSection_search") {
            edges {
                cursor
                node {
                    ... on Repository {
                        ...SearchResultItem_fragment
                    }
                }
            }
        }
    }
`

type Props = {
    fragmentRef: SearchResult_fragment$key
}

const SearchResult: React.FC<Props> = ({ fragmentRef }) => {
    const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment(
        Fragment,
        fragmentRef
    )

    const handleClickMoreButton = () => {
        loadNext(SEARCHRESULT_DEFAULT_SIZE)
    }

    return (
        <div>
            <ul className="flex flex-col w-full gap-2">
                {data.search.edges?.map(
                    (edge) =>
                        !!edge?.node && (
                            <SearchResultItem
                                key={edge?.cursor}
                                fragmentRef={edge?.node}
                            />
                        )
                )}
            </ul>
            <button
                className="w-full"
                disabled={!hasNext && !isLoadingNext}
                onClick={handleClickMoreButton}
            >
                {isLoadingNext ? '...loading' : ' ...more'}
            </button>
        </div>
    )
}

export default SearchResult
