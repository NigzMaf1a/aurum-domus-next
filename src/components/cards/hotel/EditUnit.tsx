import React, {useState} from 'react';
import DynamicDiv from '@/components/containers/DynamicDiv';
import LabelledInput from '@/components/inputs/LabelledInput';
import Unit from '@/interfaces/unit';

//interface
interface EditUnitProps{
    unit:Unit;
}

function EditUnit({props}:{props:EditUnitProps}) {
    const [unitName, setUnitName] = useState('');
    const [unitEmail, setUnitEmail] = useState('');
    const [unitPhone, setUnitPhone] = useState('');
    const [unitLocation, setUnitLocation] = useState('');
  return (
    <DynamicDiv>
        <LabelledInput label='Unit Name' 
                       value={unitName} 
                       onChange={setUnitName} 
                       placeholder={props.unit.UnitName}
                       type='text'
        />
        <LabelledInput label='Unit Email'
                       value={unitEmail}
                       onChange={setUnitEmail}
                       placeholder={props.unit.UnitEmail}
                       type='email'
        />
        <LabelledInput label='Unit Phone'
                       value={unitPhone}
                       onChange={setUnitPhone}
                       placeholder={props.unit.UnitEmail}
                       type='text'
        /> 
        <LabelledInput label='Unit Location'
                       value={unitLocation}
                       onChange={setUnitLocation}
                       placeholder={props.unit.UnitEmail}
                       type='text'
        />                
    </DynamicDiv>
  )
}

export default EditUnit