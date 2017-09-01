// Import controller
var controller = require("../controllers/provinciaController");

exports.getRoutesHandler = function(express){
	var routesHandler = express.Router();

	routesHandler.route('/provincia')
	  .get(controller.findAll);
	  
	return routesHandler;  
}