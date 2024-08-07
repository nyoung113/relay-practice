import {
    Suspense,
    useState,
    // useTransition,
} from 'react'
import SearchInput from './SearchInput'
import SuggestionResultList from './SuggestionResultList'
import { SuggestionResultList_fragment$key } from '../../__generated__/SuggestionResultList_fragment.graphql'
import { useSearchParams } from 'react-router-dom'

type Props = {
    data: SuggestionResultList_fragment$key
}
// colocation
// 리팩토링 요소 : 검색어 suggestion과 result 분리, query params

const SearchBar: React.FC<Props> = ({ data }) => {
    let [searchParams, setSearchParams] = useSearchParams()
    const [suggestionKeyword, setSuggestionKeyword] = useState(
        searchParams.get('keyword') ?? ''
    )

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSearchParams({ keyword: suggestionKeyword })
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSuggestionKeyword(e.target.value)
        // refetch 필요
    }

    return (
        <form className="relative" onSubmit={handleSubmit}>
            <div className="flex flex-col">
                <SearchInput
                    value={suggestionKeyword}
                    handleChange={handleChange}
                />
                <Suspense fallback={'loading search...'}>
                    {!!suggestionKeyword && (
                        <SuggestionResultList fragmentRef={data} />
                    )}
                </Suspense>
            </div>
        </form>
    )
}

export default SearchBar
