type EventDescription = Record<string, any>;

type EventKey<Event extends EventDescription> = string & keyof Event;
type EventReceiver<Key> = (params: Key) => void;

interface Emitter<Event extends EventDescription> {
	on<Key extends EventKey<Event>>(eventName: Key, fn: EventReceiver<Event[Key]>): void;
	off<Key extends EventKey<Event>>(eventName: Key, fn: EventReceiver<Event[Key]>): void;
	emit<Key extends EventKey<Event>>(eventName: Key, params: Event[Key]): void;
}

class EventEmitter<Event extends EventDescription> implements Emitter<Event> {
	listeners: { [Key in keyof EventDescription]?: Array<(p: EventDescription[Key]) => void> } = {};

	constructor() {}

	on<Key extends EventKey<Event>>(key: Key, fn: EventReceiver<Event[Key]>) {
		this.listeners[key] = (this.listeners[key] || []).concat(fn);
		return this;
	}

	off<Key extends EventKey<Event>>(key: Key, fn: EventReceiver<Event[Key]>) {
		this.listeners[key] = (this.listeners[key] || []).filter((f) => f !== fn);
		return this;
	}
	emit<Key extends EventKey<Event>>(key: Key, data: Event[Key]) {
		(this.listeners[key] || []).forEach(function (fn) {
			fn(data);
		});
	}
}

export { EventDescription, EventEmitter, EventKey, Emitter, EventReceiver };
export default EventEmitter;
