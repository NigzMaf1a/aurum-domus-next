import React, {useEffect, useState} from 'react';

//Components
import GlobalModal from '@/components/modals/GlobalModal';
import DynamicDiv from '@/components/containers/DynamicDiv';
import DynamicButton from '@/components/buttons/DynamicButton';
import DynamicDropdown from '@/components/dropdowns/DynamicDropdown';

//interfaces
import Table from '@/interfaces/table';

interface ReserveTableProps{
    tables:Table[];
    reserve:(tableID:number, table:Table)=>void;
}

//scripts
import {returnTableNames} from '@/scripts/utilz/customerTables';
import { returnTableID } from '@/scripts/utilz/customerTables';

export default function ReserveTable({tables, reserve}:ReserveTableProps) {
  const [names, setNames] = useState<string[]>([]);
  async function reserveTable(){
    await reserve();
  }
  useEffect(()=>{
    (()=>{
        if(tables){
            const tableNames:string[] = returnTableNames(tables);
            setNames(tableNames);
        }
    })();
  }, [tables]);
  return (
    <GlobalModal>
        <DynamicDiv>
            <DynamicDropdown values={names}/>
            <DynamicButton label={'Reserve'} onClick={}/>
        </DynamicDiv>
    </GlobalModal>
  )
}