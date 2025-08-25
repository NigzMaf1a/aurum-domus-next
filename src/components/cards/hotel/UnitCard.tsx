import React, {useState} from 'react';
// import Image from 'next/image';
import UnitDetail, { DetailProps } from './UnitDetail';
import EditUnit from './EditUnit';
import DynamicDiv from '@/components/containers/DynamicDiv';
import RoundedImage from '@/components/images/RoundedImage';
import LabelledP from '@/components/p/LabelledP';

//interfaces
import Unit from '@/interfaces/unit';

interface UnitCardProps{
    unit:Unit;
}

function UnitCard({props}:{props:UnitCardProps}) {
    const [showModalOne, setShowModalOne] = useState(false);
    const [showModalTwo, setShowModalTwo] = useState(false);

  return (
    <DynamicDiv className='d-flex flex-row col-lg-12 py-2'>
        <RoundedImage src={props.unit.UnitImage} style={{width:'40px', height:'40px'}}/>
        <DynamicDiv style={{width:'100px'}} className='w-100'>
            <LabelledP label={"Unit Name"} text={props.unit.UnitName}/>
            <LabelledP label={"Location"} text={props.unit.UnitLocation}/>
        </DynamicDiv>
        {showModalOne && <DynamicDiv className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50">
                            <UnitDetail props={}/>
                         </DynamicDiv>
        }
        {showModalTwo && <DynamicDiv className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50">
                            <EditUnit/>
                         </DynamicDiv>
        }        
    </DynamicDiv>
  )
}

export default UnitCard