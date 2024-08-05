import { SearchSection_fragment$data } from '../__generated__/SearchSection_fragment.graphql'

type Props = {
    data: SearchSection_fragment$data
}

const SearchResult: React.FC<Props> = ({ data }) => {
    return (
        <ul className="flex flex-col w-full gap-2">
            {data.search.edges &&
                data.search.edges.map((edge) => (
                    <li
                        key={edge?.cursor}
                        className="odd:bg-[#dfdfdf] window p-4"
                    >
                        <div className="">
                            <img
                                src={edge?.node?.owner?.avatarUrl}
                                className="w-10 h-10"
                            />
                            <a href={edge?.node?.url} target="_blank">
                                {edge?.node?.nameWithOwner}
                            </a>
                        </div>
                        <div>{edge?.node?.description}</div>
                        <div className="status-bar">
                            <div
                                className="status-bar-field"
                                style={{
                                    color:
                                        edge?.node?.primaryLanguage?.color ??
                                        'black',
                                }}
                            >
                                {edge?.node?.primaryLanguage?.name}
                            </div>
                            <div className="status-bar-field">
                                {edge?.node?.stargazerCount}
                            </div>
                            <div className="status-bar-field">
                                {edge?.node?.pushedAt}
                            </div>
                        </div>
                    </li>
                ))}
        </ul>
    )
}

export default SearchResult
