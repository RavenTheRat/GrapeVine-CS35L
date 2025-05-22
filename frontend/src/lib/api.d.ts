declare interface ReqCreateEvent {
  name: String,  
  description: String,
  startDt: Date,
  endDt: Date,
}

declare interface ResCreateEvent {
  id: number
  name: String,  
  description: String,
  startDt: Date,
  endDt: Date,
}

declare function gvCreateEvent(req: ReqCreateEvent): Promise<void>;

declare interface ReqGetEvent {
  eventId: number,
}

declare interface ResGetEvent {
  name: String,
  description: String,
  startDt: Date,
  endDt: Date,
  createDt: Date,
  updateDt: Date,
  userId: number,
}

declare function gvGetEvent(req: ReqGetEvent): Promise<ResGetEvent>;

declare interface ReqUpdateEvent {
  name: String,
  description: String,
  startDt: String,
  endDt: String,
}

declare function gvUpdateEvent(req: ReqUpdateEvent): Promise<void>;

declare interface ReqDeleteEvent {
  eventId: number,
}

declare function gvDeleteEvent(req: ReqDeleteEvent): Promise<void>;
declare function gvGetEvents(): Promise<Array<ResGetEvent>>;

