function internalError(err, req, res, next) {
   res.status(500).json({error: 'Internal server error'})
};


module.exports = internalError