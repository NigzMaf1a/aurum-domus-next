"use client";
import React, {useState, useEffect, useMemo} from 'react';

//mock data
import { kenyanDishes } from '@/utilscripts/kenyanDishes';

//interfaces
import Dish from '@/interfaces/dish';

//components
import Skeleton from '@/components/containers/Skeleton';
import FleshVert from '@/components/containers/FleshVert';
import Ribz from '@/components/containers/Ribz';
import DynamicDiv from '@/components/containers/DynamicDiv';
import DynamicHead from '@/components/h/DynamicHead';
import DynamicButton from '@/components/buttons/DynamicButton';
import DynamicInput from '@/components/inputs/DynamicInput';
import NoteOne from '@/components/notes/NoteOne';
import DishItem from '@/components/cards/dishes/DishItem';

export default function Dishes() {
  const [searchPar, setSearchPar] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [dishes, setDishes] = useState<Dish[]>();
  useEffect(()=>{
    try{
      setLoading(true);
      setDishes(kenyanDishes);
    } catch(err){
      console.log(`Error ${err} occurred while fetching dishes`);
    } finally{
      setLoading(false);
    }
  }, []);
  const filteredDishes = useMemo(()=>{
    const searchLower = searchPar.toLowerCase().trim();

    if(!searchLower) return dishes;

    return dishes?.filter((dish)=>
      dish.DishName.toLowerCase().includes(searchLower) ||
      String(dish.DishPrice)?.toLowerCase().includes(searchLower) ||
      dish.DishDescription?.toLowerCase().includes(searchLower) ||
      dish.Available?.toLowerCase().includes(searchLower)
    );
  }, [searchPar, dishes]);
  return (
    <Skeleton>
        <h1 className="mb-4 textColorless">Dashboard</h1>
        <Ribz className='d-flex flex-row justify-content-between justify-content-center' style={{height:'100px', backgroundColor:'#25383C'}}>
          <DynamicDiv className='d-flex flex-column justify-content-center'>
              <DynamicHead text={"Add Dish"} className='text-center' style={{marginLeft:'20px'}}/>
          </DynamicDiv>
          <DynamicDiv className='d-flex flex-column justify-content-center' style={{width:'100px', height:'100px'}}>
              <DynamicButton label='Add'  style={{width:'50px', height:'30px', backgroundColor:'#AF7817'}}/>
          </DynamicDiv>
        </Ribz>
        <FleshVert className='h-auto mt-2 gap-2'>
          <DynamicInput value={searchPar}
                        onChange={setSearchPar}
                        placeholder='Search dishes: name, description, price, ....'
                        className='w-100'
          />
          <DynamicDiv className='w-100'
                      style={{height:'300px', backgroundColor:'#FFFFFF', overflowY:'scroll'}}
          >
            {filteredDishes?.length === 0? (<NoteOne text={"No dishes matched the search"}/>) :
              filteredDishes?.map((dish)=>
                <DishItem key={dish.DishID} dish={dish}/>
              )
            }
          </DynamicDiv>
        </FleshVert>
    </Skeleton>
  );
}