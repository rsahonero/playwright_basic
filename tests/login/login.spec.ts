import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pageObjects/login/LoginPage';
import { NavigateTo } from '../../pageObjects/navigate/NavigateTo';
import { TransactionPage } from '../../pageObjects/transaction/transactionPage';
import { faker } from '@faker-js/faker';

test('login', async({ page }) => {
    //await page.goto('http://127.0.0.1:5502/login.html')

    const navigateTo = new NavigateTo(page)
    await navigateTo.loginPage()

   
    const randomDate = faker.date.between({ from: '2023-01-01', to: '2024-12-31' }); //const randomDate = faker.date.anytime();
    const formattedDate = randomDate.toISOString().split('T')[0];    
    
    //const transactionDate = '2024-10-25'
    const transactionDate = formattedDate
    const transactionAmount = faker.number.int({min: 1, max:1000}).toString()
    const transactionDescription = faker.food.description()
    //const transactionDescription = 'description transaction'

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('user', 'pass')


    await page.waitForURL('http://127.0.0.1:5502/transactions.html')

    const transactionPage = new TransactionPage(page)
    await page.waitForLoadState('load');
    await transactionPage.addTransaction(transactionDate, transactionAmount, transactionDescription)


    expect(await transactionPage.getActualAmount("1")).toEqual(transactionAmount)
    expect(await transactionPage.getActualDescription("1")).toEqual(transactionDescription)
    expect(await transactionPage.getActualDate("1")).toEqual(transactionDate)


     
    
    
    

});


    //await page.locator(':text-is("Guardar")').click()
    //await page.getByLabel('Guardar').click()
    //await page.locator('button.btn-primary').click()

    //await page.locator('input#username').fill('user')
    //await page.getByTestId('username').fill('user')
    /*await page.getByRole('textbox', { name: 'Nombre de usuario:' }).fill('user')
    await page.locator('input#password').fill('pass')
    await page.locator('button.btn-primary').click() */
    //await page.getByLabel('Iniciar sesión').click()

    //Table - transactions-list
   /* const actualDate = await page.locator("//tbody[@id='transactions-list']//tr[1]//td[1]").textContent()
    const actualDescription = await page.locator("//tbody[@id='transactions-list']//tr[1]//td[3]").textContent()


    expect(actualDate).toBe('2023-06-01')
    expect(actualDescription).toBe('Test transaction')
    */

    //Second option - transaction list
    //const actualDate = await page.getByTestId('transactions-list').locator('tr').first().locator('td').nth(0).textContent()


    /* await page.waitForLoadState('load');
    await page.getByText('Añadir transacción').click()
    await page.locator('id=date').fill('2023-06-01')
    await page.locator('input#amount').fill('100')
    await page.locator('input#description').fill('Test transaction')
    await page.getByRole('button', { name: 'Guardar' }).click()
    */

    
    //const actualDate = await page.locator('#transactions-list tr:first-child > td:first-child').textContent()
    //const actualDescription = await page.locator('#transactions-list tr:first-child > td:nth-child(3)').textContent()

    //expect(actualDate).toBe('2023-06-01')
    //expect(actualDescription).toBe('Test transaction')