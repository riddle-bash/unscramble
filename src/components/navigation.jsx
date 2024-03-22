export default function Navigation({
  handleNext,
  hanldeHint,
  disabled,
  hintLeft = 3,
}) {
  return (
    <div className='flex items-center justify-between mx-4 border-t-2 pt-1 lg:pt-4 border-gray-200'>
      <button
        disabled={hintLeft < 1 || disabled}
        onClick={hanldeHint}
        className='flex items-center bg-sky-500 hover:bg-sky-700 text-white font-medium py-1 px-4 lg:py-4 lg:px-12 rounded-full'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke='currentColor'
          class='w-6 h-6'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
          />
        </svg>
        <span>Hints: {hintLeft}</span>
      </button>
      <button
        disabled={!disabled}
        onClick={handleNext}
        className='flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-1 px-4 lg:py-4 lg:px-14 rounded-full'
      >
        <span>Next</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke='currentColor'
          class='ml-1 w-6 h-6'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            d='M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3'
          />
        </svg>
      </button>
    </div>
  )
}
