import {test, expect} from '@playwright/test';
import {faker} from '@faker-js/faker';
import { TransactionPage } from '../../pageObjects/transaction/transactionPage';
import { LoginPage } from '../../pageObjects/login/LoginPage';

test('create transactions', async({ page }) => {
    await page.goto('http://127.0.0.1:5502/login.html')

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('user', 'pass')

    const transactionPage = new TransactionPage(page)
    
    for (let i=0; i <=5; i++) {
    
        await page.waitForLoadState('load');
        //await transactionPage.addTransaction()

    }

    //const actualDescription = await page.locator('#transactions-list tr:first-child > td:nth-child(3)').textContent()
    //expect(actualDescription).toBe('description transaction')

    expect(await transactionPage.getActualAmount("3")).toEqual('description transaction')

});


    /*
    for (let i = 0; i <= 10; i++) {
        await page.waitForLoadState('load');
        await page.getByRole('button', { name: 'Añadir transacción' }).click()
        //await page.locator('button[data-target="#transactionModal"]').click();
        //await page.locator('input#date').fill('2025-10-10')
        const randomDate = faker.date.between({ from: '2023-01-01', to: '2024-12-31' }); //const randomDate = faker.date.anytime();
        const formattedDate = randomDate.toISOString().split('T')[0]; // La formatea a YYYY-MM-DD (ej: "2024-03-15")
        await page.locator('input#date').fill(formattedDate)
        await page.locator('input#amount').fill(faker.number.int({min: 1, max:1000}).toString())
        await page.locator('input#description').fill('Test transaction')

        await page.getByRole('button', { name: 'Guardar' }).click()
    }
        */
