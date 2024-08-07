import React from 'react'

type Props = {
    value: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchInput: React.FC<Props> = ({ value, handleChange }) => {
    return (
        <input
            type="text"
            name="suggestion"
            className="w-full"
            placeholder="Find treasure in the code sea!"
            value={value}
            onChange={handleChange}
        />
    )
}

export default SearchInput
