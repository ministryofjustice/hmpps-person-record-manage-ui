import { buildClusterStatus, buildClusterStatusReason } from './clusterStatusHelper'

describe('clusterStatusHelper', () => {
  describe('buildClusterStatus', () => {
    it('should return green tag for ACTIVE status', () => {
      const tag = buildClusterStatus('ACTIVE')
      expect(tag).toEqual(
        expect.objectContaining({
          html: expect.stringContaining('govuk-tag govuk-tag--green'),
        }),
      )
    })

    it('should return yellow tag for MERGED status', () => {
      const tag = buildClusterStatus('MERGED')
      expect(tag).toEqual(
        expect.objectContaining({
          html: expect.stringContaining('govuk-tag govuk-tag--yellow'),
        }),
      )
    })

    it('should return yellow tag for RECLUSTER_MERGE status', () => {
      const tag = buildClusterStatus('RECLUSTER_MERGE')
      expect(tag).toEqual(
        expect.objectContaining({
          html: expect.stringContaining('govuk-tag govuk-tag--yellow'),
        }),
      )
    })

    it('should return red tag for NEEDS_ATTENTION status', () => {
      const tag = buildClusterStatus('NEEDS_ATTENTION')
      expect(tag).toEqual(
        expect.objectContaining({
          html: expect.stringContaining('govuk-tag govuk-tag--red'),
        }),
      )
    })

    it('should return text for invalid status', () => {
      const tag = buildClusterStatus('unknown')
      expect(tag).toEqual(
        expect.objectContaining({
          text: expect.stringContaining('unknown'),
        }),
      )
    })
  })

  describe('buildClusterStatusReason', () => {
    it('should return red tag for reason', () => {
      const tag = buildClusterStatusReason('BROKEN_CLUSTER')
      expect(tag).toEqual(
        expect.objectContaining({
          html: expect.stringContaining('govuk-tag govuk-tag--red'),
        }),
      )
    })

    it('should return undefined for undefined reason', () => {
      const tag = buildClusterStatusReason(undefined)
      expect(tag).toEqual(undefined)
    })
  })
})
