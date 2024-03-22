export default function HelpBar({
  handleUndo,
  canUndo = false,
  isSubmitted = true,
  handleHint,
  hintObject = [
    { isAvailable: true },
    { isAvailable: true },
    { isAvailable: false },
  ],
  hintLeft,
}) {
  return (
    <div className='flex items-center'>
      <div className='flex items-center border-r-2 pr-1'>
        {canUndo && (
          <button
            disabled={isSubmitted}
            onClick={() => handleUndo()}
            className='bg-[#e3e3e3] hover:bg-gray-100 rounded-md p-1 mx-1'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='#cbcbcb'
              className='w-3 h-3 md:w-6 md:h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99'
              />
            </svg>
          </button>
        )}
        <p className='text-[#939393] mx-1 text-sm md:text-md'>Hints</p>
        <button
          disabled={isSubmitted || hintLeft < 1}
          onClick={handleHint}
          className='bg-[#e3e3e3] hover:bg-gray-100 rounded-md p-1 mx-1'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='white'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='#cbcbcb'
            className='w-3 h-3 md:w-6 md:h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z'
            />
          </svg>
        </button>
        {hintObject.map((hint, index) => (
          <button key={index} disabled={true} className='mx-1'>
            {hint.isAvailable ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='#cbcbcb'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='none'
                className='w-3 h-3 md:w-6 md:h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='white'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='#cbcbcb'
                className='w-3 h-3 md:w-6 md:h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
                />
              </svg>
            )}
          </button>
        ))}
      </div>

      <div className='flex items-center m-1 ml-2'>
        <button className='bg-[#e3e3e3] hover:bg-gray-100 rounded-md p-1 mx-1'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='white'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='#cbcbcb'
            className='w-3 h-3 md:w-6 md:h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z'
            />
          </svg>
        </button>
        <button className='bg-[#e3e3e3] hover:bg-gray-100 rounded-md p-1 mx-1'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='white'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='#cbcbcb'
            className='w-3 h-3 md:w-6 md:h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z'
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
