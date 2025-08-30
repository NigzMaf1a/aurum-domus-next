'use client';
import React, {useState, useEffect, useMemo} from 'react';
import { useRouter } from 'next/navigation';

//scripts
import Admin from '@/scripts/classes/admin';

//interfaces
import User from '@/interfaces/user';

//components
import Skeleton from '@/components/containers/Skeleton';
import FleshVert from '@/components/containers/FleshVert';
import Ribz from '@/components/containers/Ribz';
import DynamicDiv from '@/components/containers/DynamicDiv';
import UserCard from '@/components/cards/admin/UserCard';
import NoteOne from '@/components/notes/NoteOne';
import RegisterUser from '@/components/forms/RegisterUser';
import GlobalModal from '@/components/modals/GlobalModal';
import DynamicHead from '@/components/h/DynamicHead';
import DynamicButton from '@/components/buttons/DynamicButton';
import DynamicInput from '@/components/inputs/DynamicInput';
import DynamicDropdown from '@/components/dropdowns/DynamicDropdown';

export default function Accounts() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchPar, setSearchPar] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [user] = useState<User>({UserImage:'/aurum1.jpg', Name1:'Nigel', Name2:'Khasiani', RegType:'Admin', accStatus:'Approved'});
  const [values] = useState<string[]>(['Admin','Customer', 'Accountant', 'Chef', 'Waiter', 'Manager', 'Owner', 'Supplier']);
  const router = useRouter();

  useEffect(()=>{
    try{
    (async ()=> {
      setLoading(true);
      const token = localStorage.getItem('token');
      const user:User = JSON.parse(localStorage.getItem('user') || 'null');
      if(!token || token === null) router.push('/login');
      const admin = new Admin(user.RegID);
      const allUsers:User[] = await admin.getUsers();
      setUsers(allUsers);
      console.log(`Users: ${users}`);
    })();
    } catch(err){
      console.error(`Error: ${err} occurred while fetching accounts`);
    } finally{
      setLoading(false);
    }
  }, [router, users]);

  const filterBaseType:User[] = useMemo(()=>{}, []);

  const filteredUsers: User[] = useMemo(() => {
    const searchLower = searchPar.toLowerCase().trim();
    if (!searchLower) return filterBaseType;

    return filterBaseType.filter((user) => 
      user.Gender?.toLowerCase().includes(searchLower) ||
      user.Name1?.toLowerCase().includes(searchLower) ||
      user.Name2?.toLowerCase().includes(searchLower) ||
      String(user.PhoneNo)?.toLowerCase().includes(searchLower) ||
      user.Email?.toLowerCase().includes(searchLower)
    );
  }, [searchPar, filterBaseType]);



  function openModal(){
    setShowModal(true)
  }
  function closeModal(){
    setShowModal(false)
  }
  return (
    <Skeleton>
      <FleshVert>
        <h1 className="mb-4 textColorless">Dashboard</h1>
        <Ribz className='d-flex flex-row justify-content-between justify-content-center' style={{height:'100px', backgroundColor:'#25383C'}}>
          <DynamicDiv className='d-flex flex-column justify-content-center'>
            <DynamicHead text={"Add New User"} className='text-center' style={{marginLeft:'20px'}}/>
          </DynamicDiv>
          <DynamicDiv className='d-flex flex-column justify-content-center' style={{width:'100px', height:'100px'}}>
            <DynamicButton label='Add' onClick={openModal} style={{width:'50px', height:'30px', backgroundColor:'#AF7817'}}/>
          </DynamicDiv>
        </Ribz>
        <DynamicDiv className='d-flex flex-row w-100'>
          <DynamicInput value={searchPar}
                        onChange={setSearchPar}
                        placeholder='Search users: name, type,...'
                        className='w-100 me-2'
                        type='text'
          />
          <DynamicDropdown values={values}
                           style={{width:'100px'}}
          />
        </DynamicDiv>

        <Ribz className='d-flex flex-row justify-content-between justify-content-center gap-2'>
          {loading? (<NoteOne text={"Loading"}/>) :(
            <FleshVert style={{backgroundColor:'#FFFFFF', maxHeight:'300px'}} className='px-2 py-2'>
              {/* {filteredUsers.length === 0? (<NoteOne text={"Sorry, no users matched your search query."}/>):
                filteredUsers.map(user => <UserCard key={user.RegID} user={user}/>)
              } */}
              <UserCard user={user}/>
              <UserCard user={user}/>
              <UserCard user={user}/>
            </FleshVert>
          )}
        </Ribz>
        { showModal && <GlobalModal>  
                          <RegisterUser callback={closeModal}/>        
                       </GlobalModal>
        }
      </FleshVert>
    </Skeleton>
  )
}