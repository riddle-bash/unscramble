import { types } from './buttonstyle'

export default function ScrambledToBox({
  objectArray,
  handleFunction,
  originWord,
  isSubmitted,
  handleCheckWord,
}) {
  let checkWord = true
  if (isSubmitted) {
    for (let i = 0; i < objectArray.length; i++) {
      if (objectArray[i].value !== originWord[i]) checkWord = false
    }
    handleCheckWord(checkWord)
  }

  const insertStyle = (isPicked, char, index) => {
    if (!isPicked) {
      return types.filter((t) => t.name === 'normal null').map((t) => t.value)
    } else {
      if (!isSubmitted) {
        return types.filter((t) => t.name === 'normal').map((t) => t.value)
      } else {
        if (checkWord) {
          return types
            .filter((t) => t.name === 'full correct')
            .map((t) => t.value)
        } else {
          if (char !== originWord[index])
            return types
              .filter((t) => t.name === 'incorrect')
              .map((t) => t.value)
          else
            return types.filter((t) => t.name === 'normal').map((t) => t.value)
        }
      }
    }
  }

  return (
    <div className='flex flex-wrap items-center justify-center'>
      {objectArray.map((object, index) => (
        <button
          key={index}
          onClick={() => handleFunction(object.value, index)}
          disabled={!object.isPicked}
          className={insertStyle(object.isPicked, object.value, index)}
        >
          {object.isPicked ? object.value.toUpperCase() : '?'}
        </button>
      ))}
      {isSubmitted && checkWord && (
        <button
          disabled={true}
          className='bg-white border-2 border-gray-100 text-green-700 rounded-full shadow-bottom p-1 m-0.5 md:p-2 md:m-1'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='3'
            stroke='currentColor'
            className='w-4 h-4 md:h-6 md:w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m4.5 12.75 6 6 9-13.5'
            />
          </svg>
        </button>
      )}
    </div>
  )
}
