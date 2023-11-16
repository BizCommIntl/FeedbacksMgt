import React, { useEffect } from 'react'
import { Btn } from './Btns'
import PopUp from './PopUp'
import FeedbackComment from './FeedbackComment'

export default function EntryFeedbackVoting({ ShowWindow, Itm }) {
  useEffect(() => {
    const keyDownHandler = event => {
      // console.log('User pressed: ', event.key);

      // if (event.key === 'Enter') {
      if (event.key === 'Escape') {
        event.preventDefault();

        // 👇️ your logic here
        ShowWindow(false)

      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);


  return (
    <>
      {/* <div onClick={()=>OpenFeedbackModal('Hello')}>Set to Hello</div> */}
      {/* {console.log('Itm: ', Itm)} */}

      <PopUp ShowWindow={ShowWindow} >
        <div className='p-8'>
          <div >
            <h2 className="text-lg font-bold mb-2">{Itm.Title}</h2>
            <p className="text-gray-600 text-sm">{Itm.Desc}</p>
          </div>

          <div className='flex justify-end items-center py-2 border-b'>

            <Btn Primary >
              <span className='my-auto mr-2 ml-2'
                style={{
                  width: '0', height: 0, borderStyle: 'solid',
                  borderWidth: '0 6px 12px 6px',
                  borderColor: 'transparent transparent #fff transparent'
                }}></span>

              <div className='mr-2'>Up Vote {Itm.Votes}</div>
            </Btn>

          </div>

          <div><FeedbackComment /></div>

        </div>
      </PopUp>
    </>
  )
}
