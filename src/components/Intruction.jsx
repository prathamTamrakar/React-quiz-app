import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Instructions() {
  const navigate = useNavigate()
  const location = useLocation()
  const { name, email } = location.state || {}

  const handleStartQuiz = () => {
    navigate('/quiz', { state: { name, email } })
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-linear-to-br from-blue-50 via-white to-blue-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800 text-center mb-8">
          Quiz Instructions
        </h1>

        <div className="text-gray-700 text-lg space-y-4 mb-10">
          <p>📘 Please read the instructions carefully before starting the quiz.</p>
          <ul className="list-disc list-inside space-y-3">
            <li>The quiz consists of <span className="font-semibold text-blue-700">30 multiple-choice questions</span>.</li>
            <li>You have <span className="font-semibold text-blue-700">15 minutes</span> to complete the quiz.</li>
            <li>Each question carries <span className="font-semibold">1 mark</span>. No negative marking.</li>
            <li>You can navigate between questions using the sidebar numbers.</li>
            <li>Once submitted, you cannot change your answers.</li>
            <li>Make sure your internet connection is stable during the quiz.</li>
          </ul>
          <p className="font-medium text-blue-800 mt-4">
            All the best! Give your best shot! 💪
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleStartQuiz}
            className="w-full md:w-auto bg-blue-700 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  )
}

export default Instructions
