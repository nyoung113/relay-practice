import { Suspense } from 'react'

import SearchBar from './SearchBar'
import SearchResult from './SearchResult'
import { Link, useSearchParams } from 'react-router-dom'
// nullable based

const SearchSection = () => {
    const [searchParams, _] = useSearchParams()
    const keyword = searchParams.get('keyword') ?? ''

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
            <div className="w-2/3 window-body flex flex-col gap-6 min-h-24">
                <SearchBar />
                <Suspense fallback="loading result...">
                    {!!keyword && <SearchResult keyword={keyword} />}
                </Suspense>
            </div>
        </div>
    )
}

export default SearchSection
