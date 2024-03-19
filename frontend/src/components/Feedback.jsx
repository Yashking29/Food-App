// FeedbackForm.js
import React, { useState } from 'react';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add logic here to handle the submission of feedback, such as sending it to a server
    console.log('Feedback submitted:', feedback);
    // Reset the feedback input after submission
    setFeedback('');
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Feedback Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">Your Feedback</label>
          <textarea
            id="feedback"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            rows="4"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-600">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
