import { NotFoundException } from "../../common/exceptions";
import { Cart } from "../models/cart.entity";
import { CartRepository, cartRepository } from "../repositry/cart.repository";
import { CartItemService, cartItemService } from "./cart-item.service";

export class CartService {
  constructor(
    private readonly cartRepo: CartRepository,
    private readonly cartItemService: CartItemService
  ) {}

  async calculateTotalPrice(cartId: number): Promise<number> {
    // TODO: Use database to calculate total price or calculate it on the server

    const cartItems = await this.cartItemService.findBy({ cartId });

    let total = 0;

    for (const item of cartItems) {
      total += item.price * item.quantity;
    }

    return total;
  }

  // TODO: Make sure the cart belongs to the user
  async clear(cartId: number): Promise<void> {
    const cart = await this.cartRepo.findOneById(cartId);
    if (!cart) throw new NotFoundException("Cart not found");

    await this.cartItemService.deleteBy({ cartId });

    cart.totalAmount = await this.calculateTotalPrice(cart.id); // Or set it to 0 directly

    await this.cartRepo.save(cart);
  }
}

export const cartService = new CartService(cartRepository, cartItemService);