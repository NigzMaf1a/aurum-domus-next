import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';

//interfaces
import User from '@/interfaces/user';

//components
import Ribz from '@/components/containers/Ribz';
import RoundedImage from '@/components/images/RoundedImage';
import DynamicDiv from '@/components/containers/DynamicDiv';
import LabelledP from '@/components/p/LabelledP';
import DynamicP from '@/components/p/DynamicP';
import UserDetails from './UserDetails';

interface UserCardProps{
    user:User;
}

export default function UserCard({user}:UserCardProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const {t} = useTranslation();
  function openModal(){
    setShowModal(true);
  }
  function closeModal(){
    setShowModal(false);
  }
  return (
    <>
        <Ribz style={{height:'70px', cursor:'pointer'}}
            className='justify-content-between align-items-center border'
            onClick={openModal}
        >
            <DynamicDiv className='d-flex flex-row gap-2 ms-2'>
                <RoundedImage src={user.UserImage}
                            style={{width:'50px', height:'50px'}}
                />
                <DynamicDiv className='d-flex flex-column align-items-center justify-content-between'>
                    <LabelledP label={`${t('fullName')}:`} text={`${user.Name1} ${user.Name2}`} style={{width:'200px'}}/>
                    <LabelledP label={`${t('regType')}:`} text={user.RegType} style={{width:'200px'}}/>
                </DynamicDiv>
            </DynamicDiv>
            <DynamicDiv style={{width:'50px', height:'30px', backgroundColor:'#347C2C'}}
                        className='d-flex flex-column justify-content-center align-items-center me-2'
            >
                <DynamicP text={user.accStatus} style={{fontSize:'11px', color:'#FFFFFF'}}/>
            </DynamicDiv>
        </Ribz>
        {showModal && <UserDetails user={user} callback={closeModal}/>}
    </>
  )
}

