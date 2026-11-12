import {test, expect} from '@playwright/test';
import { RegistroPage } from '../../pageObjects/registro/RegistroPage';

test("Registro de usuario", async ({ page }, testInfo) => {
  
    await page.goto('http://127.0.0.1:5501/register.html')

    const name = 'Valentina'
    const lastName = 'Smith'
    const age = '25'
    const country = 'Argentina'
    const email = 'valentina.smith@example.com'


    //Registro del usuario
  
    const registroPage = new RegistroPage(page)
    await registroPage.addRegistro(name, lastName, age, country, email)

    
    //la promesa se rechaza o se acepta
    const[summaryPage] = await Promise.all(
        [   //se emite cuando la pagina habre un nuevo tab o una ventana
            page.waitForEvent('popup'), 
            //escucha el evento antes de hacer click
            page.locator('button#save-btn').click()
        ]
    )

    await summaryPage.waitForLoadState() // esperamos a que se cargue la nueva pagina
    await expect(summaryPage).toHaveTitle('Summary')
    //await page.locator('button#save-btn').click()
    
    const currentName = await summaryPage.locator('p').filter({ hasText: 'Nombre:' }).textContent()
    const currentLastName = await summaryPage.locator('p').filter({hasText: 'Apellido:'}).textContent()
    const currentAge = await summaryPage.locator('p').filter({hasText: 'Edad:'}).textContent()

    expect(currentName).toContain(name)
    expect(currentLastName).toContain(lastName)
    expect(currentAge).toContain(age)

    //Generar captura de pantalla de la página de resumen y adjuntarla al informe de prueba
    //await summaryPage.screenshot({path:'screenshots/summary.png'})
    /*await testInfo.attach('summary', {
        body: await summaryPage.screenshot(),
        contentType: 'image/png'
    })
    */


});


/**
 * test("Registro de usuario", async ({ page }, testInfo) => {
  
    await page.goto('http://127.0.0.1:5501/register.html')

    const name = 'Valentina'
    const lastName = 'Smith'
    const age = '25'
    const country = 'Argentina'
    const email = 'valentina.smith@example.com'


    //Registro del usuario
    await page.locator('input#name').fill(name)
    await page.locator('input#last-name').fill(lastName)
    await page.locator('input#age').fill(`${age}`)
    //await page.locator('select#country').selectOption('Argentina')
    await page.getByRole('combobox', {name: 'País:'}).selectOption(`${country}`)
    await page.locator('input#sex-f').check()
    await page.locator('input#email').fill(`${email}`)
    await page.getByLabel('Martes').check()
    await page.getByLabel('Miercoles').check()
    await page.getByLabel('Jueves').check()
    await page.getByRole('button', {name:'Foto de perfil:'}).setInputFiles('images/image.png')

    /*await testInfo.attach('register', {
        body: await page.screenshot(),
        contentType: 'image/png'
    })
    
    //await page.screenshot({path:'screenshots/register.png', fullPage:true})
    
    //la promesa se rechaza o se acepta
    const[summaryPage] = await Promise.all(
        [   //se emite cuando la pagina habre un nuevo tab o una ventana
            page.waitForEvent('popup'), 
            //escucha el evento antes de hacer click
            page.locator('button#save-btn').click()
        ]
    )

    await summaryPage.waitForLoadState() // esperamos a que se cargue la nueva pagina
    await expect(summaryPage).toHaveTitle('Summary')
    //await page.locator('button#save-btn').click()
    
    const currentName = await summaryPage.locator('p').filter({ hasText: 'Nombre:' }).textContent()
    const currentLastName = await summaryPage.locator('p').filter({hasText: 'Apellido:'}).textContent()
    const currentAge = await summaryPage.locator('p').filter({hasText: 'Edad:'}).textContent()

    expect(currentName).toContain(name)
    expect(currentLastName).toContain(lastName)
    expect(currentAge).toContain(age)

    //Generar captura de pantalla de la página de resumen y adjuntarla al informe de prueba
    //await summaryPage.screenshot({path:'screenshots/summary.png'})
    /*await testInfo.attach('summary', {
        body: await summaryPage.screenshot(),
        contentType: 'image/png'
    })
    

    });
 **/