declare namespace Express {
  export interface Request {
    db: any;
    requestId: string | string[];
    user: any;
  }
}
