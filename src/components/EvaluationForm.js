import React, { useState, useEffect } from 'react';
import EvaluationService from '../services/EvaluationService'; // Import your EvaluationService
import EvaluationDTO from '../services/EvaluationDTO'; // Import your EvaluationDTO

const EvaluationForm = ({ user, url }) => {
  const [evaluations, setEvaluations] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [evaluation1, setEvaluation1] = useState('');
  const [comment, setComment] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('get to fill... fetching ...');
        const response = await EvaluationService.getToFill(user, url);
        setEvaluations(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user, url]);

  const handleNext = async () => {
	try {
	  // Read the selected file and convert it to base64
	  //const fileReader = new FileReader();
	  ///fileReader.onload = async () => {
		//const base64Data = fileReader.result.split(',')[1]; // Extract base64 data from result
		// Construct the EvaluationDTO object with base64Data included
		const evaluationDto = new EvaluationDTO(
		  evaluations[currentIdx].id,
		  evaluation1,
		  comment,
		  ""//base64Data
		);
		// Call the submitEvaluations method
		await EvaluationService.submitEvaluations([evaluationDto],url);
		// Move to the next item
		setCurrentIdx(currentIdx + 1);
		// Reset fields
		setEvaluation1('');
		setComment('');
		setSelectedFile(null);
	  setShowToast(true); // Show the toast message
    setTimeout(() => setShowToast(false), 3000);
	  // Read the selected file as data URL
	  //fileReader.readAsDataURL(selectedFile);
	} catch (error) {
	  console.error('Error submitting evaluations:', error);
	}finally {
    setUploadLoading(false); // Stop loading state
  }
  };
  
 


  if (evaluations.length === 0) {
    return <div>Loading...</div>;
  }

  if (currentIdx >= evaluations.length) {
    return <div>No more evaluations to fill.</div>;
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  const evaluation = evaluations[currentIdx];

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-lg font-bold mb-4">Evaluation Form</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">ID:</label>
        <span>{evaluation.id}</span>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Metric Code:</label>
        <span>{evaluation.metricCode}</span>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Heuristic Type:</label>
        <span>{evaluation.heuristicType}</span>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Macro Heuristic Area:</label>
        <span>{evaluation.macroHeuristicArea}</span>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Description:</label>
        <span>{evaluation.description}</span>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2"></label>
        <span>{}</span>
      </div>
	  <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Evaluation 1:</label>
        <input
          type="text"
          value={evaluation1}
          onChange={(e) => setEvaluation1(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Comment:</label>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
	  {/* <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Upload File:</label>
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div> */}
  <button 
        onClick={handleNext} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        disabled={uploadLoading} // Disable the button while loading
      ></button>
      {showToast && (
      <div className="fixed bottom-4 right-4 bg-gray-800 text-white py-2 px-4 rounded-md shadow-md">
                  Evaluation uploaded!
      </div>
    )}  
  </div>
     
  );
};

export default EvaluationForm;
