import { Router } from "express";

import {
  CancelOrder,
  OrderDetails,
  OrderSummary,
  OrdersHistory,
  PlaceOrder,
  UpdateOrderStatus,
} from "../controllers/OrderController";

export const router: Router = Router();

router.route("/").post(PlaceOrder);
router.route("/:orderId/cancel").post(CancelOrder);
router.route("/:orderId/status").put(UpdateOrderStatus);
router.route("/:customerId").get(OrdersHistory);
router.route("/:orderId/summary").get(OrderSummary);
router.route("/:orderId/details").get(OrderDetails);
