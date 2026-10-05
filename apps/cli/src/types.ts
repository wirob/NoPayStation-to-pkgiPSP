export interface NoPayStationEntryKeys {
  'Content ID': string
  Name: string
  'PKG direct link': string // may be the sentinel value 'MISSING'
  'File Size': string
  SHA256: string // Not used by pkgiPSP
  'Title ID': string // Not used by pkgiPSP
  Region: string // Not used by pkgiPSP
  Type: 'PSP' | 'Minis' | 'Go' | 'PC Engine' | 'NeoGeo' // Not used by pkgiPSP
  'Last Modification Date': string // Not used by pkgiPSP
  RAP: string // Not used by pkgiPSP
  'Download .RAP file': string // Not used by pkgiPSP
}

export type ContentType = 1 | 2 | 3 // content types table can be found in readme

export const DB_TYPES = ['games', 'dlcs', 'themes'] as const
export type DBTypes = (typeof DB_TYPES)[number]
