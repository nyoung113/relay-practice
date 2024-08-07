import { graphql, useLazyLoadQuery } from 'react-relay'
import SearchSection from '../components/SearchSection'
import { SearchPageQuery } from '../__generated__/SearchPageQuery.graphql'
import { useSearchParams } from 'react-router-dom'

const Query = graphql`
    query SearchPageQuery($keyword: String!) {
        ...SuggestionResultList_fragment @arguments(suggestionKeyword: $keyword)
        ...SearchResult_fragment @arguments(keyword: $keyword)
    }
`

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const keyword = searchParams.get('keyword') ?? ''

    const data = useLazyLoadQuery<SearchPageQuery>(Query, {
        keyword,
    })

    return (
        <div className="flex flex-col items-center bg-[#377e7f] py-10">
            <SearchSection searchResultRef={data} suggestionResultRef={data} />
        </div>
    )
}

export default SearchPage
