import React, {useState, useEffect} from 'react';

//interfaces
import Table from '@/interfaces/table';

//components
import FleshVert from '../../containers/FleshVert';
import DynamicDiv from '../../containers/DynamicDiv';
import LabelledP from '../../p/LabelledP';
import RoundedImage from '../../images/RoundedImage';
import DynamicP from '../../p/DynamicP';
import GlobalModal from '@/components/modals/GlobalModal';
import CustomerTableDetails from './CustomerTableDetails';


interface CustomerTablesProps{
    tables:Table[];
}

export default function CustomerTables({ tables}: CustomerTablesProps) {
  const [showModal, setShowModal] =useState(false);
  
  function openModal(){
    setShowModal(true);
  }
  function closeModal(){
    setShowModal(false);
  }

  return (
    <>
    <FleshVert className='bg-light px-2'
               onClick={openModal}
               style={{overflowY:'scroll', height:'300px', cursor:'pointer'}}
    >
      {tables.map((table) => (
        <DynamicDiv key={table.TableID}
                    className='d-flex flex-row bg-light border'
                    style={{height:'100px', marginTop:''}}
        >
          <DynamicDiv className='d-flex flex-row justify-content-between align-items-center'>
            <DynamicDiv className='d-flex flex-row'>
              <RoundedImage src={table.TableImage}
                            style={{height:'50px', width:'50px'}}
              />
              <DynamicDiv className='ms-2'>
                <LabelledP label={"Table Name:"} text={table.TableName}/>
                <LabelledP label={"Capacity:"} text={table.TableCapacity}/>
              </DynamicDiv>
              {showModal && <GlobalModal>
                               <CustomerTableDetails table={table} callback={closeModal}/>
                            </GlobalModal>
              }
            </DynamicDiv>
            <DynamicDiv style={{width:'50px', height:'23px', marginLeft:'750px', backgroundColor:'#348017'}}
                        className='d-flex flex-column justify-content-center align-items-center'
            >
              <DynamicP text={"Reserve"} style={{fontSize:"12px"}} className='text-light'/>
            </DynamicDiv>
          </DynamicDiv>
        </DynamicDiv>
      ))}
    </FleshVert>
    </>
  );
}
