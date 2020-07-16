var braintree = require("braintree");

var gateway = braintree.connect({
	environment: braintree.Environment.Sandbox,
	merchantId: "hzsc5xh7dch42n7j",
	publicKey: "x7g65zzxvsbyv76v",
	privateKey: "43b254038ddffa0f0dbf0dbb4d1c03a5"
});

exports.getToken = (req, res) => {
	gateway.clientToken.generate({}, function (err, response) {
		if (err) {
			return res.status(500).send(err)
		}
		else {
			return res.send(response);
		}
	});
}
exports.processPay = (req, res) => {
	let nonceFromTheClient = req.body.paymentMethodNonce;
	let amountFromTheClient = req.body.amount;
	gateway.transaction.sale({
		amount: amountFromTheClient,
		paymentMethodNonce: nonceFromTheClient,
		options: {
			submitForSettlement: true
		}
	}, function (err, result) {
		if (err) {
			res.status(500).send(err)
		}
		else {
			res.send(result)
		}
	});
}