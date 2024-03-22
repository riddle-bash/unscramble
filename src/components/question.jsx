export default function Question({ progress = 1 }) {
  return (
    <div>
      <p className='text-md md:text-xl text-gray-400'>Question {progress}</p>
      <p className='text-xl md:text-3xl font-bold'>Word Unscramble</p>
    </div>
  )
}
