'use client';
import { useEffect, useState, useMemo } from 'react';

//mock data
import feedbackList from '@/utilscripts/feedbacklist';

//interfaces
import Feedback from '@/interfaces/feedback';

//components
import Skeleton from '@/components/containers/Skeleton';
import FleshVert from '@/components/containers/FleshVert';
import Ribz from '@/components/containers/Ribz';
import DynamicDiv from '@/components/containers/DynamicDiv';
import GlobalModal from '@/components/modals/GlobalModal';
import FeedList from '@/components/cards/FeedList';
import DynamicInput from '@/components/inputs/DynamicInput';
import DynamicHead from '@/components/h/DynamicHead';
import DynamicButton from '@/components/buttons/DynamicButton';
import AddFeed from '@/components/cards/AddFeed';
import NoteP from '@/components/loading/NoteP';
import LoadingAnimation from '@/components/loading/LoadingAnimation';


export default function CustomerFeedbackPage() {
  const [feed, setFeedbackList] = useState<Feedback[]>([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchPar, setSearchPar] = useState('');

  function displayForm(){
    setShowForm(true);
  }
  function closeForm(){
    setShowForm(false);
  }

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      setFeedbackList(feedbackList);
      console.log(`Feedback ${feed}`)
    } catch {
      console.error('Failed to fetch feedback');
    } finally {
      setLoading(false);
    }
  };

  const filteredFeedback = useMemo(()=>{
    const lowerSearchPar = searchPar.toLowerCase().trim();
    if(!lowerSearchPar) return feed;
    return feed.filter((f)=> f.Response?.toLowerCase().includes(lowerSearchPar) ||
                             f.Comments?.toLowerCase().includes(lowerSearchPar) ||
                             f.Email?.toLowerCase().includes(lowerSearchPar) ||
                             f.FeedbackDate?.toLowerCase().includes(lowerSearchPar)
    )
  }, [feed, searchPar]);

  const submitFeedback = async ({Email, Comments, Response, Rating}:Feedback) => {
    if (!newComment || newRating < 1) return alert('Please provide a comment and rating.');
    const newFeedback = {
      email: Email,
      comments: Comments,
      response: Response,
      rating: Rating,
      feedbackDate: new Date().toISOString().split('T')[0],
    };

    try {
      await axios.post('/api/feedback', newFeedback);
      setFeedbackList([newFeedback, ...feed]);
      setNewComment('');
      setNewRating(0);
    } catch {
      alert('Failed to submit feedback.');
    }
  };

  return (
    <Skeleton>
      <FleshVert>
          <h2 className="text-center mb-4 textColorless">Customer Feedback</h2>
          <Ribz className='d-flex flex-row justify-content-between justify-content-center' style={{height:'100px', backgroundColor:'#25383C'}}>
            <DynamicDiv className='d-flex flex-column justify-content-center'>
              <DynamicHead text={"Add Feedback"} className='text-center' style={{marginLeft:'20px'}}/>
            </DynamicDiv>
            <DynamicDiv className='d-flex flex-column justify-content-center' style={{width:'100px', height:'100px'}}>
              <DynamicButton label='Add' onClick={displayForm} style={{width:'50px', height:'30px', backgroundColor:'#AF7817'}}/>
            </DynamicDiv>
          </Ribz>

          <DynamicInput value={searchPar}
                        onChange={setSearchPar}
                        placeholder='Search feedback: Email, comments, response'
                        className='my-2'
          />
          <DynamicDiv
            className="mb-4 p-2 bg-light"
            style={{ maxHeight: '350px', overflowY: 'auto' }}
          >
            {loading ? (
              <LoadingAnimation/>
            ) : filteredFeedback.length === 0 ? (
              <NoteP text={'No feedback yet.'}/>
            ) : (
              filteredFeedback.map((fb) => (
                <FeedList key={fb.FeedbackID} 
                          Email={fb.Email} 
                          FeedbackDate={fb.FeedbackDate} 
                          Comments={fb.Comments} 
                          Response={fb.Response} 
                          Rating={fb.Rating}
                />
              ))
            )}
          </DynamicDiv>

          {/* Add Feedback Section */}
          {showForm && <GlobalModal>
                          <AddFeed callback1={closeForm} callback2={() => submitFeedback()} />
                       </GlobalModal>
          }
      </FleshVert>
    </Skeleton>
  );
}
