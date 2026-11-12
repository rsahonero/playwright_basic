import { Locator, Page } from "@playwright/test";

export class CartPage {
    private readonly addCartProd1: Locator
    private readonly addCartProd2: Locator
    private readonly addCartProd3: Locator
    private readonly btnSaveProd: Locator

    constructor(page: Page) {
        this.addCartProd1 = page.getByRole('button', { name: 'Añadir al carrito' }).first()
        this.addCartProd2 = page.locator('button').filter({hasText: 'Añadir al carrito'}).nth(1)
        this.addCartProd3 = page.getByRole('button', { name: 'Añadir al carrito' }).nth(2)
        this.btnSaveProd = page.locator('button#view-cart-btn')
    }

    async addProduct() {
        await this.addCartProd1.click()
        await this.addCartProd2.click()
        await this.addCartProd3.click()
        //await this.btnSaveProd.click()
    }
}
