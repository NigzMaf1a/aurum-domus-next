import React, {useState} from 'react';

//interface
import Reservation from '@/interfaces/reservation';

//components
import DynamicDiv from '@/components/containers/DynamicDiv';
import ReservationItem from './ReservationItem';
import DynamicInput from '@/components/inputs/DynamicInput';

export default function Reservations({reservations}:{reservations:Reservation[]}) {
  const [searchPar, setSearchPar] = useState('');
  return (
        <DynamicDiv style={{ height: '400px'}}
                    className='col-lg-12 col-md-6 col-sm-3 mt-3 gap-4'
        >
          <DynamicInput value={searchPar}
                        onChange={setSearchPar}
                        placeholder={"Search reservations"}
                        type='text'
                        className="col-md-6 col-lg-12 col-sm-3"
          />

          <DynamicDiv style={{ height: '300px', overflowY:'scroll', backgroundColor:'#FFF8C6'}} className='mt-3 rounded'>
            {reservations.map(res => (
                <DynamicDiv key={res.ReservationID} className="col-12 col-md-6 col-lg-12 gap-3">
                   <ReservationItem res={res}/>
                </DynamicDiv>
            ))}
            {reservations.length === 0 && (
              <p className="text-center text-muted w-100">No reservations found.</p>
            )}
          </DynamicDiv>
        </DynamicDiv>
  );
}
