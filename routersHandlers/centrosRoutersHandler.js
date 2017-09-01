// Import controller
var controller = require("../controllers/facturacion/centrosFacturacionController");

exports.getRoutesHandler = function(express){
	var routesHandler = express.Router();

	routesHandler.route('/centrosFacturacion')
	  .get(controller.findAll);
	  
	return routesHandler;  
}