import type { DBTypes, ContentType } from './types'
import fs from 'node:fs/promises'

const contentTypeByDBType: Record<DBTypes, ContentType> = {
  games: 1,
  dlcs: 2,
  themes: 3,
}

export const getContentType = (dbType: DBTypes): ContentType =>
  contentTypeByDBType[dbType]

export const writeDBFormat = () =>
  fs.writeFile(
    './dbformat.txt',
    `,\r\ncontentid,name,url,size,checksum,type,DESCRIPTION,RAP`,
  )
