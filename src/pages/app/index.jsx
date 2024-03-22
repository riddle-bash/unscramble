import { wordList } from '@/components/words'
import Question from '@/components/question'
import Progression from '@/components/progressbar'
import Navigation from '@/components/navigation'
import { useState, useEffect } from 'react'
import WordToBox from '@/components/wordtobox'
import AnswerToBox from '@/components/answertobox'
import Modal from '@/components/wordmodal'
import ObjectToBox from '@/components/objecttobox'
import MessageModal from '@/components/messagemodal'

export default function App() {
  /* DECLARE STATE */
  const [originWord, setOriginWord] = useState('')
  const [scrambledWord, setScrambledWord] = useState([])
  const [object, setObject] = useState([])
  const [chosenWord, setChosenWord] = useState([])
  const [revealedWord, setRevealedWord] = useState([])
  const [hintLeft, setHintLeft] = useState(3)
  const [progress, setProgress] = useState(1)
  const [isSubmitted, setSubmitted] = useState(false)
  const [isOpenModal, setOpenModal] = useState(false)
  const [isOpenMessage, setOpenMessage] = useState(false)

  /* Call useEffect */
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
    // Add dependencies for useEffect
  }, [originWord, scrambledWord])

  // New game whenever components mount
  useEffect(() => {
    startNewGame()
  }, [])

  /* Todo: Check if re-render work */
  let immuScramWord = object.filter((o) => !o.isPicked).map((o) => o.value)
  let immuIsSubmitted = false

  // Handle keydown
  const handleKeyDown = (event) => {
    let key = event.key
    // Handle if player type the right letter
    if (immuScramWord.includes(key)) {
      let keyIndex = 0
      let objectIndex = 0

      for (let i = 0; i < immuScramWord.length; i++) {
        if (immuScramWord[i] === key) keyIndex = i
      }

      // Remove the typed letter
      immuScramWord = [
        ...immuScramWord.slice(0, keyIndex),
        ...immuScramWord.slice(keyIndex + 1),
      ]

      setChosenWord((chosenWord) => [...chosenWord, key])
      setScrambledWord(immuScramWord)

      let tmpObject = object
      for (let i = 0; i < tmpObject.length; i++) {
        if (tmpObject[i].value === key && !tmpObject[i].isPicked)
          objectIndex = i
      }
      tmpObject[objectIndex].isPicked = true
      tmpObject[objectIndex].pickedPosition = chosenWord.length
      setObject(tmpObject)
    }
    // Handle if player try to next
    if (key === 'Enter' && immuScramWord.length === 0) {
      if (!immuIsSubmitted) {
        handleNext()
        immuIsSubmitted = true
      } else {
        startNewGame()
        setProgress(progress < wordList.length ? progress + 1 : 1)
      }
    }
    // Handle if player undo answer
    if (
      (key === 'Escape' || key === 'Backspace') &&
      !immuIsSubmitted &&
      chosenWord.length !== 0
    ) {
      handleUnpick(chosenWord[chosenWord.length - 1], chosenWord.length - 1)
    }
  }

  /* GAME CONSTRUCTING FUNCTIONS */
  const startNewGame = () => {
    startNewScramble()
    setChosenWord([])
    setRevealedWord([])
    setHintLeft(3)
    setSubmitted(false)
  }

  const startNewScramble = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length)
    let words = wordList.map((w) => w.word)
    setOriginWord(words[randomIndex])
    setScrambledWord(doScramble(words[randomIndex]))
    setObject(doScrambleObject(words[randomIndex]))
  }

  const doScrambleObject = (input) => {
    const shuffle = input.split('').sort(() => Math.random() - 0.5)
    let array = []
    for (let i = 0; i < shuffle.length; i++) {
      array.push({
        value: shuffle[i],
        isPicked: false,
        pickedPosition: -1,
      })
    }
    return array
  }

  const doScramble = (input) => {
    const shuffle = input.split('').sort(() => Math.random() - 0.5)
    return shuffle
  }

  /* HANDLER FUNCTIONS */
  const handlePick = (char, index) => {
    setChosenWord([...chosenWord, char])
    setScrambledWord(scrambledWord.filter((c, i) => i !== index))
    let tmpObject = object
    tmpObject[index].isPicked = true
    setObject(tmpObject)
  }

  const handleUnpick = (char, index) => {
    let tmpObject = object
    let objectIndex = 0
    for (let i = 0; i < tmpObject.length; i++) {
      if (tmpObject[i].pickedPosition === chosenWord.length - 1) objectIndex = i
    }
    tmpObject[objectIndex].isPicked = false
    tmpObject[objectIndex].pickedPosition = -1
    setObject(tmpObject)
    setScrambledWord([...scrambledWord, char])
    setChosenWord(chosenWord.filter((c, i) => i !== index))
    immuScramWord = scrambledWord
  }

  const handleNext = () => {
    if (isSubmitted) {
      startNewGame()
      setProgress(progress + 1)
    } else {
      setSubmitted(true)
      setRevealedWord(originWord.split(''))
    }
  }

  const handleHint = () => {
    setHintLeft(hintLeft - 1)
    let index = chosenWord.length
    if (immuScramWord.includes(originWord[index])) {
      setChosenWord([...chosenWord, originWord[index]])
      let indexScramble = -1
      for (let i = 0; i < scrambledWord.length; i++) {
        if (scrambledWord[i] === originWord[index]) indexScramble = i
      }
      setScrambledWord(scrambledWord.filter((char, i) => i !== indexScramble))
      immuScramWord = scrambledWord
      let tmpObject = object
      let objectIndex = 0
      for (let i = 0; i < tmpObject.length; i++) {
        if (tmpObject[i].value === originWord[index] && !tmpObject[i].isPicked)
          objectIndex = i
      }
      tmpObject[objectIndex].isPicked = true
      tmpObject[objectIndex].pickedPosition = chosenWord.length
      setObject(tmpObject)
    } else setOpenMessage(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }
  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseMessage = () => {
    setOpenMessage(false)
  }

  /* WORD'S VARIABLES */
  const wSrc = wordList.filter((w) => w.word === originWord).map((m) => m.url)
  const wDefEn = wordList
    .filter((w) => w.word === originWord)
    .map((m) => m.def_en)
  const wDefVi = wordList
    .filter((w) => w.word === originWord)
    .map((m) => m.def_vi)
  const wClassEn = wordList
    .filter((w) => w.word === originWord)
    .map((m) => m.class_en)
  const checkLength = chosenWord.length === originWord.length

  /* TEST */
  // console.log(scrambledWord, originWordObject, originWord)
  // console.log(wSrc)
  // console.log(scrambledWord)
  // console.log(chosenWord)
  // console.log(revealedWord)

  return (
    // Root div
    <div className='relative bg-white w-full 2xl:w-7/12 mx-auto min-h-screen items-center justify-center'>
      {/* Header */}
      <div className='absolute top-2 right-0 left-0 px-8 items-center justify-center'>
        <Progression current={progress} totalProgress={wordList.length} />
      </div>

      {/* Body */}
      <div className='absolute top-12 lg:top-14 bottom-20 md:left-24 md:right-24 items-center justify-center'>
        {/* Question */}
        <div className='relative ml-10 pl-100 md:pt-12 lg:pb-8 lg:ml-32'>
          <Question progress={progress} />
        </div>

        {/* Definition */}
        <div className='relative py-6 px-12 bg-gray-100 rounded-2xl border border-gray-200'>
          {/* Todo: Seperate Class */}
          <div className='md:flex md:items-start relative'>
            <img className='w-24 h-24 rounded-xl' src={wSrc} alt={wSrc}></img>
            <div className='ml-3'>
              <p className='text-left text-xl md:ml-4'>
                <span>{wDefEn}</span>
              </p>
              <p className='text-left text-gray-500 text-md md:ml-4'>
                {wDefVi}
              </p>
            </div>
          </div>
        </div>

        {/* Gameplay */}
        <div className='relative lg:mt-10 mr-10 ml-10'>
          {/* Answer */}
          <div className='absolute top-0 left-20 right-20'>
            <AnswerToBox
              charArray={chosenWord}
              originWord={originWord}
              handleFunction={handleUnpick}
              isDisable={isSubmitted}
            />
          </div>

          {/* Origin Word */}
          <div className='absolute top-16 left-20 right-20'>
            <WordToBox
              charArray={revealedWord}
              isDisable={true}
              buttonType={6}
            />
          </div>

          {/* Random Letter */}
          <div className='absolute pt-8 border-t-2 border-gray-200 top-32 lg:top-40 left-10 right-10'>
            <ObjectToBox objectArray={object} handleFunction={handlePick} />
          </div>

          {/* Undo Button */}
          <div className='absolute right-0 top-5'>
            {chosenWord.length !== 0 && (
              <button
                disabled={isSubmitted}
                onClick={() =>
                  handleUnpick(
                    chosenWord[chosenWord.length - 1],
                    chosenWord.length - 1
                  )
                }
                className='bg-gray-100 hover:bg-gray-300 text-gray-400 hover:text-black w-8 h-8 text-lg text-center font-bold border border-gray-300 rounded-xl'
              >
                ↺
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className='absolute bottom-1 lg:bottom-3 right-0 left-0 items-center justify-center'>
        {isSubmitted ? (
          <div className='absolute bg-emerald-50 rounded-2xl bottom-8 lg:bottom-20 mx-4 left-0 right-0 p-4 animate-fly-in border border-gray-200 mb-2'>
            <div className='flex items-end'>
              <p className='text-green-700 font-medium text-xl'>
                {/* Capitalize first letter */}
                {originWord.charAt(0).toUpperCase() + originWord.slice(1)}
              </p>
              <i className='text-gray-500 ml-1'>{wClassEn}</i>
            </div>
            <p>{wDefEn}</p>
            <div className='flex items-end'>
              <p className='text-gray-500 mr-1'>⭐Vietnamese:</p>
              <p>{wDefVi}</p>
            </div>
            <div className='absolute right-1 bottom-1'>
              {/* Open modal */}
              <button
                onClick={handleOpenModal}
                className='bg-black border text-white rounded-full w-6 h-6 text-sm'
              >
                ↗
              </button>
            </div>
          </div>
        ) : (
          <div className='absolute'></div>
        )}

        <Navigation
          disabled={checkLength}
          handleNext={handleNext}
          hanldeHint={handleHint}
          hintLeft={hintLeft}
        />
      </div>
      <Modal
        isOpen={isOpenModal}
        closeModal={handleCloseModal}
        originWord={originWord}
        wClassEn={wClassEn}
        wDefEn={wDefEn}
        wDefVi={wDefVi}
        wSrc={wSrc}
      />
      <MessageModal
        isOpen={isOpenMessage}
        closeModal={handleCloseMessage}
        message='Your current answer is incorrect 🤷‍♂️. Please undo selection
                    to use hints😊'
      />
    </div>
  )
}
