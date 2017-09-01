// Import controller
var controller = require("../controllers/afinidadTarifariaController");

exports.getRoutesHandler = function(express){
	var routesHandler = express.Router();

	routesHandler.route('/afinidadTarifaria')
	  .get(controller.findAll);
	  
	return routesHandler;  
}