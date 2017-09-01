// Import controller
var controller = require("../controllers/facturacion/tarifarioController");

exports.getRoutesHandler = function(express){
	var routesHandler = express.Router();

	routesHandler.route('/tarifario')
		.get(controller.getTarifario);
			
	routesHandler.route('/tarifa')
		.get(controller.findAllTarifas)
		.post(controller.createTarifa);
	  
	return routesHandler;  
}