import React from 'react'
import { graphql } from 'relay-runtime'
import { useRefetchableFragment } from 'react-relay'
import { SuggestionResultList_fragment$key } from '../../__generated__/SuggestionResultList_fragment.graphql'
import SuggestionResultItem from './SuggestionResultItem'

const ListFragment = graphql`
    fragment SuggestionResultList_fragment on Query
    @argumentDefinitions(
        suggestionCount: { type: "Int", defaultValue: 5 }
        suggestionKeyword: { type: "String!" }
    )
    @refetchable(queryName: "SearchBarRefetchableQuery") {
        suggestion: search(
            first: $suggestionCount
            query: $suggestionKeyword #String!
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

type ListProps = {
    fragmentRef: SuggestionResultList_fragment$key
}

const SuggestionResultList: React.FC<ListProps> = ({ fragmentRef }) => {
    const [{ suggestion }, refetch] = useRefetchableFragment(
        ListFragment,
        fragmentRef
    )

    return (
        <div className="window min-w-1/2">
            <div>Press Enter to see the full results</div>
            {suggestion.edges?.map(
                (edge) =>
                    !!edge?.node && (
                        <SuggestionResultItem fragmentRef={edge?.node} />
                    )
            )}
        </div>
    )
}

export default SuggestionResultList
