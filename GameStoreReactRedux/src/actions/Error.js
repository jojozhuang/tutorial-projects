function Error(message) 
{
	this.message = message;
}
Error.prototype.toString = function()
{
	return "Error: " + this.message;
};

export default Error;