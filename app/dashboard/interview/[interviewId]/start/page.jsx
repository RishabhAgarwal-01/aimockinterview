"use client";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';

function StartInterview({params}) {

const [interviewData, setInterviewData] = useState();
const[mockInterviewQuestion, setMockInterviewQuestion]= useState([]);
const [activeQuestionIndex, setActiveQuestionIndex]= useState(0);
// console.log(mockInterviewQuestion[activeQuestionIndex])
useEffect(()=>{
    GetInterviewDetails();
},[])

const GetInterviewDetails = async () => {
    const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));
    // console.log("Result:", result);
    const jsonMockResponse= JSON.parse(result[0].jsonMockResp)
    // console.log("jsonMockResponse",jsonMockResponse);
    setMockInterviewQuestion(jsonMockResponse.questions);
    setInterviewData(result[0]);
};
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            {/* Questions */}
            <QuestionsSection 
            mockInterviewQuestion= {mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            />
            {/* Video/Audio Recording */}
            <RecordAnswerSection/>
        </div>
    </div>
  )
}

export default StartInterview