// Import controller
var localidadController = require("../controllers/localidadController");

exports.getRouterHandler = function(express){
	var localidadRoutersHandler = express.Router();

	localidadRoutersHandler.route('/localidad')
	  .get(localidadController.findAll);
	  
	return localidadRoutersHandler;  
}