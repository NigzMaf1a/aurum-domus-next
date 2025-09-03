'use client';

import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

// sample data
import disTables from '@/utilscripts/tables';

//scripts
import thisUnit from '@/scripts/utilz/thisUnit';
import Customer from '@/scripts/classes/customer';

// interfaces, types
import Table from '@/interfaces/table';
import Unit from '@/interfaces/unit';

// components
import Skeleton from '@/components/containers/Skeleton';
import CustomerTables from '@/components/cards/tables/CustomerTables';
import DynamicInput from '@/components/inputs/DynamicInput';
import FleshVert from '@/components/containers/FleshVert';
import Ribz from '@/components/containers/Ribz';
import FleshHor from '@/components/containers/FleshHor';
import DynamicP from '@/components/p/DynamicP';
import DynamicDiv from '@/components/containers/DynamicDiv';
import DynamicHead from '@/components/h/DynamicHead';
import DynamicButton from '@/components/buttons/DynamicButton';
import User from '@/interfaces/user';

export default function CustomerTablesPage() {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchPar, setSearchPar] = useState('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [customer, setCustomer] = useState<Customer>();
  const {t} = useTranslation();

  function openModal(){
    setShowModal(true);
  }

  function closeModal(){
    setShowModal(false);
  }

  // Fetch tables on mount
  useEffect(() => {
    try {
      (async ()=>{
      const unitName = localStorage.getItem('unit');
      const userString = localStorage.getItem('user');
      const user:User = userString ? JSON.parse(userString) : null;

      const unit:Unit = thisUnit(unitName);
      if(user){
        const cust = new Customer(user.RegID);
        setCustomer(cust);
      }
      console.log(`Unit: ${unit}`);
      setTables(disTables);        
      })();
    } catch {
      setError('Failed to fetch hotel tables.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Memoized filtered tables
  const filteredTables = useMemo(() => {
    const searchLower = searchPar.toLowerCase().trim();
    if (!searchLower) return tables;

    return tables.filter((table) =>
      table.TableName.toLowerCase().includes(searchLower) ||
      String(table.TableCapacity).includes(searchLower) ||
      table.TableStatus.toLowerCase().includes(searchLower)
    );
  }, [tables, searchPar]);

  return (
    <Skeleton className="container py-5">
      <h2 className="text-center mb-4 textColorless">Available Hotel Tables</h2>
        <Ribz className='d-flex flex-row w-full justify-content-between justify-content-center' style={{height:'100px', backgroundColor:'#25383C'}}>
          <DynamicDiv className='d-flex flex-column justify-content-center w-100'>
            <DynamicHead text={"Add New User"} className='text-center' style={{marginLeft:'20px'}}/>
          </DynamicDiv>
          <DynamicDiv className='d-flex flex-column justify-content-center' style={{width:'100px', height:'100px'}}>
            <DynamicButton label={t('add')} 
                           onClick={openModal} 
                           style={{height:'30px', backgroundColor:'#AF7817'}}
                           className=''
            />
          </DynamicDiv>
        </Ribz>

      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status" />
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <FleshVert className="h-auto mt-2">
          <DynamicInput
            value={searchPar}
            onChange={setSearchPar}
            placeholder="Search tables by name, capacity, or status..."
            className="mb-3 col-12 col-sm-6 col-md-6 col-lg-12"
          />

          {filteredTables.length > 0 ? (
            <CustomerTables tables={filteredTables} />
          ) : (
            <FleshHor style={{height:'70px'}}
                      className='bg-light justify-content-center align-items-center'
            >
              <DynamicP text={"No tables match your search."}/>
            </FleshHor>
          )}
        </FleshVert>
      )}
    </Skeleton>
  );
}
