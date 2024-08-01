type Props = {
    keyword : string,
    setKeyword : React.Dispatch<React.SetStateAction<string>>
  }

const SearchBar : React.FC<Props> = ({keyword, setKeyword}) => {

  return <input 
  className="border border-black"
  value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
};

export default SearchBar;