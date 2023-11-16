"use client"

import react, { useEffect, useState } from 'react'
import axios from 'axios';

import { Btn } from '../Components/Btns';
import { BarLoader } from 'react-spinners';

import FeedbackItem from '../Components/FeedbackItem';
import EntryFeedback from '../Components/EntryFeedback';
import EntryFeedbackVoting from '../Components/EntryFeedbackVoting';


const AllRecsData = [
    {
        id: 1,
        Title: 'Please post more topics 1',
        Detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quidem nihil, quam molestiae dolores maxime exercitationem voluptatem accusamus veritatis sint temporibus similique molestias soluta tenetur officia ipsam voluptas minus veniam.',
        Votes: 80
    },
    {
        id: 2,
        Title: 'Please post more topics 2',
        Detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quidem nihil, quam molestiae dolores maxime exercitationem voluptatem accusamus veritatis sint temporibus similique molestias soluta tenetur officia ipsam voluptas minus veniam.',
        Votes: 84
    },
    {
        id: 3,
        Title: 'Please post more topics 3',
        Detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quidem nihil, quam molestiae dolores maxime exercitationem voluptatem accusamus veritatis sint temporibus similique molestias soluta tenetur officia ipsam voluptas minus veniam.',
        Votes: 63
    },
    {
        id: 4,
        Title: 'Please post more topics 4',
        Detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quidem nihil, quam molestiae dolores maxime exercitationem voluptatem accusamus veritatis sint temporibus similique molestias soluta tenetur officia ipsam voluptas minus veniam.',
        Votes: 75
    },
    {
        id: 5,
        Title: 'Please post more topics 5',
        Detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quidem nihil, quam molestiae dolores maxime exercitationem voluptatem accusamus veritatis sint temporibus similique molestias soluta tenetur officia ipsam voluptas minus veniam.',
        Votes: 91
    },
    {
        id: 6,
        Title: 'Please post more topics 6',
        Detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quidem nihil, quam molestiae dolores maxime exercitationem voluptatem accusamus veritatis sint temporibus similique molestias soluta tenetur officia ipsam voluptas minus veniam.',
        Votes: 78
    }
]

export default function HomePage() {
    const [ShowEntryFeedback, setShowEntryFeedback] = useState(false)
    const [ShowEntryFeedbackVoting, setShowEntryFeedbackVoting] = useState(null)

    const [AllRecs, setAllRecs] = useState([])

    const [IsLoading, setIsLoading] = useState(false)
    const [HardRefresh, setHardRefresh] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        axios.get('/api/Feedback').then(res => {
            console.log('Value of HardRefresh: ', HardRefresh);
            console.log('Data Rsvd from API: ', res.data);
            setAllRecs(res.data)

            setIsLoading(false)
        })
    }, [HardRefresh])

    function HandleBtnFeedbackMake() {
        setShowEntryFeedback(true)
    }

    function HandleBtnFeedbackVoting(itm) {
        setShowEntryFeedbackVoting(itm)
    }

    return (
        <>
            <main className='bg-white md:max-w-2xl mx-auto md:shadow-lg md:rounded-lg md:mt-8 overflow-hidden'>

                <div className="p-8 bg-gradient-to-r from-cyan-400 to-blue-400" >
                    <h1 className="font-bold text-xl">Coding with Mufakhar</h1>
                    <div className="text-opacity-90 text-slate-700">
                        Help me decide, what should I do in Next and React Mern Full Stack Development
                    </div>
                </div>

                <div className="px-8 py-4 flex border-b">
                    <div className='grow'>hi</div>

                    <Btn Primary onClick={() => HandleBtnFeedbackMake()}                >
                        Make A Feedback
                    </Btn>
                </div>


                <div className="px-8 py-4 flex flex-col gap-4">
                    {IsLoading ?
                        <div className=' mx-auto'>
                            <BarLoader color="#36d7b7" />
                            Data Loading...
                        </div>
                        : ''}
                   
                    {AllRecs.map((E, I) => (
                        // <FeedbackItem key={I} Itm={E} OpenEntryFeedbackVoting={() => setShowEntryFeedbackVoting(E)} />
                        <FeedbackItem key={I} Itm={E} OpenFeedbackVoting={() => HandleBtnFeedbackVoting(E)} />
                    ))
                    }
                </div>

                {ShowEntryFeedback && <EntryFeedback ShowWindow={setShowEntryFeedback} setHardRefresh={setHardRefresh}/>}
                {ShowEntryFeedbackVoting && <EntryFeedbackVoting ShowWindow={setShowEntryFeedbackVoting} Itm={ShowEntryFeedbackVoting} />}

            </main>


        </>)
}

