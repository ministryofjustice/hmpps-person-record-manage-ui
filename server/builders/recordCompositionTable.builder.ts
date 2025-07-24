import {
  RECORD_COMPOSITION_NAME_TABLE_HEADING,
  RECORD_COMPOSITION_SOURCE_SYSTEM_ID_TABLE_HEADING,
  RECORD_COMPOSITION_SOURCE_SYSTEM_TABLE_HEADING,
} from '../domain/constants/clusterPage'
import type { Record } from '../data/model/clusterDetailResponse'
import { Heading, Row, Table, TextItem } from './types/table'

const buildReadableName = (record: Record) => {
  return [record.firstName, record.middleName, record.lastName].filter(name => name != null || name === '').join(' ')
}

const buildRecordCompositionTable = (records: Record[]): Table => {
  const rows = records.map(record => {
    return Row(TextItem(record.sourceSystemId), TextItem(buildReadableName(record)), TextItem(record.sourceSystem))
  })

  return Table({
    head: [
      Heading(RECORD_COMPOSITION_SOURCE_SYSTEM_ID_TABLE_HEADING),
      Heading(RECORD_COMPOSITION_NAME_TABLE_HEADING),
      Heading(RECORD_COMPOSITION_SOURCE_SYSTEM_TABLE_HEADING),
    ],
    rows,
    attributes: {
      id: 'record-composition-table-id',
    },
  })
}

export default buildRecordCompositionTable
