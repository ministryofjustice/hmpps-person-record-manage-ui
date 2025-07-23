import type { Express } from 'express'
import request from 'supertest'
import { appWithAllRoutes } from './testutils/appSetup'

let app: Express

beforeEach(() => {
  app = appWithAllRoutes({})
})

afterEach(() => {
  jest.resetAllMocks()
})

describe('search not found', () => {
  it('should redirect search when cluster not found', () => {
    return request(app)
      .post('/search')
      .expect(302)
      .expect(res => {
        expect(res.redirect).toEqual(true)
      })
  })
})
