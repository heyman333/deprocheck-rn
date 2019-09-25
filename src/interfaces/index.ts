export interface SessionDateType {
  startTime: Date;
  endTime: Date;
}

export enum ShowJobType {
  ALL,
  DEVELOPER,
  DESGINER,
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
    jobGroup: 'DEVELOPER' | 'DESGINER';
    name: string;
    termNumber: number;
  };
  updatedAt: string;
}
