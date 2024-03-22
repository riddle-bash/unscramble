import { types } from './ButtonStyles'

export default function WordToBox({
  charArray,
  handleFunction,
  isDisable = false,
  buttonType = 1,
}) {
  const buttonStyle = types
    .filter((b) => b.id === buttonType)
    .map((b) => b.value)

  return (
    <div className='flex flex-wrap items-center justify-center'>
      {charArray.map((char, index) => (
        <button
          key={index}
          onClick={() => handleFunction(char, index)}
          disabled={isDisable}
          className={buttonStyle}
        >
          {char.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
