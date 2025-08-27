import React, {useState, useEffect} from 'react';

//scripts
import selectImage from '@/scripts/utilz/selectImage';
// import Owner from '@/scripts/classes/owner';

//interfaces
// import User from '@/interfaces/user';

//components
import DynamicDiv from '../containers/DynamicDiv';
import LabelledInput from '../inputs/LabelledInput';
import ButtonP1 from '../buttonp/ButtonP1';
import DynamicButton from '../buttons/DynamicButton';

interface HotelModalProps{
    func:()=>void;
}

export default function NewHotelModal({func}:HotelModalProps) {
    const [hotelName, setHotelName] = useState('');
    const [hotelEmail, setHotelEmail] = useState('');
    useEffect(()=>{
        // const user:User = localStorage.get('user');
        // const ownerID = user.RegID;
        // const owner = new Owner(ownerID);
    }, []);
  return (
    <DynamicDiv style={{width:'300px', height:'350px', backgroundColor:'#C9BE62'}}>
        <ButtonP1 text={"X"} callback={func} style={{marginRight:'10px'}}/>
        <DynamicDiv className='px-3'>
            <LabelledInput label='Hotel Name'
                        value={hotelName}
                        onChange={setHotelName}
            />
            <LabelledInput label='Hotel Email'
                        value={hotelEmail}
                        onChange={setHotelEmail}
            />
            <DynamicDiv className='d-flex flex-column justify-content-center align-items-center w-full cursor-pointer' 
                        style={{height:'40px', backgroundColor:'#348781'}}
                        onClick={selectImage}
            >
                Select Image
            </DynamicDiv>
            <DynamicDiv className='d-flex flex-column justify-content-center align-items-center w-full' style={{height:'40px', marginTop:'10px'}}>
                    <DynamicButton label='Add' style={{width:'50px', height:'30px', backgroundColor:'#387C44'}}/>
            </DynamicDiv>
        </DynamicDiv>
    </DynamicDiv>
  )
}

