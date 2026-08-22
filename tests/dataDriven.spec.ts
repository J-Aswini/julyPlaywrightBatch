import { test, expect } from '@playwright/test';
import testData from '../test-data/jsonData.json'
import fs from 'fs'
import {parse} from 'csv-parse/sync'
import XLSX from 'xlsx'

test('read data from json', async ({ page }) => {
console.log(testData)
console.log(JSON.stringify(testData))
// const data = fs.readFileSync('test-data/jsonData.json', 'utf-8')
// console.log(JSON.stringify(data))
});

test('read data from csv', async ({ page }) => {
type userdata= { 
    userName: string,
    password: string,
    index: number,
    expected: string
}
const file = fs.readFileSync('test-data/users.csv')
const data: userdata[] = parse(file, {
    columns: true
})
console.log(JSON.stringify(data))
});

test('read data from excel', async ({ page }) => {

const file = XLSX.readFile('test-data/Book1.xlsx')
const sheet = file.Sheets['Sheet1']
const data = XLSX.utils.sheet_to_json(sheet)
console.log(JSON.stringify(data))
});