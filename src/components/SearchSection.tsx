import { Suspense, useTransition } from 'react'
import SearchResult from './SearchResult'
import SearchBar from './SearchBar'
import { SearchResult_fragment$key } from '../__generated__/SearchResult_fragment.graphql'
import { graphql, usePaginationFragment } from 'react-relay'

const Fragment = graphql`
    fragment SearchResult_fragment on Query
    @refetchable(queryName: "SearchResultPaginationQuery") {
        search(
            first: $count
            after: $cursor
            query: $keyword
            type: REPOSITORY
        ) @connection(key: "SearchResultList_search") {
            pageInfo {
                startCursor
                endCursor
            }
            edges {
                cursor
                node {
                    ... on Repository {
                        primaryLanguage {
                            color
                            name
                        }
                        owner {
                            avatarUrl
                        }
                        nameWithOwner
                        description
                        url
                        pushedAt
                        stargazerCount
                    }
                }
            }
        }
    }
`

type Props = {
    fragmentRef: SearchResult_fragment$key
}

// https://ko.react.dev/reference/react/useTransition
const SearchSection: React.FC<Props> = ({ fragmentRef }) => {
    const { data, loadNext, hasNext, isLoadingNext, refetch } =
        usePaginationFragment(Fragment, fragmentRef)
    const [isPending, startTransition] = useTransition()

    const fetchKeyword = (keyword: string) => {
        startTransition(() => {
            refetch({ keyword })
        })
    }

    const handleClickMoreButton = () => {
        loadNext(10)
    }

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-2/3">
                <SearchBar isFetching={isPending} fetchKeyword={fetchKeyword} />
                <SearchResult data={data} />
                <button
                    className="w-full  my-4"
                    disabled={!hasNext && !isLoadingNext}
                    onClick={handleClickMoreButton}
                >
                    {isLoadingNext ? '...loading' : ' ...more'}
                </button>
            </div>
        </div>
    )
}

export default SearchSection
