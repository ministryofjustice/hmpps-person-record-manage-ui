import { HTMLItem, TagColour, TagItem, TextItem } from '../types/table'
import { SUPPORTED_STATUS, SUPPORTED_STATUS_REASON } from '../../domain/constants/clusterPage'

const buildStatus = (statusCode: string): string => SUPPORTED_STATUS.get(statusCode) ?? statusCode

const buildStatusReason = (statusReasonCode: string): string =>
  statusReasonCode ? (SUPPORTED_STATUS_REASON.get(statusReasonCode) ?? '') : ''

export const buildClusterStatus = (statusCode: string): HTMLItem | TextItem => {
  const status = buildStatus(statusCode)
  switch (statusCode) {
    case 'NEEDS_ATTENTION':
      return TagItem(status, TagColour.RED)
    case 'MERGED':
    case 'RECLUSTER_MERGE':
      return TagItem(status, TagColour.YELLOW)
    case 'ACTIVE':
      return TagItem(status, TagColour.GREEN)
    default:
      return TextItem(status)
  }
}

export const buildClusterStatusReason = (statusReasonCode?: string): HTMLItem | TextItem | undefined => {
  if (!statusReasonCode) return undefined
  return TagItem(buildStatusReason(statusReasonCode), TagColour.RED)
}
