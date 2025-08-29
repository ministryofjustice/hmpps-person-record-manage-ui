const timestampHelper = (timestamp: string): string => {
  const output = timestamp.split('T').join('\r\n')
  return output
}

export default timestampHelper
