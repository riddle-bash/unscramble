import Link from 'next/link'

export default function Progression({ current = 1, totalProgress = 5 }) {
  const progress = (current / totalProgress) * 100
  return (
    <div className='flex'>
      <div className='w-11/12'>
        <p className='font-medium text-sm pb-1'>
          {current}/{totalProgress}
        </p>
        <div className='h-2 bg-gray-200 rounded-full overflow-hidden mr-4'>
          <div
            className='h-full bg-green-600'
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className=''>
        <Link href={`/`}>
          <button
            type='button'
            class='bg-white p-1 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 border-gray-200 border-2 rounded-xl'
          >
            <span class='sr-only'>Close menu</span>
            <svg
              class='h-6 w-6'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  )
}
