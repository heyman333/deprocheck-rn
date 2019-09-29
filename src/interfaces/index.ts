interface Timestamp {
  nanoseconds: number;
  seconds: number;
  toDate: () => Date;
}

export interface SessionDateType {
  startTime: Date;
  endTime: Date;
}

export enum ShowJobType {
  ALL = 'ALL',
  DEVELOPER = 'DEVELOPER',
  DESIGNER = 'DESIGNER',
}

export interface SessionInfo {
  address: string;
  date: string;
  from: string;
  latitude: number;
  longitude: number;
  name: string;
  to: string;
}

export interface SessionInfoResponse {
  id: number;
  address: string;
  date: string;
  from: string;
  to: string;
  name: string;
}

export interface AttendeeType {
  createdAt: string;
  id: number;
  member: {
    authority: 'ADMIN' | 'MEMBER';
    id: number;
    jobGroup: ShowJobType.DESIGNER | ShowJobType.DEVELOPER;
    name: string;
    termNumber: number;
  };
  updatedAt: string;
}

export interface AttendRequest {
  latitude: number;
  longitude: number;
  name?: string;
}

export interface FBSessionTimes {
  startTime: Timestamp;
  endTime: Timestamp;
}
