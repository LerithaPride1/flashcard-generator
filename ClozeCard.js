var ClozeCard = function (front, back) {
	this.text = text;
	this.cloze = cloze;
};

	function ClozeCardPrototype(){
		this.clozeDelete = function() {
			return ('...' + this.text);
		};
	};

ClozeCard.prototype = new ClozeCardPrototype();
module.exports = ClozeCard;