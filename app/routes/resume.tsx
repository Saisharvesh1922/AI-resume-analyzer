import React from 'react'
import {Link, useParams} from 'react-router';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { usePuterStore } from '~/lib/puter';
import Summary from '~/components/Summary';
import ATS from '~/components/ATS';
import Details from '~/components/Details';

const resume = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {auth, isLoading, fs, ai, kv} = usePuterStore();
    const [feedback, setFeedback] = useState<Feedback | null>(null);

    useEffect(() => {
    if(!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
  }, [isLoading])

    useEffect(() => {
        const loadresume = async () => {
            const resume = await kv.get(`resume:${id}`);
            if(!resume) return;
            const data = JSON.parse(resume);
            setFeedback(data.feedback);
        }
        loadresume();
    }, [id]);
    console.log(feedback);

  return (
    <main className='!pt-0'>
        <nav className='resume-nav'>
            <Link to="/" className="back-button">
            <img src="/icons/back.svg" alt="" />
                <span className='text-gray-800 text-sm font-semibold'>Back to homepage</span>
            </Link>
        </nav>
        <div className='flex flex-row w-full max-lg:flex-col-reverse'>
            <section className='p-8 animate-in fade-in duration-1000'>
                {feedback && <Summary feedback={feedback} />}
                {feedback && <ATS score={feedback?.ATS.score || 0} suggestions={feedback?.ATS.tips || []}></ATS>}
                {feedback && <Details feedback={feedback}></Details>}
            </section>
        </div>
    </main>
  )
}

export default resume


