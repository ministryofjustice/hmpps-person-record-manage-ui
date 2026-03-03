import type { Record } from '../data/model/clusterDetailResponse'
import type { CanonicalRecordResponse } from '../data/model/canonicalRecordResponse'
import { Row, Table, TextItem } from './types/table'
import { RECORD_COMPOSITION_TABLE_ID } from '../domain/ids/clusterPageIds'

const buildCanonicalRecordCompositionTable = (canonicalRecordResponse: CanonicalRecordResponse): Table => {
  const rows = []
  for (const [k, v] of Object.entries(canonicalRecordResponse.canonicalRecord)) {
    rows.push(Row(TextItem(k), TextItem(v)))
  }

  return Table({
    rows,
    attributes: {
      id: RECORD_COMPOSITION_TABLE_ID,
    },
    head: [],
  })
}

export default buildCanonicalRecordCompositionTable
