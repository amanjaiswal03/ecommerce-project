import { useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Drawer from '@mui/material/Drawer';
import { FilterType } from '../App';


type Props = {
    handleFilterSubmit: (e: any, filter: FilterType) => void;
}


const Filter: React.FC<Props> = ({handleFilterSubmit}) => {
    const [filter, setFilter] = useState({
        min: 0,
        max: 99999,
        rating: 1,
    });
    const updateFilter = (e: any) => setFilter({
        ...filter,
        [e.target.name]: e.target.value
    })
    const [showFilter, setShowFilter] = useState(false);
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    window
    .matchMedia("(min-width: 768px)")
    .addEventListener('change', e => setMatches( e.matches ));
  },[])

    return(
    <div>
    {/* for mobile screen */}
    {!matches && (<Button onClick= {() => {setShowFilter(true)}}> Filter </Button>)}

    <Drawer anchor = 'bottom' open={showFilter} onClose={() => setShowFilter(false)} >
    <form onSubmit = {(e) => {handleFilterSubmit(e, filter)}
    }>
      <Grid container alignItems= "center" justifyContent="space-around" direction="column" spacing={4}>
        <Grid item>
          <TextField
              id="min-input"
              name="min"
              label="min"
              type="number"
              value= {filter.min}
              onChange={updateFilter}
            />
        </Grid>
        <Grid item>
          <TextField
              id="max-input"
              name="max"
              label="max"
              type="number"
              value= {filter.max}
              onChange={updateFilter}
            />
        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel>Rating</InputLabel>
            <Select
              name="rating"
              label= "Rating"
              defaultValue={1}
              value= {filter.rating}
              onChange={updateFilter}
            >
              <MenuItem key="1" value="1">
                1 or more
              </MenuItem>
              <MenuItem key="2" value="2">
                2 or more
              </MenuItem>
              <MenuItem key="3" value="3">
                3 or more
              </MenuItem>
              <MenuItem key="4" value="4">
                4 or more
              </MenuItem>
              <MenuItem key="5" value="5">
                5
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Button variant="contained" color="primary" type="submit"  >
          Apply filter
        </Button>
      </Grid>
      
    </form>
    </Drawer>

  {/* for desktop screen - filter */}
  {matches && (<form onSubmit = {(e) => {handleFilterSubmit(e, filter)
    }
    }>
      <Grid container alignItems= "center" justifyContent="space-around" direction="row" spacing={4}>
        <Grid item>
          <TextField
              id="min-input"
              name="min"
              label="min"
              type="number"
              value= {filter.min}
              onChange={updateFilter}
            />
        </Grid>
        <Grid item>
          <TextField
              id="max-input"
              name="max"
              label="max"
              type="number"
              value= {filter.max}
              onChange={updateFilter}
            />
        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel>Rating</InputLabel>
            <Select
              name="rating"
              label= "Rating"
              value= {filter.rating}
              onChange={updateFilter}
              autoWidth
            >
              <MenuItem key="1" value="1">
                1 or more
              </MenuItem>
              <MenuItem key="2" value="2">
                2 or more
              </MenuItem>
              <MenuItem key="3" value="3">
                3 or more
              </MenuItem>
              <MenuItem key="4" value="4">
                4 or more
              </MenuItem>
              <MenuItem key="5" value="5">
                5
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Button variant="outlined" color="primary" type="submit"  >
          Apply filter
        </Button>
      </Grid>
      
    </form>)}
</div>
)
};

export default Filter;