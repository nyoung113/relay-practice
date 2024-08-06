import { graphql, useRefetchableFragment } from 'react-relay'
import { debounce } from '../utils'
import { SearchBar_fragment$key } from '../__generated__/SearchBar_fragment.graphql'
import { useRef, useState, useTransition } from 'react'

type Props = {
    fragmentRef: SearchBar_fragment$key
    isFetching: boolean
    fetchKeyword: (keyword: string) => void
}
// colocation
// 리팩토링 요소 : 검색어 suggestion과 result 분리, query params

const Fragment = graphql`
    fragment SearchBar_fragment on Query
    @argumentDefinitions(
        suggestionCount: { type: "Int", defaultValue: 5 }
        suggestionKeyword: { type: "String", defaultValue: "" }
    )
    @refetchable(queryName: "SearchBarRefetchableQuery") {
        suggestion: search(
            first: $suggestionCount
            query: $suggestionKeyword #String!
            type: REPOSITORY
        ) {
            edges {
                cursor
                node {
                    ... on Repository {
                        nameWithOwner
                        url
                    }
                }
            }
        }
    }
`

const SearchBar: React.FC<Props> = ({
    fragmentRef,
    fetchKeyword,
    isFetching,
}) => {
    const [data, refetch] = useRefetchableFragment(Fragment, fragmentRef)
    const inputRef = useRef<HTMLInputElement>(null)
    const [isFocused, setIsFocused] = useState(false)
    const [isPending, startTransition] = useTransition()

    const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        startTransition(() => {
            refetch({ suggestionKeyword: e.target.value })
        })
    }, 300)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (inputRef.current) {
            fetchKeyword(inputRef.current.value)
        }
        inputRef.current?.blur()
    }

    const isDataLoading = isFetching || isPending

    return (
        <form className="relative" onSubmit={handleSubmit}>
            <div className="flex">
                <input
                    type="text"
                    name="suggestion"
                    className="w-full"
                    placeholder="Find treasure in the code sea!"
                    onChange={handleChange}
                    onBlur={() => setIsFocused(false)}
                    onFocus={() => setIsFocused(true)}
                    ref={inputRef}
                />
                <button className="h-4" type="submit" disabled={isDataLoading}>
                    {isDataLoading ? <div>loading...</div> : <div>search</div>}
                </button>
            </div>
            {isFocused ? (
                <div className="absolute window min-w-1/2">
                    <div>Press Enter to see the full results</div>
                    {data.suggestion.edges?.map((edge) => (
                        <a key={edge?.cursor} href={edge?.node?.url}>
                            <p className="truncate">
                                {edge?.node?.nameWithOwner}
                            </p>
                        </a>
                    ))}
                </div>
            ) : null}
        </form>
    )
}

export default SearchBar
