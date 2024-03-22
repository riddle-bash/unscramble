export default function Navigation({ handleNext, disabled }) {
  return (
    <div className='flex items-center justify-end mx-4 border-t-2 pt-1 lg:pt-4 border-gray-200'>
      <button
        disabled={!disabled}
        onClick={handleNext}
        className='flex items-center bg-[#17a14a] hover:bg-green-700 text-white font-medium py-1 px-4 lg:py-4 lg:px-14 rounded-full'
      >
        <span>Next</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='ml-1 w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3'
          />
        </svg>
      </button>
    </div>
  )
}
