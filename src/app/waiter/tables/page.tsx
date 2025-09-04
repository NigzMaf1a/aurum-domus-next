"use client";
import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';

//components
import Skeleton from '@/components/containers/Skeleton';
import DynamicInput from '@/components/inputs/DynamicInput';
import MinorDetails from '@/components/containers/MinorDetails';
import NoteOne from '@/components/notes/NoteOne';
import FleshVert from '@/components/containers/FleshVert';
import DynamicDiv from '@/components/containers/DynamicDiv';
import DynamicP from '@/components/p/DynamicP';

//interfaces
import User from '@/interfaces/user';
import Table from '@/interfaces/table';

//classes
import Waiter from '@/scripts/classes/waiter';

export default function Tables() {
  const [waiter, setWaiter] = useState<Waiter>();
  const [tables, setTables] = useState<Table[]>();
  const [searchPar, setSearchPar] = useState('');
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    const user: User | null = userString ? JSON.parse(userString) : null;

    if (!token) {
      router.push("/login");
      return;
    }

    if (user) {
      const w = new Waiter(user.RegID);
      setWaiter(w);
    }
  }, [router]);

  useEffect(()=>{
    (async()=>{
      if(waiter){
        const allTables = await waiter.getTables(1);
        setTables(allTables || []);
      }
    })();
  }, [waiter]);

  console.log('Tables:', tables)

  return (
    <Skeleton>
        <h1 className="mb-4 textColorless">Dashboard</h1>
        <FleshVert className='gap-3'>
          <DynamicInput value={searchPar}
                        onChange={setSearchPar}
                        placeholder='Search tables:....'
                        type='text'
                        className='w-100 border'
          />
          <DynamicDiv style={{height:'400px', overflowY:'auto'}}
                      className='w-100 bg-white gap-2 px-2 py-2'
          >
            {tables && tables?.length > 0 ? (
              tables?.map((table) => <MinorDetails key={table.TableID}
                                                   src={table.TableImage}
                                                   label1='Table Name:'
                                                   label2='Capacity:'
                                                   text1={table.TableName}
                                                   text2={table.TableCapacity}
                                                   style={{cursor:'pointer', marginTop:'10px'}}
                                      >  
                                        <DynamicP text={table.TableStatus} style={{color:'#FFFFFF'}}/>
                                      </MinorDetails>
              )
            ) : (<NoteOne text={'No tables found'}/>)}
          </DynamicDiv>
        </FleshVert>
    </Skeleton>
  );
}

