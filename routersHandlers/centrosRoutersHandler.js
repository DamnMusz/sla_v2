// Import controller
var centrosFacturacionController = require("../controllers/centrosFacturacionController");

exports.getRouterHandler = function(express){
	var centrosRoutersHandler = express.Router();

	centrosRoutersHandler.route('/centrosFacturacion')
	  .get(centrosFacturacionController.findAll);
	  
	return centrosRoutersHandler;  
}