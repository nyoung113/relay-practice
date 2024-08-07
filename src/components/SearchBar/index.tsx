import { Suspense, useRef, useState } from 'react'
import SuggestionResultList from './SuggestionResultList'
import { useSearchParams } from 'react-router-dom'

const SuggestionLoading = () => (
    <div className="window min-w-1/2">
        <div>loading suggestion...</div>
    </div>
)

const SearchBar = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [suggestionKeyword, setSuggestionKeyword] = useState(
        searchParams.get('keyword') ?? ''
    )
    const inputRef = useRef<HTMLInputElement>(null)
    const [isFocused, setIsFocused] = useState(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSearchParams({ keyword: suggestionKeyword })
        inputRef.current?.blur()
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSuggestionKeyword(e.target.value)
    }

    return (
        <div className="flex flex-col relative">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="suggestion"
                    className="w-full"
                    placeholder="Find treasure in the code sea!"
                    ref={inputRef}
                    value={suggestionKeyword}
                    onChange={handleChange}
                    onBlur={() => setIsFocused(false)}
                    onFocus={() => setIsFocused(true)}
                />
            </form>
            <div className="absolute top-[22px]">
                <Suspense fallback={<SuggestionLoading />}>
                    {!!suggestionKeyword && isFocused && (
                        <SuggestionResultList
                            suggestionKeyword={suggestionKeyword}
                        />
                    )}
                </Suspense>
            </div>
        </div>
    )
}

export default SearchBar
