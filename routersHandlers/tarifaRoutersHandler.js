// Import controller
var controller = require("../controllers/facturacion/tarifarioController");

exports.getRoutesHandler = function(express){
	var routesHandler = express.Router();

	routesHandler.route('/tarifario')
		.get(controller.getTarifario)
		.put(controller.editTarifario);
			
	routesHandler.route('/tarifa')
		.get(controller.findAllTarifas)
		.post(controller.addTarifa);

	routesHandler.route('/tarifaOptions')
		.get(controller.findAllTarifasOptions);
	  
	return routesHandler;  
}