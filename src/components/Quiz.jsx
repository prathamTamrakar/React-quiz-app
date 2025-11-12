import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import questions from '../data/questions'

function Quiz() {
  const navigate = useNavigate()
  const location = useLocation()

  const [current, setCurrent] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(15 * 60)

  // Handle option selection
  const handleOptionClick = (option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questions[current].id]: option,
    })
  }

  const handleNext = () => {
    if (current < questions.length - 1) setCurrent(current + 1)
  }

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1)
  }

  const handleSubmit = () => {
    let correctCount = 0
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.answer) correctCount++
    })

    const total = questions.length
    const name = location.state?.name
    const email = location.state?.email
    const score = Math.round((correctCount / total) * 100)
    const date = new Date().toLocaleString()

    // // Data to save
    // const resultData = {
    //   name,
    //   email,
    //   total,
    //   correct: correctCount,
    //   score,
    //   date,
    // }

    // Convert to text (or JSON)
    const fileContent = `
Quiz Result Summary
-------------------------
Name: ${name}
Email: ${email}
Total Questions: ${total}
Correct Answers: ${correctCount}
Score: ${score}%
Date: ${date}
-------------------------
`

    // Create a Blob and trigger download
    const blob = new Blob([fileContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `quiz_result_${name.replace(/\s+/g, '_')}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    // Continue to result page
    navigate('/result', {
      state: {
        total,
        correct: correctCount,
        name,
        email,
      },
    })
  }


  // Countdown timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-linear-to-br from-blue-50 via-white to-blue-100 p-4 md:p-10">
      {/* Sidebar */}
      <div className="md:w-1/4 w-full bg-white rounded-2xl shadow-lg border border-blue-100 p-6 mb-6 md:mb-0 md:mr-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-blue-800 mb-4 text-center">Questions</h2>

          <div className="grid grid-cols-5 md:grid-cols-3 gap-3 justify-items-center">
            {questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => setCurrent(index)}
                className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold border transition 
                  ${index === current
                    ? 'bg-blue-700 text-white border-blue-700'
                    : selectedAnswers[q.id]
                      ? 'bg-green-500 text-white border-green-500'
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Timer Section */}
        <div className="mt-6 text-center">
          <p className={`font-bold text-lg ${timeLeft < 60 ? 'text-red-600' : 'text-blue-700'}`}>
            ⏰ Time Left: {formatTime(timeLeft)}
          </p>
        </div>
      </div>

      {/* Main quiz area */}
      <div className="flex-1 bg-white rounded-2xl shadow-lg border border-blue-100 p-8 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-800 mb-6">
            Question {current + 1} of {questions.length}
          </h2>
          <p className="text-lg text-gray-700 mb-6">{questions[current].question}</p>

          <div className="space-y-4">
            {questions[current].options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleOptionClick(option)}
                className={`w-full text-left p-4 rounded-lg border transition
                  ${selectedAnswers[questions[current].id] === option
                    ? 'bg-blue-700 text-white border-blue-700'
                    : 'bg-gray-50 hover:bg-blue-50 border-gray-300'
                  }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-10">
          <button
            onClick={handlePrev}
            disabled={current === 0}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {current < questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-6 rounded-lg"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Quiz
