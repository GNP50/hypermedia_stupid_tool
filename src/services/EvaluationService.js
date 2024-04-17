import EvaluationResponse from './EvaluationResponse';
import axios from 'axios';
import data from './data.json';

class EvaluationService {
  static async getall(url){
    if(localStorage.getItem(`data ${url}`) === null){
      
      localStorage.setItem(`data ${url}`, JSON.stringify(data));
    }
    return JSON.parse(localStorage.getItem(`data ${url}`));
  }

  static async saveall(data,url){
    localStorage.setItem(`data ${url}`, JSON.stringify(data))
  }

	static API_ENDPOINT = 'https://hypermedia.azurewebsites.net/api/';
	static async getToFill(user, url) {
		try {
		  const response = await EvaluationService.getall(url);
      
		  // Mapping response data to EvaluationResponse objects
		  const mappedData = response.data.filter(
        item=>item.comment === null
      )
      .map(item =>
			new EvaluationResponse(
			  item.id,
			  item.code,
			  item.heuristicType,
			  item.macroHeuristicArea,
			  item.description,
			  item.evaluation1,
			  item.comment
			)
		  );
	
		  return mappedData;
		} catch (error) {
		  console.error('Error:', error);
		  throw new Error('Failed to fetch data');
		}
	  }

	  static async getToFilled(user, url) {
		try {
		  const response = await EvaluationService.getall(url);
      console.log(response);
		  // Mapping response data to EvaluationResponse objects
		  const mappedData = response.data
      .filter(
        item=>item.comment !== null
      ).map(item =>
			new EvaluationResponse(
			  item.id,
			  item.code,
			  item.heuristicType,
			  item.macroHeuristicArea,
			  item.description,
			  item.evaluation1,
			  item.comment
			)
		  );
	
		  return mappedData;
		} catch (error) {
		  console.error('Error:', error);
		  throw new Error('Failed to fetch data');
		}
	  }

	static async submitEvaluations(evaluations,url) {
		try {
		  const response = await EvaluationService.getall(url);
      for (let i = 0; i < evaluations.length; i++) {
        var element = evaluations[i];
        response.data.filter(e=>e.id === element.id)[0].comment = element.comment;
        response.data.filter(e=>e.id === element.id)[0].evaluation1 = element.evaluation;
        await EvaluationService.saveall(response,url);
      }
        
      
		} catch (error) {
			console.error('Error:', error);
			throw new Error('Failed to submit evaluations');
		}
	}

  
	static async blanckEvaluations(evaluations,url) {
		try {
			const response = await EvaluationService.getall(url);
      for (let i = 0; i < evaluations.length; i++) {
        var element = evaluations[i];
        response.data.filter(e=>e.id === element.id)[0].comment = null;
        response.data.filter(e=>e.id === element.id)[0].evaluation1 = null;
        await EvaluationService.saveall(response,url);
      }
		} catch (error) {
			console.error('Error:', error);
			throw new Error('Failed to submit evaluations');
		}
	}
}export default EvaluationService;
