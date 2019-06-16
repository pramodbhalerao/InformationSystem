const mongoose = require('mongoose');

module.exports = mongoose.Schema({
        policyName: String,
	    establishmentYear: String,
	    description: String,
	    introducer: String
});
