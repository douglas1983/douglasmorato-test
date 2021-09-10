module.exports = async function validatoes(req, res, _next) {
  const { method } = req;

  const path = req.route.path.split('/')[1];
  console.log(method, path);
  _next();
};
