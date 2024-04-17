import React, { useState, useEffect } from 'react';
import EvaluationService from '../services/EvaluationService'; // Import your EvaluationService
import EvaluationDTO from '../services/EvaluationDTO'; // Import your EvaluationDTO

const MetricComponent = ({ user, url }) => {
  const [metrics, setMetrics] = useState([]);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        console.log('Fetching metrics to delete...');
        const response = await EvaluationService.getToFilled(user, url);
        setMetrics(response);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    fetchMetrics();
  }, [user, url]);

  const handleDelete = async (id) => {
      
    console.log(`Deleting ${id} element`);
    try {
      const evaluationDto = new EvaluationDTO(
        id,
        undefined,
        undefined,
        undefined//base64Data
      );
      // Call the submitEvaluations method
      await EvaluationService.blanckEvaluations([evaluationDto],url);
      const deletedMetricIndex = metrics.findIndex(metric => metric.id === id);

      if (deletedMetricIndex !== -1) {
        // Remove the deleted metric from the list
        const updatedMetrics = [...metrics.slice(0, deletedMetricIndex), ...metrics.slice(deletedMetricIndex + 1)];
        setMetrics(updatedMetrics);
      }
      setShowToast(true); // Show the toast message
      setTimeout(() => setShowToast(false), 3000);
      // Read the selected file as data URL
      //fileReader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error('Error submitting evaluations:', error);
    }
  };

  return (
    <div>
      {metrics.map((metric) => (
        <div key={metric.id} className="flex justify-between items-center border-b border-gray-200 py-2 px-4">
          <div>
            <h3 className="text-lg font-semibold">{metric.name}</h3>
            <p className="text-gray-600">ID: {metric.id}</p>
            <p className="text-gray-600">Response: {metric.evaluation1} - {metric.comment}</p>
          </div>
          <button
            onClick={() => handleDelete(metric.id)}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-red-300"
          >
            Delete
          </button>
        </div>
      ))}

{showToast && (
      <div className="fixed bottom-4 right-4 bg-gray-800 text-white py-2 px-4 rounded-md shadow-md">
                  Evaluation uploaded!
      </div>
    )}  
    </div>
  );
};

export default MetricComponent;
