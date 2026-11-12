import {test, expect} from '@playwright/test'
import {faker} from '@faker-js/faker'
import { CheckoutPage } from '../../pageObjects/cart/CheckoutPage'

test('Anadir al carrito', async  ({page}) => {

    await page.goto('http://127.0.0.1:5500/')

    await page.getByRole('button', { name: 'Añadir al carrito' }).nth(1).click()
    await page.locator('button#view-cart-btn').click()
    expect(await page.locator('h2').textContent()).toContain('Tu carrito')
   

    //Checkout
   
    await page.locator('button#checkout-btn').click()
    const checkoutPage = new CheckoutPage(page)
    checkoutPage.fillCheckOutInfo()
    await page.waitForLoadState('load');
    await page.locator("//a[@href='#paymentInfo']").click()
    checkoutPage.fillPaymentInfo('10-2028')
    await page.locator('button#place-order-btn').click()
 
    
    expect(page.locator('div#order-summary')).toBeVisible()
    expect(page.getByText('¡Tu compra fue exitosa!')).toBeVisible()


})

/**
 * test('Anadir al carrito', async  ({page}) => {

    await page.goto('http://127.0.0.1:5500/')

    await page.getByRole('button', { name: 'Añadir al carrito' }).nth(1).click()
    await page.locator('button#view-cart-btn').click()
    expect(await page.locator('h2').textContent()).toContain('Tu carrito')
    

    //Checkout
    await page.locator('button#checkout-btn').click()
    await page.locator('input#name').fill(faker.person.fullName())
    await page.locator('input#email').fill(faker.internet.email())
    await page.locator('input#address').fill(faker.location.streetAddress())

    //await page.getByRole('link', {name: 'Información personal'}).click()
    //const personalInfoLink = page.locator('a.card-link.collapsed', { hasText: "Información personal" }).hover()
    //personalInfoLink.click()
    await page.waitForLoadState('load');
    //await page.locator('a.card-link.collapsed', { hasText: "Información personal" }).click()
    await page.locator("//a[@href='#paymentInfo']").click()
    await page.locator('input#card-number').fill(faker.finance.creditCardNumber())
    await page.locator('input#card-expiry').fill('10-2028')
    await page.locator('input#card-cvc').fill(faker.finance.creditCardCVV())
    await page.locator('button#place-order-btn').click()
    
    expect(await page.locator('div#order-summary')).toBeVisible()
    expect(page.getByText('¡Tu compra fue exitosa!')).toBeVisible()


})
 */