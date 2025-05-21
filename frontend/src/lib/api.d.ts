
declare interface ReqCreateEvent {
  name: String,  
  description: String,
  startDt: Date,
  endDt: Date,
}

declare interface ResCreateEvent {
    eventId: number
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

declare interface PartialEvent {
  name: String | undefined,
  description: String | undefined,
  startDt: String | undefined,
  endDt: String | undefined,
}

declare interface ReqUpdateEvent {
  eventId: number,
  diff: PartialEvent,
}

declare function gvUpdateEvent(req: ReqUpdateEvent): Promise<void>;

