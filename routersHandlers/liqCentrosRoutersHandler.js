// Import controller
var controller = require("../controllers/facturacion/liquidacionCentrosController");

exports.getRoutesHandler = function(express){
	var routesHandler = express.Router();

	routesHandler.route('/liquidacionCentro')
		.get(controller.findAll);
	
	routesHandler.route('/mailLiquidacionCentro/:id')
		.put(controller.sendMailCentros);
			
	return routesHandler;  
}