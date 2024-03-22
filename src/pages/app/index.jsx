import { wordList } from '@/components/WordsList'
import Question from '@/components/Question'
import Progression from '@/components/ProgressBar'
import Navigation from '@/components/Navigation'
import { useState, useEffect } from 'react'
import WordToBox from '@/components/WordToBox'
import AnswerToBox from '@/components/AnswerToBox'
import Modal from '@/components/WordModal'
import MessageModal from '@/components/MessageModal'
import HelpBar from '@/components/HelpBar'
import ScrambledToBox from '@/components/ScrambledToBox'

export default function App() {
  /* DECLARE STATE */
  const [originWord, setOriginWord] = useState('')
  const [scrambledWord, setScrambledWord] = useState([])
  const [scrambledObject, setScrambledObject] = useState([])
  const [chosenWord, setChosenWord] = useState([])
  const [chosenObject, setChosenObject] = useState([])
  const [revealedWord, setRevealedWord] = useState([])
  const [hintLeft, setHintLeft] = useState(3)
  const [hintObject, setHintObject] = useState([])
  const [progress, setProgress] = useState(1)
  const [isSubmitted, setSubmitted] = useState(false)
  const [isOpenModal, setOpenModal] = useState(false)
  const [isOpenMessage, setOpenMessage] = useState(false)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)

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
  let immuScramWord = scrambledObject
    .filter((o) => !o.isPicked)
    .map((o) => o.value)
  let immuIsSubmitted = false

  // Handle keydown
  const handleKeyDown = (event) => {
    let key = event.key
    // Handle if player type the right letter
    if (immuScramWord.includes(key)) {
      let keyIndex = 0
      let objectIndex = 0

      // Find position of typed letter
      for (let i = 0; i < immuScramWord.length; i++) {
        if (immuScramWord[i] === key) keyIndex = i
      }

      // Remove the typed letter
      immuScramWord = [
        ...immuScramWord.slice(0, keyIndex),
        ...immuScramWord.slice(keyIndex + 1),
      ]

      // Set primary state
      setChosenWord((chosenWord) => [...chosenWord, key])
      setScrambledWord(immuScramWord)

      // Set chosen object state
      let tmpChosen = chosenObject
      tmpChosen[chosenWord.length].value = key
      tmpChosen[chosenWord.length].isPicked = true
      setChosenObject(tmpChosen)

      // Set scramble object state
      let tmpObject = scrambledObject
      for (let i = 0; i < tmpObject.length; i++) {
        if (tmpObject[i].value === key && !tmpObject[i].isPicked)
          objectIndex = i
      }
      tmpObject[objectIndex].isPicked = true
      tmpObject[objectIndex].pickedPosition = chosenWord.length
      setScrambledObject(tmpObject)
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
    setHintObject(createHintObject())
    setSubmitted(false)
    setIsAnswerCorrect(false)
  }

  const startNewScramble = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length)
    let words = wordList.map((w) => w.word)
    setOriginWord(words[randomIndex])
    setScrambledWord(doScramble(words[randomIndex]))
    setChosenObject(createChosenObject(words[randomIndex]))
    setScrambledObject(createScrambledObject(words[randomIndex]))
  }

  const createScrambledObject = (input) => {
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

  const createChosenObject = (input) => {
    let array = []
    for (let i = 0; i < input.length; i++) {
      array.push({
        value: '',
        isPicked: false,
      })
    }
    return array
  }

  const createHintObject = () => {
    const tmpHintObject = [
      { isAvailable: true },
      { isAvailable: true },
      { isAvailable: true },
    ]
    return tmpHintObject
  }

  const doScramble = (input) => {
    const shuffle = input.split('').sort(() => Math.random() - 0.5)
    return shuffle
  }

  /* HANDLER FUNCTIONS */
  const handlePick = (char, index) => {
    // Update clone
    setChosenWord([...chosenWord, char])
    setScrambledWord(scrambledWord.filter((c, i) => i !== index))

    // Update chosen object
    let tmpChose = chosenObject
    tmpChose[chosenWord.length].value = char
    tmpChose[chosenWord.length].isPicked = true

    // Update scrambled object
    let tmpObject = scrambledObject
    tmpObject[index].isPicked = true
    tmpObject[index].pickedPosition = chosenWord.length
    setScrambledObject(tmpObject)
  }

  const handleUnpick = (char, index) => {
    // Update chosen object
    let tmpChosen = chosenObject
    tmpChosen[chosenWord.length - 1].value = ''
    tmpChosen[chosenWord.length - 1].isPicked = false
    setChosenObject(tmpChosen)

    // Update scrambled object
    let tmpObject = scrambledObject
    let objectIndex = 0
    for (let i = 0; i < tmpObject.length; i++) {
      if (tmpObject[i].pickedPosition === chosenWord.length - 1) objectIndex = i
    }
    tmpObject[objectIndex].isPicked = false
    tmpObject[objectIndex].pickedPosition = -1
    setScrambledObject(tmpObject)

    // Update clone
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
      let checkCorrect = true
      for (let i = 0; i < originWord.length; i++) {
        if (chosenObject[i].value !== originWord[i]) checkCorrect = false
      }
      setIsAnswerCorrect(checkCorrect)
    }
  }

  const handleHint = (hintIndex) => {
    let index = chosenWord.length
    if (immuScramWord.includes(originWord[index])) {
      // Process hint
      setHintLeft(hintLeft - 1)
      let tmpHint = hintObject
      tmpHint[hintIndex].isAvailable = false
      setHintObject(tmpHint)

      // Process chosen word
      setChosenWord([...chosenWord, originWord[index]])

      // Process scrambled word
      let indexScramble = -1
      for (let i = 0; i < scrambledWord.length; i++) {
        if (scrambledWord[i] === originWord[index]) indexScramble = i
      }
      setScrambledWord(scrambledWord.filter((char, i) => i !== indexScramble))

      // Process chosen object
      let tmpChosen = chosenObject
      tmpChosen[chosenWord.length].value = originWord[index]
      tmpChosen[chosenWord.length].isPicked = true
      setChosenObject(tmpChosen)

      // Process scrambled object
      immuScramWord = scrambledWord
      let tmpObject = scrambledObject
      let objectIndex = 0
      for (let i = 0; i < tmpObject.length; i++) {
        if (tmpObject[i].value === originWord[index] && !tmpObject[i].isPicked)
          objectIndex = i
      }
      tmpObject[objectIndex].isPicked = true
      tmpObject[objectIndex].pickedPosition = chosenWord.length
      setScrambledObject(tmpObject)
    } else {
      setOpenMessage(true)
    }
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
      <div className='absolute top-2 right-0 left-0 px-4 md:pr-8 items-center justify-center'>
        <Progression current={progress} totalProgress={wordList.length} />
      </div>

      {/* Body */}
      <div className='absolute top-12 lg:top-14 bottom-20 left-2 right-2 lg:left-24 lg:right-24 items-center justify-center'>
        {/* Question */}
        <div className='relative ml-10 pl-100 2xl:pt-12 2xl:pb-8 lg:ml-32'>
          <Question progress={progress} />
        </div>

        {/* Definition */}
        <div className='relative py-2 md:py-4 px-4 md:px-12 bg-[#eeeff3] rounded-2xl border border-gray-200'>
          {/* Todo: Seperate Class */}
          <div className='md:flex md:justify-center'>
            <div className='flex left-0 right-0 justify-center mb-2 md:mb-0'>
              <img
                className='h-16 w-16 sm:w-24 sm:h-24 rounded-xl'
                src={wSrc}
                alt={wSrc}
              ></img>
            </div>
            <div className='ml-3'>
              <p className='text-left text-sm md:text-xl md:ml-4'>
                <span>{wDefEn}</span>
              </p>
              <p className='text-left text-gray-500 text-sm md:ml-4'>
                {wDefVi}
              </p>
            </div>
          </div>
        </div>

        {/* Gameplay */}
        <div className='relative mt-2 2xl:mt-10 md:mt-4 mr-1 ml-1'>
          {/* Answer */}
          <div className='absolute top-0 left-0 right-0 md:left-20 md:right-20'>
            <AnswerToBox
              objectArray={chosenObject}
              originWord={originWord}
              handleFunction={handleUnpick}
              isSubmitted={isSubmitted}
              isAnswerCorrect={isAnswerCorrect}
            />
          </div>

          {/* Origin Word */}
          <div className='absolute top-12 md:top-20 lg:top-16 left-4 right-4 md:left-20 md:right-20'>
            {!isAnswerCorrect && (
              <WordToBox
                charArray={revealedWord}
                isDisable={true}
                buttonType={6}
              />
            )}
          </div>

          {/* Random Letter */}
          <div className='absolute pt-2 md:pt-8 border-t-2 border-gray-200 top-40 md:top-52 left-4 right-4 md:left-10 md:right-10'>
            <ScrambledToBox
              objectArray={scrambledObject}
              handleFunction={handlePick}
            />
          </div>

          {/* Help Bar */}
          <div className='absolute right-0 top-32 md:top-40'>
            <HelpBar
              isSubmitted={isSubmitted}
              canUndo={chosenWord.length !== 0}
              handleUndo={() =>
                handleUnpick(
                  chosenWord[chosenWord.length - 1],
                  chosenWord.length - 1
                )
              }
              handleHint={handleHint}
              hintObject={hintObject}
              hintLeft={hintLeft}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className='absolute bottom-1 lg:bottom-3 right-0 left-0 items-center justify-center'>
        {isSubmitted ? (
          <div className='absolute bg-[#e1eee7] rounded-2xl bottom-8 lg:bottom-20 mx-4 left-0 right-0 p-4 animate-fly-in border border-gray-200 mb-2'>
            <div className='flex items-end'>
              <p className='text-green-700 font-medium text-xl'>
                {/* Capitalize first letter */}
                {originWord.charAt(0).toUpperCase() + originWord.slice(1)}
              </p>
              <i className='text-gray-500 ml-1'>{wClassEn}</i>
            </div>
            <p>{wDefEn}</p>
            <div className='flex items-end'>
              ⭐<i className='text-gray-500 mr-1'>Vietnamese:</i>
              <p>{wDefVi}</p>
            </div>
            <div className='absolute right-1 bottom-1'>
              {/* Open modal */}
              <button
                onClick={handleOpenModal}
                className='bg-[#2e2e2e] text-white rounded-full w-7 h-7 text-sm'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-4 h-4 ml-1.5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25'
                  />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className='absolute'></div>
        )}

        <Navigation disabled={checkLength} handleNext={handleNext} />
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
        message='You can not use hints at the moment 🤷‍♂️. Check your answer.'
      />
    </div>
  )
}
