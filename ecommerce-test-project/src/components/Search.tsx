import { useState, useEffect} from 'react'
import TextField from "@material-ui/core/TextField";
import { SearchType } from '../App';

type Props = {
    handleSearchSubmit: (e: any, searchFilters: SearchType) => void;
}

const Search: React.FC<Props> = ({handleSearchSubmit}) => {
    function useSearchFilters() {
        const [searchFilters, _updateSearchFilter] = useState({
          name: ""
        });
    
        const updateSearchFilter = (name:any) => {
          _updateSearchFilter({
            name: name
          });
        };
    
        return {
          models: {searchFilters},
          operations: { updateSearchFilter }
        }
    };
    const { operations, models } = useSearchFilters();
    return(<form onSubmit={(e)=>
        {
          handleSearchSubmit(e, models.searchFilters)
        }}>
          <TextField
            label = "search"
            fullWidth
            type="string"
            onChange={(e) => {
              operations.updateSearchFilter(e.target.value);
            }} 
          />
    </form>)
}

export default Search;