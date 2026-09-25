import { styleText } from 'node:util'

export const green = (text: string) => styleText('green', text)
export const gray = (text: string) => styleText('gray', text)

export const logMessage = (text: string) => console.log(gray(text))
export const logSuccess = (text: string) => console.log(green(text) + '\n')
