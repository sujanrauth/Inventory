module.exports = {
  addUser: async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.badRequest();

    // validate type
    if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') return res.badRequest();
    try {
      const user = await models.User.create({
        name,
        email,
        password,
      });

      return res.created(user);
    } catch (e) {
      return res.serverError(e.message);
    }
  },
  verify: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.badRequest();

    // validate type
    if (typeof email !== 'string' || typeof password !== 'string') return res.badRequest();

    try {
      const user = await models.User.find({
        email,
        password,
      });

      if (user.length > 0) return res.ok(user);
      else return res.notFound(user);
    } catch (e) {
      return res.serverError(e.message);
    }
  },
};
