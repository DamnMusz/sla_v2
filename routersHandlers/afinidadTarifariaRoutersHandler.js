// Import controller
var afinidadTarifariaController = require("../controllers/afinidadTarifariaController");

exports.getRouterHandler = function(express){
	var afinidadTarifariaRoutersHandler = express.Router();

	afinidadTarifariaRoutersHandler.route('/afinidadTarifaria')
	  .get(afinidadTarifariaController.findAll);
	  
	return afinidadTarifariaRoutersHandler;  
}