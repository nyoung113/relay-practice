import { useTransition } from 'react'
import SearchBar from './SearchBar'
import { SearchSection_fragment$key } from '../__generated__/SearchSection_fragment.graphql'
import { graphql, usePaginationFragment } from 'react-relay'
import { SearchBar_fragment$key } from '../__generated__/SearchBar_fragment.graphql'
import SearchResultItem from './SearchResultItem'

const SEARCHRESULT_DEFAULT_SIZE = 10

const Fragment = graphql`
    fragment SearchSection_fragment on Query
    @argumentDefinitions(
        count: { type: "Int", defaultValue: 10 } # 변수가 들어가지 않는다
        keyword: { type: "String", defaultValue: "" } # String! 이 아니다?
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
// nullable based

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
        usePaginationFragment(Fragment, searchSectionRef) // cursor-based pagination / offset/limit pagination
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
        <div className="w-3/4 max-w-screen-sm flex flex-col items-center window">
            <div className="w-full title-bar">
                <p className="title-bar-text">Repository Search</p>
                <div className="title-bar-controls">
                    <button aria-label="Close" />
                </div>
            </div>
            <div className="w-2/3 window-body flex flex-col gap-6">
                <SearchBar
                    isFetching={isPending}
                    fetchKeyword={fetchKeyword}
                    fragmentRef={searchBarFragmentRef}
                />
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
        </div>
    )
}

export default SearchSection
