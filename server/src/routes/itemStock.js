import ItemStockController from '../controllers/ItemStockController';

module.exports = [
  {
    version: 'v1',
    path: 'item-stock',
    method: 'get',
    action: ItemStockController.getAll,
  },
  {
    version: 'v1',
    path: 'item-stock/:partNumber',
    method: 'get',
    action: ItemStockController.findByPartNumber,
  },
  {
    version: 'v1',
    path: 'item-stock',
    method: 'put',
    action: ItemStockController.createAndUpdate,
  },
  {
    version: 'v1',
    path: 'item-stock/:partNumber',
    method: 'delete',
    action: ItemStockController.delete,
  },
  {
    version: 'v1',
    path: 'item-stock/check-availability',
    method: 'post',
    action: ItemStockController.checkItemAvailability,
  },
];
