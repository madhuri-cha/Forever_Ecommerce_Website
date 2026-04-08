import React from 'react'

const NewsLetterBox = () => {

const onSubmitHandler = (e) => {
    e.preventDefault();
}

  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>SubScribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'></p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio delectus pariatur quos vel, nobis amet quo maiores maxime. Vel iste vero dolorem, quis in consequatur tenetur illum magni repellendus laudantium?
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3' action="">
            <input className='' type="email" placeholder='Enter your email' required />
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>

        </form>
      
    </div>
  )
}

export default NewsLetterBox
