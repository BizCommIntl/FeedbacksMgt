import { useEffect, useState } from 'react'
import axios from 'axios'

import { Btn } from './Btns'
import { BarLoader } from 'react-spinners';

import Image from 'next/image'
import PopUp from './PopUp'

const time = (new Date()).getHours() + ':' + (new Date()).getMinutes() + ':' + (new Date()).getSeconds()




export default function EntryFeedback({ ShowWindow, setHardRefresh }) {
  const [Post, setPost] = useState({ Title: 'Title-' + (new Date()).getHours() + ':' + (new Date()).getMinutes() + ':' + (new Date()).getSeconds(), Desc: 'Desc-' + (new Date()).getHours() + ':' + (new Date()).getMinutes() + ':' + (new Date()).getSeconds() })
  const [SelectedImgInURL, setSelectedImgInURL] = useState(null)
  const [SelectedImgFile, setSelectedImgFile] = useState(null)

  const [IsLoading, setIsLoading] = useState(false)

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


  const HandleBtnDelImg = () => {
    setSelectedImgInURL('')
    setSelectedImgFile(null)
  }

  const HandleOnChangeFileBrowser = async (e) => {

    // alert('setting file in Page')
    // const FilesList = e.target.files
    const Files = [...e.target.files]
    const data = new FormData()

    for (const file of Files) {
      data.append('file', file)
    }

    setSelectedImgInURL(URL.createObjectURL(Files[0]))
    setSelectedImgFile(Files[0])
  }

  const HandleBtnPostWithUpload = async (e) => {
    // e.preventDefault();

    setIsLoading(true)
    if (SelectedImgFile) {
      // alert('Uploading file at cloudinary')

      // router.push('/') ?????????????????????????????????????????????????????????????????????????

      //START.............. For Bulk Files .............................
      // // const FilesList = e.target.files
      // const Files = [...e.target.files]
      // const data = new FormData()
      // for (const file of Files) {
      //   data.append('file', file)
      // }
      // const res = await axios.post('/api/Upload', data)
      // console.log('Files Upload response: ', res)
      //END.............. For Bulk Files .............................

      const frmDat = new FormData()
      // frmDat.append('file', Files[0])
      frmDat.append('file', SelectedImgFile)
      frmDat.append('upload_preset', 'DemoApp')
      frmDat.append('cloud_name', 'dyu6r9geu')

      // const result = await axios.post('https://api.cloudinary.com/v1_1/dyu6r9geu/image/upload', frmDat)
      // console.log('****************** result: ', result)

      axios.post('https://api.cloudinary.com/v1_1/dyu6r9geu/image/upload', frmDat)
        .then(result => {
          console.log('Cloudinary RESPONSE RSVD: ', result)
          // ShowWindow(false)

          const DbRec = {
            Title: Post.Title,
            Desc: Post.Desc,
            public_id: result.data.public_id,
            secure_url: result.data.secure_url
          }

          axios.post('/api/Feedback', DbRec)
            .then(res => {
              console.log('Final MongoDB RESPONSE RSVD: ', res)

              setIsLoading(false)
              setHardRefresh(p=>!p)
              ShowWindow(false)
            });
        })
    }

    else     // SelectedImgFile - Image File Not Available 
    {
      const DbRec = {
        Title: Post.Title,
        Desc: Post.Desc,
        public_id: '',
        secure_url: ''
      }

      axios.post('/api/Feedback', DbRec)
        .then(res => {
          console.log('Final MongoDB Without ImageFile RESPONSE RSVD: ', res)

          setIsLoading(false)
          setHardRefresh(p=>!p)
          ShowWindow(false)
        });
    }

  };


  return (
    <PopUp ShowWindow={ShowWindow} Title="Welcome! Your Sugestion ">
      <div className='flex flex-col md:flex-row'>

        {/* Left Panel: ****************** Input Fields */}
        <div className='p-8 w-full md:w-3/5 '>
          <label className=' mb-1 block text-slate-700'>Suggestion:</label>
          <input type="text" className='border p-2 rounded-md w-full' placeholder='Suggestion Title'
            value={Post.Title}
            onChange={(e) => setPost({ ...Post, Title: e.target.value })} />

          <label className='mt-4 mb-1 block text-slate-700'>Suggestion Detail:</label>
          <textarea className='border p-2 rounded-md w-full' placeholder="Suggestion Detail here"
            value={Post.Desc}
            onChange={(e) => setPost({ ...Post, Desc: e.target.value })}
          />
        </div>

        {/* Right Panel: ****************** Image Section */}
        <div className='p-8 w-full md:w-2/5 '>
          <label className='cursor-pointer'>
            <span>Attach File (if any)</span>
            <input type="file" className="hidden" onChange={(e) => HandleOnChangeFileBrowser(e)} />
          </label>

          <div className='mt-4 border relative'>

            {!SelectedImgInURL ? '' :
              <button className='absolute -top-3 -right-3  p-1 bg-red-400 rounded-md'
                onClick={() => HandleBtnDelImg()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            }

            {/* <img src={window.location.origin + '/yourPathHere.jpg'} /> */}
            <Image src={SelectedImgInURL ? SelectedImgInURL : '/SiteImages/NoImage.jpg'}
              alt='img'
              height={0} width={0}
              //width="100%" height="100%" 
              layout="responsive"     //'fill'
              objectFit='cover'       //'contain'          
            />
          </div>
        </div>

      </div>

      <div className="flex gap-2 pr-8 pb-8  justify-end">
        {/* <Btn Primary onClick={(e) => HandleBtnCreatePost(e)} >Create Post</Btn> */}
        <Btn Primary onClick={(e) => HandleBtnPostWithUpload(e)} >
        {IsLoading ?
                        <div className=' mx-auto text-center'>
                            <BarLoader color="#36d7b7" />
                            Uploading on Cloud ...
                        </div>
                        : 'Create Post'}          
          </Btn>
      </div>

    </PopUp>
  )
}


