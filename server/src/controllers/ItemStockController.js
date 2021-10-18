module.exports = {
  getAll: async (req, res) => {
    try {
      const items = await models.ItemStock.find();

      return res.ok(items);
    } catch (e) {
      return res.serverError(e.message);
    }
  },
  findByPartNumber: async (req, res) => {
    const { partNumber } = req.params;

    if (!partNumber) return res.badRequest();

    // validate type
    if (typeof partNumber !== 'string') return res.badRequest();

    try {
      const item = await models.ItemStock.find({
        item_part_number: partNumber,
      });

      return res.ok(item);
    } catch (e) {
      return res.serverError(e.message);
    }
  },
  createAndUpdate: async (req, res) => {
    const { name, partNumber, mrp, quantity, rack } = req.body;

    if (!name || !partNumber || !mrp || !quantity || !rack) return res.badRequest();
    // validate type
    if (typeof name !== 'string' || typeof partNumber !== 'string' || typeof mrp !== 'number' || typeof quantity !== 'number' || typeof rack !== 'string') return res.badRequest();
    try {
      const item = await models.ItemStock.findOneAndUpdate(
        {
          item_part_number: partNumber,
        },
        {
          item_name: name,
          item_part_number: partNumber,
          max_retail_price: mrp,
          quantity,
          rack,
        },
        { upsert: true, new: true, runValidators: true },
        function (error, doc) {
          return error ? error : doc;
        }
      );

      return res.ok(item);
    } catch (e) {
      return res.serverError(e.message);
    }
  },
  delete: async (req, res) => {
    const { partNumber } = req.params;

    if (!partNumber) return res.badRequest();

    // validate type
    if (typeof partNumber !== 'string') return res.badRequest();
    try {
      const item = await models.ItemStock.findOneAndDelete({
        item_part_number: partNumber,
      });

      return res.ok(item);
    } catch (e) {
      return res.serverError(e.message);
    }
  },
  checkItemAvailability: async (req, res) => {
    const { selectedItems } = req.body;
    const arrayOfIds = selectedItems.map((item) => item._id);
    try {
      const items = await models.ItemStock.find({
        _id: { $in: arrayOfIds },
      });
      const availableItems = [];
      items.forEach((item) => {
        selectedItems.forEach((sentItem) => {
          if (sentItem._id === item._id.toString()) {
            availableItems.push({ _id: item._id, availableQuantity: item.quantity - sentItem.quantity });
          }
        });
      });
      return res.ok(availableItems);
    } catch (e) {
      return res.serverError(e.message);
    }
  },
};
