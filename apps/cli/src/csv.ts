import { getContentType } from './db'
import type { DBTypes, NoPayStationEntryKeys } from './types'
import { parse } from 'csv-parse/sync'

export const parseTSV = (file: Buffer) =>
  parse<NoPayStationEntryKeys>(file, {
    bom: true,
    delimiter: '\t',
    columns: true,
    group_columns_by_name: true,
    relax_quotes: true,
  })

export function isPSPGame(type: NoPayStationEntryKeys['Type']) {
  return type === 'PSP'
}

export function isPSPMini(type: NoPayStationEntryKeys['Type']) {
  return type === 'Minis'
}

export const verifyRecord = (
  row: NoPayStationEntryKeys,
  dbType: DBTypes,
): string | undefined => {
  if (missingDirectLink(row)) return

  // Only PSP_GAMES.tsv has a Type column; dlcs/themes have no such filter
  if (dbType === 'games' && !isPSPGame(row.Type) && !isPSPMini(row.Type)) return

  return createNewDBEntryString(row, dbType)
}

const missingDirectLink = (row: NoPayStationEntryKeys) =>
  !row['PKG direct link'] || row['PKG direct link'] === 'MISSING'

const createNewDBEntryString = (
  entry: NoPayStationEntryKeys,
  dbType: DBTypes,
) => {
  const {
    SHA256,
    Name,
    'Content ID': contentId,
    'PKG direct link': pkgDirectLink,
    'File Size': fileSize,
  } = entry
  return `${contentId},${Name},${pkgDirectLink},${fileSize},${SHA256},${getContentType(dbType)},,`
}
