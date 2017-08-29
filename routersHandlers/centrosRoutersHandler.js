// Import controller
var centrosFacturacionController = require("../controllers/centrosFacturacionController");

exports.getCentrosRoutersHandler = function(express){
	var centrosRoutersHandler = express.Router();

	centrosRoutersHandler.route('/centrosFacturacion')
	  .get(centrosFacturacionController.findAll);
	  
	return centrosRoutersHandler;  
}