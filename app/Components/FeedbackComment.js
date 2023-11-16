import React, { useState } from 'react'
import { Btn } from './Btns'
import PopUp from './PopUp'
import Avatar from './Avatar'

export default function FeedbackComment() {
  const [TxtComment, setTxtComment] = useState('')

  return (
    <>
      <div className='p-8'>
        <div className='flex gap-4 mb-4'>
          <Avatar/>
          <div>
          <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, itaque molestiae. Illum, quibusdam! Praesentium.</p>
          <div className="text-gray-400 text-sm mt-2" >Anonymous &middot;&middot;&middot; A few seconds ago</div>
        </div>
        </div>

        {/* <textarea name="" id="" cols="30" rows="3" */}
        <textarea name="" id="" className='w-full rounded-md border'
            value={TxtComment}
            onChange={(e) => setTxtComment(e.target.value)}
          />


        <div className='flex justify-end items-center py-2'>
          <Btn  >
            <div className='mx-2'>{'Attach Files ...'}</div>
          </Btn>

          <Btn Primary >
            <div className='mx-2'>Comment</div>
          </Btn>
        </div>

      </div>
    </>
  )
}
