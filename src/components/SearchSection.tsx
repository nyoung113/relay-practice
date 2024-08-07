import { Suspense } from 'react'

import SearchBar from './SearchBar'
import SearchResult from './SearchResult'
import { Link, useSearchParams } from 'react-router-dom'
import { graphql } from 'relay-runtime'
import { useLazyLoadQuery } from 'react-relay'
import { SearchSectionQuery } from '../__generated__/SearchSectionQuery.graphql'
// nullable based

const Query = graphql`
    query SearchSectionQuery($keyword: String!) {
        ...SearchResult_fragment @arguments(keyword: $keyword)
    }
`

const SearchSection = () => {
    const [searchParams, _] = useSearchParams()
    const keyword = searchParams.get('keyword') ?? ''

    const data = useLazyLoadQuery<SearchSectionQuery>(Query, {
        keyword,
    })

    return (
        <div className="w-3/4 max-w-screen-sm flex flex-col items-center window">
            <div className="w-full title-bar">
                <p className="title-bar-text">Repository Search</p>
                <div className="title-bar-controls">
                    <Link to="/">
                        <button type="button" aria-label="Close" />
                    </Link>
                </div>
            </div>
            <div className="w-2/3 window-body flex flex-col gap-6">
                <SearchBar />
                <Suspense fallback="loading result...">
                    {!!keyword && <SearchResult fragmentRef={data} />}
                </Suspense>
            </div>
        </div>
    )
}

export default SearchSection
