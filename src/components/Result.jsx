import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser'

function Result() {
  const navigate = useNavigate()
  const location = useLocation()
  const { total = 0, correct = 0, name = '', email = '' } = location.state || {}
  const wrong = total - correct
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0

  // Send email via EmailJS
  const sendEmail = () => {
    const templateParams = {
      title: 'Quiz Result',
      name: name,
      email: email,
      time: new Date().toLocaleString(),
      message: `
        🎓 Quiz Result Summary

        Name: ${name}
        Email: ${email}

        Correct Answers: ${correct}
        Wrong Answers: ${wrong}
        Total Questions: ${total}
        Final Score: ${percentage}%
      `,
    }

    emailjs
      .send(
        'service_2qhoeoj',     
        'template_9j7vj4r',    
        templateParams,
        'QPadN7oZoAMfEbnBt'  
      )
      .then(
        () => alert('Result email sent successfully!'),
        (error) => {
          console.error('Email send failed:', error)
          alert('Failed to send email. Try again later.')
        }
      )
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-linear-to-br from-blue-50 via-white to-blue-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 border border-blue-100 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
          Quiz Results 🎯
        </h1>

        <div className="mb-6 text-gray-700 text-lg">
          <p><span className="font-semibold text-blue-800">Name:</span> {name}</p>
          <p><span className="font-semibold text-blue-800">Email:</span> {email}</p>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
          <p className="text-xl font-semibold text-blue-900 mb-3">Your Performance</p>
          <div className="flex flex-col md:flex-row justify-around items-center gap-4 text-lg text-gray-700">
            <p><span className="font-bold text-blue-800">{correct}</span> Correct</p>
            <p><span className="font-bold text-red-500">{wrong}</span> Wrong</p>
            <p><span className="font-bold text-green-600">{percentage}%</span> Score</p>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <div
            className={`w-32 h-32 flex items-center justify-center rounded-full text-3xl font-bold text-white shadow-md ${
              percentage >= 80
                ? 'bg-green-600'
                : percentage >= 50
                ? 'bg-yellow-500'
                : 'bg-red-500'
            }`}
          >
            {percentage}%
          </div>
        </div>

        <p className="text-xl text-gray-700 mb-8">
          {percentage >= 80 && 'Excellent job! 🥇'}
          {percentage >= 50 && percentage < 80 && 'Good effort! Keep improving 💪'}
          {percentage < 50 && 'Needs improvement — study a bit more 📚'}
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={() => navigate('/quiz')}
            className="bg-blue-700 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md"
          >
            Retry Quiz
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg"
          >
            Back to Home
          </button>
          <button
            onClick={sendEmail}
            className="bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md"
          >
            Send Email
          </button>
        </div>
      </div>
    </div>
  )
}

export default Result
