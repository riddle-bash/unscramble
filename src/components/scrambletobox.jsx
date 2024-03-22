import { types } from './buttonstyle'

export default function ScrambledToBox({ objectArray, handleFunction }) {
  const insertStyle = (isPicked) => {
    if (!isPicked) {
      return types.filter((t) => t.name === 'gray').map((t) => t.value)
    } else {
      return types.filter((t) => t.name === 'gray null').map((t) => t.value)
    }
  }

  return (
    <div className='flex flex-wrap items-center justify-center'>
      {objectArray.map((object, index) => (
        <button
          key={index}
          onClick={() => handleFunction(object.value, index)}
          disabled={object.isPicked}
          className={insertStyle(object.isPicked)}
        >
          {!object.isPicked && object.value.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
