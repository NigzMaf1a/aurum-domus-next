import React from 'react';

//interface
import Table from '@/interfaces/table';

//components
import DynamicDiv from '@/components/containers/DynamicDiv';
import ButtonP1 from '@/components/buttonp/ButtonP1';
import RectangularImage from '@/components/images/RectangularImage';
import LabelledP from '@/components/p/LabelledP';

interface TableDetailProps{
    table:Table;
    callback:()=>void;
}

export default function CustomerTableDetails({table, callback}:TableDetailProps) {
  return (
    <DynamicDiv style={{width:"220px", height:"400px", backgroundColor:"#EDE275"}}>
        <ButtonP1 text={"X"} callback={callback} className='me-2'/>
        <DynamicDiv className='d-flex flex-column justify-content-center gap-2'>
            <RectangularImage src={table.TableImage}
                              className='mx-auto'
                              style={{width:'200px', height:'100px'}}
            />
            <DynamicDiv>
                <LabelledP label={"Table Name:"} text={table.TableName}/>
            </DynamicDiv>
        </DynamicDiv>
    </DynamicDiv>
  )
}

