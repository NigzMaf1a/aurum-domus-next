'use client';
import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

//components
import Skeleton from '@/components/containers/Skeleton';
import FleshVert from '@/components/containers/FleshVert';
import DynamicInput from '@/components/inputs/DynamicInput';
import Ribz from '@/components/containers/Ribz';
import FeedList from '@/components/cards/FeedList';
import NoteOne from '@/components/notes/NoteOne';

//scripts
import User from '@/interfaces/user';
import Admin from '@/scripts/classes/admin';
import Feedback from '@/interfaces/feedback';

export default function FeedbackPage() {
  const router = useRouter();
  const [loadedFeedback, setLoadedFeedback] = useState<Feedback[]>([]);
  const [searchPar, setSearchPar] = useState('');
  const {t} = useTranslation();


  useEffect(()=>{
  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user');
  const user: User | null = userString ? JSON.parse(userString) : null;


  // Redirect if token is missing
  if (!token) {
    router.push('/login');
    return;
  }
  (async ()=>{
    if(user){
        const admin = new Admin(user.RegID);
        const feedback = await admin.getFeedback();
        console.log(`Fetched feedback: ${feedback}`);
        setLoadedFeedback(feedback);
    }
  })();

  }, [router]);

  return (
    <Skeleton>
        <h1 className="mb-4 textColorless">F</h1>
        <DynamicInput value={searchPar} 
                      onChange={setSearchPar}
                      placeholder='Search.....'
                      className='col-12'
        />

        <FleshVert style={{}}
                   className='border px-2 py-2 mt-3'
        >
          <Ribz>
            {loadedFeedback.length > 0 && (
              loadedFeedback.map((feed)=> <FeedList key={feed.FeedbackID}
                                                    Email={feed.Email}
                                                    FeedbackDate={feed.FeedbackDate}
                                                    Comments={feed.Comments}
                                                    Response={feed.Response}
                                                    Rating={feed.Rating}
                                                    FeedbackID={feed.FeedbackID}
                                                    CustomerID={feed.CustomerID}
                                                    UnitID={feed.UnitID}
              />)
            )}
            {loadedFeedback.length === 0 && <NoteOne text={t('noFeedYet')}/>}
          </Ribz>
        </FleshVert>
    </Skeleton>
  )
}