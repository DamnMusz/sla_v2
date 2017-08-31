// Import controller
var provinciaController = require("../controllers/provinciaController");

exports.getRouterHandler = function(express){
	var provinciaRoutersHandler = express.Router();

	provinciaRoutersHandler.route('/provincia')
	  .get(provinciaController.findAll);
	  
	return provinciaRoutersHandler;  
}