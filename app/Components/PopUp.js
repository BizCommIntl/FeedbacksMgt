import React from 'react'

export default function PopUp({ Title = '', ShowWindow, SizeNarrow, children }) {
    // This fn will stop closing and opening of other windows 
    function onlyCloseThisWindow(e) {
        console.log('Order to CLOSE/EXIT is Rsvd');

        e.preventDefault()
        e.stopPropagation()

        ShowWindow(false)
    }

    function handleDialogBody(e) {
        console.log('Dialogue Section is hitted')

        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
        }

    return (
        <div className='fixed inset-0 bg-white md:bg-black md:bg-opacity-60 flex md:items-center'
            // onClick={() => ShowWindow(false)}
            onClick={onlyCloseThisWindow}
        >
           
            <div className="w-full  ">
                {/* X-button to Close */}
                {/* <button onClick={() => ShowWindow(false)} className='hidden md:block fixed top-5 right-5 text-white'> */}
                <button onClick={onlyCloseThisWindow} className='hidden md:block fixed top-5 right-5 text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>

                {/* Dialogue Section */}
                <div className={(SizeNarrow ? ' md:max-w-sm ' : ' md:max-w-2xl ') + " bg-white mx-auto rounded-lg overflow-hidden"}
                    // Stop escaping by click on other buttons
                    // onClick={(e) => {e.stopPropagation(); e.preventDefault()}}
                    onClick={(e) => {handleDialogBody(e)}}
                >
                    {/* <- Backbutton to Close */}
                    <div className='px-4 flex items-center '>
                        
                        {/* <button onClick={() => ShowWindow(false)} className="md:hidden"> */}
                        {/* <button onClick={onlyCloseThisWindow} className="md:hidden"> */}
                        <button onClick={(e)=>{onlyCloseThisWindow(e); console.log('This is Back button')}} className="md:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                        </button>

                        {Title && <h2 className='py-4 mx-auto border-b'>{Title}</h2>}
                    </div>

                    {children}
                </div>
            </div>
        </div>


    )
}
