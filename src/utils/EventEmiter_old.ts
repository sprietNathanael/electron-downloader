//based on http://www.datchley.name/es6-eventemitter/
class EventEmitter {
	listeners: Map<string, Function[]>;
	constructor() {
		this.listeners = new Map();
	}

	on(label: string, callback: Function) {
		this.listeners.has(label) || this.listeners.set(label, []);
		this.listeners.get(label).push(callback);
		return this;
	}
	removeListener(label: string, callback: Function) {
		let listeners = this.listeners.get(label);
		let index;

		if (listeners && listeners.length) {
			index = listeners.reduce((i, listener, index) => {
				return listener === callback ? (i = index) : i;
			}, -1);

			if (index > -1) {
				listeners.splice(index, 1);
				this.listeners.set(label, listeners);
				return true;
			}
		}
		return false;
	}
	protected emit(label: string, ...args: any[]) {
		let listeners = this.listeners.get(label);

		if (listeners && listeners.length) {
			listeners.forEach((listener) => {
				listener(...args);
			});
			return true;
		}
		return false;
	}
}

export default EventEmitter;
