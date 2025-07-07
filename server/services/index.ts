import { dataAccess } from '../data'
import AuditService from './auditService'
// import ExampleService from './exampleService'
import PrisonRecordService from './personRecordService'

export const services = () => {
  const { applicationInfo, hmppsAuditClient, personRecordApiClient } = dataAccess()

  return {
    applicationInfo,
    auditService: new AuditService(hmppsAuditClient),
    // exampleService: new ExampleService(exampleApiClient),
    personRecordService: new PrisonRecordService(personRecordApiClient),
  }
}

export type Services = ReturnType<typeof services>
