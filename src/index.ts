import fs from 'node:fs/promises'
import { logMessage, logSuccess } from './logger'
import { writeDBFormat } from './db'
import { parseTSV, verifyRecord } from './csv'
import { Command } from '@commander-js/extra-typings'
import packageJson from '../package.json'
import { DB_TYPES } from './types'

const program = new Command()

program
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version)

program
  .option('--no-games', 'Do not create a games DB')
  .option('--no-themes', 'Do not create a themes DB')
  .option('--no-dlcs', 'Do not create a dlcs DB')
  .action(async (options) => {
    logSuccess('Starting the tsv transformer')

    const start = new Date()

    logMessage('Creating dbformat.txt')
    await writeDBFormat()
    logSuccess('Created dbformat.txt')

    const dbTypes = DB_TYPES.filter((dbType) => options[dbType])

    if (dbTypes.length === 0) logMessage(`No DB(s) will be created`)

    for (const dbType of dbTypes) {
      try {
        const dbNamePrefix = `PSP_`
        const dbFileType = `.tsv`
        const dbFileName = dbNamePrefix + dbType.toUpperCase() + dbFileType

        logMessage(`Reading ${dbFileName}`)

        const file = await fs.readFile(`./${dbFileName}`)

        logSuccess(`Successfully read ${dbFileName}`)

        logMessage('Parsing tsv file')

        const records = parseTSV(file)

        logSuccess(`Successfully parsed ${dbFileName}`)

        logMessage(`Filtering rows and building pkgi_${dbType}.txt`)

        const lines = records
          .map((item) => verifyRecord(item, dbType))
          .filter((line): line is string => line !== undefined)

        await fs.writeFile(`./pkgi_${dbType}.txt`, lines.join('\r\n'))

        logSuccess(
          `Successfully wrote ${lines.length} records to pkgi_${dbType}.txt`,
        )
      } catch (error) {
        console.error(`Failed to process ${dbType}:`, error)
      }
    }

    const end = new Date()
    logSuccess(`\nFinished!`)
    logSuccess(`This operation took: ${end.getTime() - start.getTime()}ms`)
  })

program.parse(process.argv)
