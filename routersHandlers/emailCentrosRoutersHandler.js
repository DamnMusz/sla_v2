// Import controller
var controller = require("../controllers/facturacion/emailController");

exports.getRoutesHandler = function(express){
	var routesHandler = express.Router();

	routesHandler.route('/emailCentro')
		.get(controller.findAll)
		.post(controller.add)
		.put(controller.edit);

	routesHandler.route('/centrosWithoutEmail')
		.get(controller.findCentrosWithoutEmail);

	routesHandler.route('/emailCentro/:id')
		.get(controller.findById);

	return routesHandler;  
}