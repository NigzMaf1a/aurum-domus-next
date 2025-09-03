import React, {useState, useEffect} from 'react';

//class
import Admin from '@/scripts/classes/admin';

//components
import GlobalModal from '@/components/modals/GlobalModal';
import DynamicDiv from '@/components/containers/DynamicDiv';
import LabelledInput from '@/components/inputs/LabelledInput';
import DynamicButton from '@/components/buttons/DynamicButton';

//interfaces
import User from '@/interfaces/user';
interface EditUserProps{
    user:User;
    callback:()=>void;
}

export default function EditUser({user, callback}:EditUserProps) {
    const [name1, setName1] = useState<string>('');
    const [name2, setName2] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [currentAdmin, setCurrentAdmin] = useState<Admin>();

    useEffect(() => {
    const userString = localStorage.getItem('user');
    const admin: User | null = userString ? JSON.parse(userString) : null;

    console.log('Loaded admin:', admin);
    if(admin){
        const thisAdmin = new Admin(admin.RegID);
        setCurrentAdmin(thisAdmin);
    }
    }, []);

    async function editUser(id:number, user:User): Promise<void> {
        if (!currentAdmin?.updateUser) {
            console.error("updateUser method not found on currentAdmin");
            return;
        }

        if(!name1 || !name2 || !phone || !email){}

        try {
            await currentAdmin.updateUser(id, user);
            console.log("User updated successfully");
        } catch (err) {
            console.error("Failed to update user:", err);
        }
    }

  return (
    <GlobalModal>
        <DynamicDiv className='d-flex flex-column gap-2 px-2 py-2 border'
                    style={{
                                width:'300px', 
                                height:'400px', 
                                background: 'linear-gradient(45deg, #ffffff 0%, #f8f8f8 25%, #d4af37 75%, #fff8dc 100%)', 
                                overflowY:'auto'
                            }}
        >
            <LabelledInput label='First Name:'
                           value={name1}
                           onChange={setName1}
                           placeholder={user.Name1}
                           className='mt-4'
            />

            <LabelledInput label='Second Name:'
                           value={name2}
                           onChange={setName2}
                           placeholder={user.Name2}
            />

            <LabelledInput label='Phone:'
                           value={phone}
                           onChange={setPhone}
                           placeholder={String(user.PhoneNo)}
            />

            <LabelledInput label='Email:'
                           value={email}
                           onChange={setEmail}
                           placeholder={user.Email}
            />

            <DynamicDiv className='d-flex flex-row justify-content-between align-items- px-4'>
                <DynamicButton label='Close' 
                               onClick={callback}
                               style={{ height: '40px', width: '70px', border: '1px solid #ffc107', color:'#198754' }}

                />
                <DynamicButton label='Submit'
                               style={{ height: '40px', width: '70px', backgroundColor:'#198754', color:'#FFFFFF' }}
                               onClick={async () => {
                                    const updatedUser: User = {
                                    ...user,
                                    Name1: name1 || user.Name1,
                                    Name2: name2 || user.Name2,
                                    PhoneNo: phone || user.PhoneNo,
                                    Email: email || user.Email,
                                    };

                                    await editUser(user.RegID, updatedUser);
                                    callback(); 
                               }}
                />
            </DynamicDiv>
        </DynamicDiv>
    </GlobalModal>
  );
}