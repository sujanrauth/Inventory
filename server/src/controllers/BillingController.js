module.exports = {
  create: async (req, res) => {
    const { customerName, phoneNumber, orderDate, products, orderTotal } = req.body;

    if (!customerName || !phoneNumber || !orderDate || !products || !orderTotal) return res.badRequest();

    try {
      products.map(async (item) => {
        const itemData = await models.ItemStock.find({
          item_part_number: item.item_part_number,
        });
        const updatedQuantity = itemData[0].quantity - item.quantity;
        await models.ItemStock.findByIdAndUpdate({ _id: itemData[0]._id }, { quantity: updatedQuantity });
      });
      const bill = await models.Billing.create({
        customer_name: customerName,
        phone_number: phoneNumber,
        order_date: orderDate,
        products,
        order_total: orderTotal,
      });
      return res.ok(bill);
    } catch (e) {
      return res.serverError(e.message);
    }
  },
  getByPhoneNumber: async (req, res) => {},
};
