export default function Definition(word) {
  console.log(word)
  return (
    <div className='flex items-center justify-center'>
      <img
        className='w-32 h-32 rounded'
        src={word.word.url}
        alt={word.word.word}
      ></img>
      <p className='text-justify text-2xl ml-4'>🧾{word.word.def_en}</p>
    </div>
  )
}
