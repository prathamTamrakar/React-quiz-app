import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Welcome() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleStartQuiz = () => {
    if (name.trim() && email.trim()) {
      navigate('/instruction', { state: { name, email } })
    }
  }

  const isDisabled = !name.trim() || !email.trim()

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-linear-to-br from-blue-50 via-white to-blue-100 p-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 text-center mb-10 drop-shadow-sm">
        Welcome!
      </h1>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
        <h2 className="text-2xl font-semibold text-blue-900 text-center mb-8">
          Enter Your Credentials
        </h2>

        <form className="flex flex-col space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg text-gray-700 mb-2">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Pratham Tamrakar"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleStartQuiz}
              disabled={isDisabled}
              className={`w-full md:w-auto font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md ${
                isDisabled
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-700 hover:bg-blue-600 text-white hover:shadow-lg'
              }`}
            >
              Start Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Welcome
