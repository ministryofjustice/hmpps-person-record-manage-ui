import type { Request, Response, NextFunction } from 'express'

export default function createSearchHandler() {
  return (req: Request, res: Response, next: NextFunction): void => {
    return res.redirect('/')
  }
}
