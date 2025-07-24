import { dataAccess } from '../data'
import AuditService from './auditService'
import PersonRecordService from './personRecordService'

export const services = () => {
  const { applicationInfo, hmppsAuditClient, personRecordApiClient } = dataAccess()

  return {
    applicationInfo,
    auditService: new AuditService(hmppsAuditClient),
    personRecordService: new PersonRecordService(personRecordApiClient),
  }
}

export type Services = ReturnType<typeof services>
