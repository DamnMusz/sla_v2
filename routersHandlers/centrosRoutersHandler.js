// Import controller
var controller = require("../controllers/facturacion/centrosFacturacionController");

exports.getRoutesHandler = function(express){
	var routesHandler = express.Router();

	routesHandler.route('/centrosFacturacion')
		.get(controller.findAll)
		.post(controller.addCentroFacturacion)
		.put(controller.updateCentroFacturacion);
	
	routesHandler.route('/centrosFacturacionNames')
		.get(controller.findAllNames);

	routesHandler.route('/centrosFacturacion/:id')
		.get(controller.findById);

	return routesHandler;  
}