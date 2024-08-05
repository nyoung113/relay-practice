import { graphql, useRefetchableFragment } from 'react-relay'
import { debounce } from '../utils'
import { SearchBar_fragment$key } from '../__generated__/SearchBar_fragment.graphql'
import { useRef, useState, useTransition } from 'react'

type Props = {
    fragmentRef: SearchBar_fragment$key
    isFetching: boolean
    fetchKeyword: (keyword: string) => void
}

const Fragment = graphql`
    fragment SearchBar_fragment on Query
    @refetchable(queryName: "SearchBarRefetchableQuery") {
        suggestion: search(
            first: 5
            query: $suggestionKeyword
            type: REPOSITORY
        ) {
            edges {
                # filter있나 찾아보기
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

// NOTE: controlled input | uncontrolled input 착각
const SearchBar: React.FC<Props> = ({
    fragmentRef,
    fetchKeyword,
    isFetching,
}) => {
    const [data, refetch] = useRefetchableFragment(Fragment, fragmentRef)
    const inputRef = useRef<HTMLInputElement>(null)
    const [isFocused, setIsFocused] = useState(false)
    const [isPending, startTransition] = useTransition()

    console.log(data)

    const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        startTransition(() => {
            refetch({ suggestionKeyword: e.target.value })
        })
    }, 500)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (inputRef.current) {
            fetchKeyword(inputRef.current.value)
        }
        inputRef.current?.blur()
    }

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
                <button className="h-4" type="submit">
                    {isFetching ? <div>loading...</div> : <div>search</div>}
                </button>
            </div>
            {isFocused ? (
                <div className="absolute window min-w-1/2">
                    {data.suggestion.edges?.map((edge) => (
                        <a href={edge?.node?.url}>
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
