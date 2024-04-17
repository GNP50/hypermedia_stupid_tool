class EvaluationResponse {
	constructor(id, metricCode, heuristicType, macroHeuristicArea, description, evaluation1, comment) {
	  this.id = id;
	  this.metricCode = metricCode;
	  this.heuristicType = heuristicType;
	  this.macroHeuristicArea = macroHeuristicArea;
	  this.description = description;
	  this.evaluation1 = evaluation1;
	  this.comment = comment;
	}
  }
  

  export default EvaluationResponse;
