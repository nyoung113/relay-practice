import { graphql } from 'relay-runtime'
import { useLazyLoadQuery } from 'react-relay'
import SuggestionResultItem from './SuggestionResultItem'
import { SuggestionResultListQuery } from '../../__generated__/SuggestionResultListQuery.graphql'

const Query = graphql`
    query SuggestionResultListQuery(
        $suggestionCount: Int
        $suggestionKeyword: String!
    ) {
        search(
            first: $suggestionCount
            query: $suggestionKeyword
            type: REPOSITORY
        ) {
            edges {
                cursor
                node {
                    ... on Repository {
                        ...SuggestionResultItem_fragment
                    }
                }
            }
        }
    }
`

type Props = {
    suggestionKeyword: string
}

const SuggestionResultList: React.FC<Props> = ({ suggestionKeyword }) => {
    const { search } = useLazyLoadQuery<SuggestionResultListQuery>(Query, {
        suggestionCount: 5,
        suggestionKeyword,
    })

    return (
        <div className="window min-w-1/2">
            <div>Press Enter to see the full results</div>
            {search.edges?.map(
                (edge) =>
                    !!edge?.node && (
                        <SuggestionResultItem
                            key={edge.cursor}
                            fragmentRef={edge?.node}
                        />
                    )
            )}
        </div>
    )
}

export default SuggestionResultList
