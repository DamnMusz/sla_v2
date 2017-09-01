// Import controller
var controller = require("../controllers/localidadController");

exports.getRoutesHandler = function(express){
	var routesHandler = express.Router();

	routesHandler.route('/localidad')
	  .get(controller.findAll);
	  
	return routesHandler;  
}