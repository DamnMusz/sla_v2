// Import controller
var controller = require("../controllers/facturacion/liquidacionCentrosController");

exports.getRoutesHandler = function(express){
	var routesHandler = express.Router();

	routesHandler.route('/liquidacionCentro')
		.get(controller.findAll);
			
	return routesHandler;  
}