import { debounce } from '../utils'

type Props = {
    isFetching: boolean
    fetchKeyword: (keyword: string) => void
}

// NOTE: controlled input | uncontrolled input 착각
const SearchBar: React.FC<Props> = ({ fetchKeyword, isFetching }) => {
    const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        fetchKeyword(e.target.value)
    }, 500)

    return (
        <div className="flex">
            <input
                type="text"
                className="w-full mb-10"
                onChange={handleChange}
                placeholder="Find treasure in the code sea!"
            />
            <button className="h-4">
                {isFetching ? <div>loading...</div> : <div>search</div>}
            </button>
        </div>
    )
}

export default SearchBar
