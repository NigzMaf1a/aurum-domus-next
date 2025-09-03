import React, {useState} from 'react';

//components
import DynamicDiv from '@/components/containers/DynamicDiv';
import GlobalModal from '@/components/modals/GlobalModal';
import RectangularImage from '@/components/images/RectangularImage';
import DynamicButton from '@/components/buttons/DynamicButton';
import ButtonP1 from '@/components/buttonp/ButtonP1';
import LabelledP from '@/components/p/LabelledP';
import EditUser from './EditUser';

//interfaces
import User from '@/interfaces/user';
interface DetailProps{
    user:User;
    callback:()=>void;
}

export default function UserDetails({user, callback}:DetailProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  function openModal(){
    setShowModal(true);
  }
  function closeModal(){
    setShowModal(false);
  }
  return (
    <>
      <GlobalModal>
          <DynamicDiv className='d-flex flex-column border'
                      style={{width:'275px', height:'400px', backgroundColor:'#E18B6B'}}
          >
              <ButtonP1 text={"X"} callback={callback} className='me-2'/>
              <RectangularImage src={user.UserImage} 
                                style={{width:'250px', height:'100px'}}
                                className='mx-auto'
              />
              <DynamicDiv className='d-flex flex-column border mx-auto mt-2'
                          style={{width:'250px', height:'200px'}}
              >
                  <LabelledP label={'Full Name:'} text={`${user.Name1} ${user.Name2}`} className='mx-auto mt-2'/>
                  <LabelledP label={'Email:'} text={user.Email} className='mx-auto'/>
                  <LabelledP label={"Phone No:"} text={user.PhoneNo} className='mx-auto'/>
                  <LabelledP label={'Reg Type:'} text={user.RegType} className='mx-auto'/>
                  <LabelledP label={'Status:'} text={user.accStatus} className='mx-auto'/>
                  <LabelledP label={'Gender:'} text={user.Gender} className='mx-auto'/>
                  <DynamicButton label={'Edit'} 
                                 style={{width:'50px', height:'30px', backgroundColor:'#D4A017'}}
                                 className='d-flex flex-column align-items-center justify-content-center mx-auto border mt-2'
                                 onClick={openModal}
                  />
              </DynamicDiv>
          </DynamicDiv>
      </GlobalModal>
      {showModal && <EditUser user={user} callback={closeModal}/>}
    </>
  )
}