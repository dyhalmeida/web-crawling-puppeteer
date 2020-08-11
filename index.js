const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/montagensdacolina');

    // Função executada no browser
    const imageList = await page.evaluate(() => {
        const nodeList = document.querySelectorAll('article img');
        const imageArray = [...nodeList];
        return imageList = imageArray.map(({src}) => ({src}));
    });

    fs.writeFile('montagensdacolina.json', JSON.stringify(imageList, null, 2), (error) => {
        if (error) {
            throw new Error('Erro ao capturar dados');
        }
        console.log('Dados capturados com sucesso!');
    });
    
    await browser.close();
})();