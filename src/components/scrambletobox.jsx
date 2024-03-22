import { types } from './buttonstyle'

export default function SrambledToBox({
  charArray,
  handleFunction,
  isDisable = false,
  buttonType = 1,
  originWord = '',
}) {
  const buttonStyle = types
    .filter((b) => b.id === buttonType)
    .map((b) => b.value)

  const originArray = originWord.split('')

  return (
    <div className='flex items-center justify-center'>
      {originArray.map((char, index) => (
        <button
          key={index}
          onClick={() => handleFunction(charArray[index], index)}
          disabled={isDisable || !charArray[index]}
          className={buttonStyle}
        >
          {charArray[index] ? charArray[index].toUpperCase() : ''}
        </button>
      ))}
    </div>
  )
}
