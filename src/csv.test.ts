import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { verifyRecord } from './csv'
import type { NoPayStationEntryKeys } from './types'

const makeRow = (
  overrides: Partial<NoPayStationEntryKeys> = {},
): NoPayStationEntryKeys => ({
  'Content ID': 'UP0000-NPXX99999_00-0000112223333000',
  Name: 'Some Item',
  'PKG direct link': 'http://example.com/item.pkg',
  'File Size': '123456',
  SHA256: 'deadbeef',
  'Title ID': 'NPXX99999',
  Region: 'US',
  Type: 'PSP',
  'Last Modification Date': '2020-01-01 00:00:00',
  RAP: '',
  'Download .RAP file': '',
  ...overrides,
})

describe('verifyRecord', () => {
  it('returns a line for a PSP game row', () => {
    const line = verifyRecord(makeRow({ Type: 'PSP' }), 'games')
    assert.notEqual(line, undefined)
  })

  it('returns a line for a Minis game row', () => {
    const line = verifyRecord(makeRow({ Type: 'Minis' }), 'games')
    assert.notEqual(line, undefined)
  })

  it('rejects a games row with an unsupported Type', () => {
    const line = verifyRecord(makeRow({ Type: 'PC Engine' }), 'games')
    assert.equal(line, undefined)
  })

  it('rejects a row with a missing direct link', () => {
    const line = verifyRecord(
      makeRow({ 'PKG direct link': 'MISSING' }),
      'games',
    )
    assert.equal(line, undefined)
  })

  it('rejects a row with an empty direct link', () => {
    const line = verifyRecord(makeRow({ 'PKG direct link': '' }), 'games')
    assert.equal(line, undefined)
  })

  it('accepts a dlcs row even without a Type column', () => {
    const row = makeRow()
    // @ts-expect-error dlcs/themes TSVs have no Type column in real data
    delete row.Type
    const line = verifyRecord(row, 'dlcs')
    assert.notEqual(line, undefined)
  })

  it('accepts a themes row even without a Type column', () => {
    const row = makeRow()
    // @ts-expect-error dlcs/themes TSVs have no Type column in real data
    delete row.Type
    const line = verifyRecord(row, 'themes')
    assert.notEqual(line, undefined)
  })

  it('matches the dbformat.txt field order', () => {
    const line = verifyRecord(makeRow(), 'games')
    assert.equal(
      line,
      'UP0000-NPXX99999_00-0000112223333000,Some Item,http://example.com/item.pkg,123456,deadbeef,1,,',
    )
  })
})
