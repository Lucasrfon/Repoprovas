import joi from "joi";

const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
	    '(\\#[-a-z\\d_]*)?$','i');

const examSchema = joi.object({
    name: joi.string().pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ ]*$/).required(),
    PDFLink: joi.string().pattern(urlPattern).required(),
    category: joi.string().required(),
    subject: joi.string().required(),
    teacher: joi.string().pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ ]*$/).required()
});

export default examSchema