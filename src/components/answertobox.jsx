import { types } from './buttonstyle'

export default function AnswerToBox({
  charArray,
  originWord,
  handleFunction,
  isDisable = false,
}) {
  const insertStyle = (char, index) => {
    if (!isDisable) {
      return types.filter((t) => t.name === 'normal').map((t) => t.value)
    } else {
      if (char !== originWord[index]) {
        return types.filter((t) => t.name === 'incorrect').map((t) => t.value)
      } else {
        return types.filter((t) => t.name === 'correct').map((t) => t.value)
      }
    }
  }

  return (
    <div className='flex flex-wrap items-center justify-center'>
      {charArray.map((char, index) => (
        <button
          key={index}
          onClick={() => handleFunction(char, index)}
          disabled={isDisable}
          className={insertStyle(char, index)}
        >
          {char.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
