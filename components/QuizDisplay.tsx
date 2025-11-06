import React, { useState } from 'react';

interface QuizItem {
  question: string;
  answer: string;
}

interface QuizDisplayProps {
  quiz: QuizItem[];
}

const AccordionItem: React.FC<{ item: QuizItem; index: number }> = ({ item, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group border-b border-slate-200 last:border-b-0 transition-all duration-200 hover:bg-slate-50/50">
      <h2>
        <button
          type="button"
          className="flex items-start gap-4 w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-all"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Question Number Badge */}
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
            isOpen 
              ? 'bg-blue-600 text-white scale-110' 
              : 'bg-slate-200 text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-700'
          }`}>
            {index + 1}
          </div>
          
          {/* Question Text */}
          <span className={`flex-1 font-semibold transition-colors duration-200 ${
            isOpen ? 'text-blue-700' : 'text-slate-800 group-hover:text-slate-900'
          }`}>
            {item.question}
          </span>
          
          {/* Chevron Icon */}
          <svg
            className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
              isOpen ? 'rotate-180 text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </h2>
      
      {/* Answer Section with Smooth Animation */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 pt-2 ml-12">
          <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-lg p-5 border-l-4 border-blue-500 shadow-sm">
            <div className="flex items-start gap-3">
              {/* Answer Icon */}
              <svg 
                className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2} 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-slate-700 leading-relaxed">{item.answer}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const QuizDisplay: React.FC<QuizDisplayProps> = ({ quiz }) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-2">
          <svg 
            className="w-6 h-6 text-white" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Quiz Questions</h3>
          <p className="text-sm text-slate-500">{quiz.length} questions available</p>
        </div>
      </div>

      {/* Quiz Accordion */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-md">
        {quiz.map((item, index) => (
          <AccordionItem key={index} item={item} index={index} />
        ))}
      </div>

      {/* Footer Stats */}
      <div className="flex items-center justify-center gap-6 pt-2">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <svg className="w-5 h-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Click to reveal answers</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <svg className="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
          </svg>
          <span>Study mode enabled</span>
        </div>
      </div>
    </div>
  );
};

// Demo Component
export default function App() {
  const sampleQuiz: QuizItem[] = [
    {
      question: "What is the capital of France?",
      answer: "The capital of France is Paris. It's located in the north-central part of the country and has been the capital since the 12th century. Paris is known for its art, fashion, gastronomy, and culture."
    },
    {
      question: "What is photosynthesis?",
      answer: "Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of sugar. This process is essential for life on Earth as it produces the oxygen we breathe."
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      answer: "William Shakespeare wrote 'Romeo and Juliet' around 1594-1596. It's one of his most famous tragedies and tells the story of two young star-crossed lovers whose deaths ultimately reconcile their feuding families."
    },
    {
      question: "What is the speed of light?",
      answer: "The speed of light in a vacuum is approximately 299,792,458 meters per second (or about 186,282 miles per second). This is considered the ultimate speed limit of the universe according to Einstein's theory of relativity."
    },
    {
      question: "What is the largest planet in our solar system?",
      answer: "Jupiter is the largest planet in our solar system. It's a gas giant with a mass more than twice that of all the other planets combined. Jupiter is known for its Great Red Spot, a giant storm that has been raging for hundreds of years."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <QuizDisplay quiz={sampleQuiz} />
      </div>
    </div>
  );
}