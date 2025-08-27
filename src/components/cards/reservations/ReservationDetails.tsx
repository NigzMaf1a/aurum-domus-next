import React from 'react';

//components
import DynamicDiv from '@/components/containers/DynamicDiv';
import RectangularImage from '@/components/images/RectangularImage';
import ButtonP1 from '@/components/buttonp/ButtonP1';
import LabelledP from '@/components/p/LabelledP';

//interface
import Reservation from '@/interfaces/reservation';
interface DetailProps{
    res:Reservation;
    callback:()=>void;
}

export default function ReservationDetails({res, callback}:DetailProps) {
  return (
    <DynamicDiv style={{width:'300px', height:'400px', backgroundColor:'#C9BE62'}}>
        <ButtonP1 text={"X"} callback={()=>callback} style={{marginRight:'10px'}}/>
        <DynamicDiv style={{width:'277px', height:'100px'}} className='mx-auto'>
            <RectangularImage src={res.Image} style={{width:'277px', height:'100px'}}/>
        </DynamicDiv>
        <DynamicDiv className='mx-auto ps-2 border'
                    style={{width:'277px', height:'220px'}}
        >
            <LabelledP label={"Unit Name:"} text={res.UnitID}/>
            <LabelledP label={"Table Name:"} text={res.TableID}/>
            <LabelledP label={"Dish Name:"} text={res.DishName}/>
            <LabelledP label={"Plates:"} text={res.Plates}/>
            <LabelledP label={"Order Price:"} text={res.OrderPrice}/>
            <LabelledP label={"Pay Status:"} text={res.PaymentStatus}/>
            <LabelledP label={"Res Date"} text={res.ReservationDate}/>
            <LabelledP label={"Res Time"} text={res.ReservationTime}/>
            <LabelledP label={"Res Status"} text={res.ReservationStatus}/>
        </DynamicDiv>
    </DynamicDiv>
  );
}