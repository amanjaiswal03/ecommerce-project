import { useState, useEffect} from 'react'
import {
  useQuery,
  gql
} from "@apollo/client";


//components
import Item from './components/Item/Item'
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
import Pagination from '@mui/material/Pagination';
import Filter from './components/Filter'
import Search from './components/Search'

//Styles
import { Wrapper, Header, Notification, Cards, Pages } from './App.styles';

//types
export type CartItemType = {
  id: number;
  image: {url: string};
  title: string;
  rating: number;
  price: number;
  amount: number;
}

export type FilterType = {
  min: number;
  max: number;
  rating: number;
}

export type SearchType = {
  name: string;
}

//queries
const PRODUCTS_QUERY = gql`query Product($limit: IntType, $searchInput: String!, $min: FloatType, $max: FloatType, $rating: FloatType, $skip: IntType ){
  allProducts(first: $limit, skip: $skip, filter: {title: {matches: {pattern: $searchInput}}, price: {gte: $min, lte: $max}, rating: {gte: $rating}}) {
    id
    image {
      url
    }
    title
    rating
    price
    amount
  }

  _allProductsMeta {
    count
  }
}`


function App() {

  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  // for screen-sizes
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  )
  const [products, setProducts] = useState([]);

  const {loading, error, data, refetch} = useQuery(PRODUCTS_QUERY, {
    variables: {
      limit: 6,
      skip: 0,
      searchInput: '',
      min: 0,
      max: 9999,
      rating: 1
    }
  })
  useEffect(() => {
    if(!error && !loading){
      setProducts(data?.allProducts)
    }
    window
    .matchMedia("(min-width: 768px)")
    .addEventListener('change', e => setMatches( e.matches ));
  },[error, loading, data])


  //handle functions
  const handleAddToCart = async (clickedItem: CartItemType, itemNumber: number) => {
    setTotalItems(totalItems + itemNumber);
    setTotalPrice(parseFloat((totalPrice + clickedItem.price * itemNumber).toFixed(2)));
    setShowAlert(true);
    await new Promise(f => setTimeout(f, 2000));
    setShowAlert(false);
  };

  const handleFilterSubmit = (e: any, filter: FilterType) => {
    e.preventDefault();
    refetch({
      min: filter.min,
      max: filter.max,
      rating: filter.rating
    })
  }

  const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    let skip = (value - 1) * 6;
    refetch({
      skip: skip
    })
  }

  const handleSearchSubmit = (e: any, searchFilters: SearchType) => {
    e.preventDefault()
          refetch({
            searchInput: searchFilters.name
          });
  }


  if (loading) return (<LinearProgress />);
  if (error) return (<div>Error</div>);


  return (
    <Wrapper>
      <Notification>
        <Collapse in={showAlert}>
          <Alert severity="success">Added to cart successfully</Alert>
        </Collapse>
      </Notification>
      <Header>
        <h2> Logo </h2>
        <Search handleSearchSubmit = {handleSearchSubmit}/>
        
        {/* desktop view of shopping basket button */}
        {matches && (<Button variant="contained">
          <Badge badgeContent={totalItems} color='error'>
            <AddShoppingCartIcon />
          </Badge>
          <p> Sub total: $ {totalPrice} </p>
        </Button>)}
      </Header>
      <Filter handleFilterSubmit = {handleFilterSubmit} />
      
        {/* Desktop view for product-list*/}
      {matches && (<Cards>
      <Grid container spacing = {3}>
        {products?.map((item: CartItemType) => (
          <Grid item key = {item.id} xs={6} sm= {4} >
            <Item item = {item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
      </Cards>)}

      {/* mobile view for product-list */}
      {!matches && <Grid container spacing = {3}>
        {products?.map((item: CartItemType) => (
          <Grid item key = {item.id} xs={6} sm= {4} >
            <Item item = {item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>}


      <Pages><Pagination shape="circular" count={Math.ceil(data._allProductsMeta.count / 6)} onChange={handlePagination} /></Pages>

      {/* mobile view for shopping basket button*/}
      {!matches && (<Button variant="contained" fullWidth>
          <Badge badgeContent={totalItems} color='error'>
            <AddShoppingCartIcon />
          </Badge>
          <p> Sub total: $ {totalPrice} </p>
        </Button>)}
    </Wrapper>
  );
}


export default App;
