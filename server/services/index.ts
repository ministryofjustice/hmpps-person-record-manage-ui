import { dataAccess } from '../data'
import AuditService from './auditService'
// import ExampleService from './exampleService'
import PersonRecordService from './personRecordService'

export const services = () => {
  const { applicationInfo, hmppsAuditClient, personRecordApiClient } = dataAccess()

  return {
    applicationInfo,
    auditService: new AuditService(hmppsAuditClient),
    // exampleService: new ExampleService(exampleApiClient),
    personRecordService: new PersonRecordService(personRecordApiClient),
  }
}

export type Services = ReturnType<typeof services>
