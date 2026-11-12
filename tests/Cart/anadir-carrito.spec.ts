import {test, expect} from '@playwright/test'
import { CartPage } from '../../pageObjects/cart/CartPage'

test('Anadir al carrito', async  ({page}) => {

    await page.goto('http://127.0.0.1:5500/')

    for(let i=0; i<3; i++){
        const cartPage = new CartPage(page)
        await cartPage.addProduct()   
    }
    await page.locator('button#view-cart-btn').click()

   

    //assertions
    const product1 = await page.locator('tbody#cart-items tr').filter({hasText: 'Producto 1'});
    const product1Quantity = product1.locator('td').nth(2)
    expect(product1Quantity).toHaveText('3')

    const product2 = await page.locator('tbody#cart-items tr').filter({hasText: 'Producto 2'});
    const product2Price = product2.locator('td').nth(1)
    expect(product2Price).toHaveText('$20.00')
    
    //expect(await page.locator('h2').textContent()).toContain('Tu carrito')



})

/**
 * test('Anadir al carrito', async  ({page}) => {

    await page.goto('http://127.0.0.1:5500/')

    for(let i=0; i<3; i++){
        //Seleccionar producto y anadir al carrito
        await page.getByRole('button', { name: 'Añadir al carrito' }).first().click()
        await page.locator('button').filter({hasText: 'Añadir al carrito'}).nth(1).click()
        await page.getByRole('button', { name: 'Añadir al carrito' }).nth(2).click()
    }

    await page.locator('button#view-cart-btn').click()

    //assertions
    const product1 = await page.locator('tbody#cart-items tr').filter({hasText: 'Producto 1'});
    const product1Quantity = product1.locator('td').nth(2)
    expect(product1Quantity).toHaveText('3')

    const product2 = await page.locator('tbody#cart-items tr').filter({hasText: 'Producto 2'});
    const product2Price = product2.locator('td').nth(1)
    expect(product2Price).toHaveText('$20.00')
    
    //expect(await page.locator('h2').textContent()).toContain('Tu carrito')



})
 */