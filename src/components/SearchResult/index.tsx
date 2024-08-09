import React from 'react'
import { graphql, useLazyLoadQuery, usePaginationFragment } from 'react-relay'
import SearchResultItem from './SearchResultItem'
import { SearchResultQuery } from '../../__generated__/SearchResultQuery.graphql'
import { SearchResult_fragment$key } from '../../__generated__/SearchResult_fragment.graphql'
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

type SearchResultListProps = {
    fragmentRef: SearchResult_fragment$key
}

const SearchResultList: React.FC<SearchResultListProps> = ({ fragmentRef }) => {
    const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment(
        Fragment,
        fragmentRef
    )

    const handleClickMoreButton = () => {
        loadNext(SEARCHRESULT_DEFAULT_SIZE)
    }

    return (
        <>
            <ul className="flex flex-col w-full gap-2 pb-4 min">
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
        </>
    )
}

const Query = graphql`
    query SearchResultQuery($keyword: String!) {
        ...SearchResult_fragment @arguments(keyword: $keyword)
    }
`

type Props = {
    keyword: string
}

const SearchResult: React.FC<Props> = ({ keyword }) => {
    const data = useLazyLoadQuery<SearchResultQuery>(Query, {
        keyword,
    })

    return <SearchResultList fragmentRef={data} />
}

export default SearchResult
