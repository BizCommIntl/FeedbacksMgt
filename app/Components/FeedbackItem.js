import { useState } from "react"
import PopUp from "./PopUp"
import Image from "next/image"

export default function FeedbackItem({ Itm, OpenFeedbackVoting }) {
    const [IsLoggedIn, setIsLoggedIn] = useState(true)

    const [ShowLoggInPopup, setShowLoggInPopup] = useState(false)
    const [ShowLoggIn, setShowLoggIn] = useState(false)

    const HandleBtnVote = (e) => {
        console.log('Vote has been casted.');
        //  e.preventDefault()
        e.stopPropagation()
        // e.nativeEvent.stopImmediatePropagation()

        setIsLoggedIn(false)
        // setShowLoggInPopup(true)
        setShowLoggIn(true)
    }

    return (
        <>
            {/* <a href='' className=" flex gap-8 items-center" */}
            <div className=" flex gap-8 items-center"
                onClick={(e) => {
                    //  e.preventDefault(); 
                    OpenFeedbackVoting()
                }}
            >
                <div className=" flex-grow">
                    <h2 className="font-bold">{Itm.Title}</h2>
                    <div>
                        {Itm.secure_url &&
                            <Image src={Itm.secure_url}
                                alt='img'
                                height={0} width={0}
                                //width="100%" height="100%" 
                                layout="responsive"     //'fill'
                                objectFit='cover'       //'contain'          
                            />
                        }

                    </div>
                    <p className="text-gray-600 text-sm">{Itm.Desc}</p>
                </div>

                <div>
                    {ShowLoggInPopup &&
                        <PopUp SizeNarrow Title={"Confirm Your Vote "} ShowWindow={setShowLoggInPopup}>
                            <div className="p-8">login portion</div>
                        </PopUp>
                    }

                    {ShowLoggIn && (
                        <PopUp ShowWindow={setShowLoggIn}>
                            <div className="p-8">login portion e.nativeEvent.stopImmediatePropagation</div>
                        </PopUp>)
                    }

                    <button className=" border rounded-md shadow-sm shadow-gray-200 px-4 py-1 flex items-center gap-1 text-gray-600"
                        onClick={e => HandleBtnVote(e)}>
                        <span
                            style={{
                                width: '0', height: 0, borderStyle: 'solid',
                                borderWidth: '0 6px 12px 6px',
                                borderColor: 'transparent transparent #888 transparent'
                            }}>

                        </span>
                        {Itm.Votes || 0}
                    </button>
                </div>

            </div>
            {/* </a> */}
        </>
    )
}

