import timestampHelper from './timestampHelper'

describe('timestampHelper', () => {
  describe('reformat the timestamp string', () => {
    it('should return timestamp as two lines', () => {
      const input = '2025-05-12T10:37:56.087296'
      const expectedOutput = '2025-05-12\r\n10:37:56.087296'

      const output = timestampHelper(input)
      expect(output).toEqual(expectedOutput)
    })
  })
})
