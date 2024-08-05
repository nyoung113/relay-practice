import { useTransition } from 'react'
import SearchResult from './SearchResult'
import SearchBar from './SearchBar'
import { SearchSection_fragment$key } from '../__generated__/SearchSection_fragment.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { SEARCHRESULT_DEFAULT_SIZE } from '../constants'
import { SearchBar_fragment$key } from '../__generated__/SearchBar_fragment.graphql'

const Fragment = graphql`
    fragment SearchSection_fragment on Query
    @refetchable(queryName: "SearchResultPaginationQuery") {
        search(
            first: $count
            after: $cursor
            query: $keyword
            type: REPOSITORY
        ) @connection(key: "SearchSection_search") {
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
    searchSectionRef: SearchSection_fragment$key
    searchBarFragmentRef: SearchBar_fragment$key
}

// https://ko.react.dev/reference/react/useTransition
const SearchSection: React.FC<Props> = ({
    searchSectionRef,
    searchBarFragmentRef,
}) => {
    const { data, loadNext, hasNext, isLoadingNext, refetch } =
        usePaginationFragment(Fragment, searchSectionRef)
    const [isPending, startTransition] = useTransition()

    const fetchKeyword = (keyword: string) => {
        startTransition(() => {
            refetch({ keyword })
        })
    }

    const handleClickMoreButton = () => {
        loadNext(SEARCHRESULT_DEFAULT_SIZE)
    }

    return (
        <>
            <div className="w-3/4 flex flex-col items-center window">
                <div className="w-full title-bar">
                    <p className="title-bar-text">Repository Search</p>
                </div>
                <div className="w-2/3 window-body flex flex-col gap-6">
                    <SearchBar
                        isFetching={isPending}
                        fetchKeyword={fetchKeyword}
                        fragmentRef={searchBarFragmentRef}
                    />
                    <SearchResult data={data} />
                    <button
                        className="w-full"
                        disabled={!hasNext && !isLoadingNext}
                        onClick={handleClickMoreButton}
                    >
                        {isLoadingNext ? '...loading' : ' ...more'}
                    </button>
                </div>
            </div>
        </>
    )
}

export default SearchSection
