import { SearchResult_fragment$data } from '../__generated__/SearchResult_fragment.graphql'

type Props = {
    data: SearchResult_fragment$data
}

const SearchResult: React.FC<Props> = ({ data }) => {
    return (
        <ul className="flex flex-col w-full">
            {data.search.edges &&
                data.search.edges.map((edge) => (
                    <li key={edge?.cursor} className="odd:bg-[#dfdfdf]">
                        <div>
                            <a href={edge?.node?.url} target="_blank">
                                {edge?.node?.nameWithOwner}
                            </a>
                        </div>
                        <div>{edge?.node?.description}</div>
                        <div>
                            <div>{edge?.node?.primaryLanguage?.name}</div>
                            <div>{edge?.node?.stargazerCount}</div>
                            <div>{edge?.node?.pushedAt}</div>
                        </div>
                    </li>
                ))}
        </ul>
    )
}

export default SearchResult
