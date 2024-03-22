import { wordList } from '@/components/words'

export default function Inventory() {
  return (
    <div>
      {wordList
        .filter((e) => e.word === 'jellyfish')
        .map((e) => (
          <div>
            <img src={e.url}></img>
            <p>
              {e.word}: {e.def_en}
            </p>
          </div>
        ))}
    </div>
  )
}
