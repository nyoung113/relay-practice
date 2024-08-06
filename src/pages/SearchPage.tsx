import { graphql, useLazyLoadQuery } from 'react-relay'
import SearchSection from '../components/SearchSection'
import { SearchPageQuery } from '../__generated__/SearchPageQuery.graphql'

const Query = graphql`
    query SearchPageQuery {
        ...SearchBar_fragment
        ...SearchSection_fragment
    }
`

const SearchPage = () => {
    const data = useLazyLoadQuery<SearchPageQuery>(Query, {})

    return (
        <div className="flex flex-col items-center bg-[#377e7f] py-10">
            <SearchSection
                searchSectionRef={data}
                searchBarFragmentRef={data}
            />
        </div>
    )
}

export default SearchPage
