import { Suspense } from 'react'

import { SuggestionResultList_fragment$key } from '../__generated__/SuggestionResultList_fragment.graphql'
import SearchBar from './SearchBar'
import SearchResult from './SearchResult'
import { useSearchParams } from 'react-router-dom'
import { SearchResult_fragment$key } from '../__generated__/SearchResult_fragment.graphql'

// nullable based
type Props = {
    searchResultRef: SearchResult_fragment$key
    suggestionResultRef: SuggestionResultList_fragment$key
}

// https://ko.react.dev/reference/react/useTransition
const SearchSection: React.FC<Props> = ({
    searchResultRef,
    suggestionResultRef,
}) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const keyword = searchParams.get('keyword')

    return (
        <div className="w-3/4 max-w-screen-sm flex flex-col items-center window">
            <div className="w-full title-bar">
                <p className="title-bar-text">Repository Search</p>
                <div className="title-bar-controls">
                    <button aria-label="Close" />
                </div>
            </div>
            <div className="w-2/3 window-body flex flex-col gap-6">
                <SearchBar data={suggestionResultRef} />
                <Suspense fallback="loading result...">
                    {!!keyword && (
                        <SearchResult fragmentRef={searchResultRef} />
                    )}
                </Suspense>
            </div>
        </div>
    )
}

export default SearchSection
