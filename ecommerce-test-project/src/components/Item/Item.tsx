import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Rating from '@mui/material/Rating';
import Button from '@material-ui/core/Button';

import {useState} from 'react';

import { CartItemType } from '../../App';

import { Wrapper } from './Item.styles';

type Props = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType, itemNumber: number) => void;
}



const Item: React.FC<Props> = ({ item, handleAddToCart}) => {
    const [itemNumber, setItemNumber] = useState(1);
    const [button, setButton] = useState({
        disabled: false,
        label: 'Add to cart'
    });

    const handleChange = (event: SelectChangeEvent) => {
        setItemNumber(event.target.value as unknown as number);
    };


    return(<Wrapper>
        <img src= {item.image.url} alt = {item.title} />
        <div>
            <h3> {item.title} </h3>
            <Rating name="half-rating-read" defaultValue={item.rating} precision={0.5} readOnly /> {item.rating}
            <h3>$ {item.price}</h3>
        </div>
        <Select onChange ={handleChange} value = {itemNumber as unknown as string}>
                <MenuItem value = {1}> 1 </MenuItem>
                <MenuItem value = {2}>2</MenuItem>
                <MenuItem value = {3}>3</MenuItem>
                <MenuItem value = {4}>4</MenuItem>
                <MenuItem value = {5}>5</MenuItem>    
        </Select>
        <Button 
        disabled = {button.disabled}
        onClick = {async () => {
                handleAddToCart(item, itemNumber);
                setButton({
                    disabled: true,
                    label: " ✅ Added "
                });


                await new Promise(f => setTimeout(f, 2000))

                setButton({
                    disabled: false,
                    label: "Add to cart"
                });
            }
        }>
        
        {button.label}
        </Button>
    </Wrapper>)
};

export default Item;