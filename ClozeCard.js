function ClozeCard(front, back) {
	this.text = text.cloze;
	this.cloze = cloze;

};
	// prototype of ClozeCard to return the question missing the cloze
	function ClozeCardPrototype(){

		this.clozeRemove = function() {
			return ('...' + this.text);

		};
	};

ClozeCard.prototype = new ClozeCardPrototype();

module.exports = ClozeCard;