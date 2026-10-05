import { AuditServiceFactory } from '@ministryofjustice/hmpps-audit-client'
import { dataAccess } from '../data'
import PersonRecordService from './personRecordService'
import logger from '../../logger'
import config from '../config'

export enum Page {
  INDEX_PAGE = 'INDEX_PAGE',
  CLUSTER_PAGE = 'CLUSTER_PAGE',
}

export const services = () => {
  const { applicationInfo, personRecordApiClient } = dataAccess()

  const auditService = AuditServiceFactory.createInstance(config.sqs.audit, logger)

  return {
    applicationInfo,
    auditService,
    personRecordService: new PersonRecordService(personRecordApiClient),
  }
}

export type Services = ReturnType<typeof services>
