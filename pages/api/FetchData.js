import playwright from 'playwright-core';
import { Subject } from './TableCellClass.js'

export async function LoginAndExtract(username, Password) {
	const browser = await playwright.chromium.launch();
	const page = await browser.newPage();
	page.setDefaultTimeout(7000)
	try {
	await page.goto('http://dangkyhoc.vnu.edu.vn/dang-nhap');
	await page.locator('[id="LoginName"]').fill(username)
	await page.locator('[id="Password"]').fill(Password)
	await page.locator('.btn-success').click()
	const valid = await page.locator('.validation-summary-errors').isVisible()
	if (valid) {
		await browser.close()
		throw { name: "WrongUsernamePassword"}
	}
	await page.goto('http://dangkyhoc.vnu.edu.vn/xem-va-in-ket-qua-dang-ky-hoc/1?layout=main')
	} catch (error) {
		await browser.close()
		throw error
	}

	const fetchTable = page.locator('table').nth(2).locator('tr');
	const rowCount = await fetchTable.count();

	const SubjectList = []

	for (let i = 1; i < rowCount - 1; i++) {
		const name = await fetchTable.nth(i).locator('td').nth(2).innerText()
		const ID = await fetchTable.nth(i).locator('td').nth(6).innerText()
		const Date = (await fetchTable.nth(i).locator('td').nth(7).innerText()).split(',')
		const Time = (await fetchTable.nth(i).locator('td').nth(8).innerText()).split(',')
		const where = await fetchTable.nth(i).locator('td').nth(9).innerText()

		const curSubject = new Subject(name, ID, Date, Time, where)
		SubjectList.push(curSubject)
	}
	await browser.close();
	return SubjectList
}