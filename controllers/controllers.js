exports.getResponse = (req, res, next) => {
  res.status(201).json({ message: 'Request received !' });
};
