import { EventEmitter } from '../utils/EventEmitter';

type Machin = {
	data1: string;
	data2: number;
};
export default class Test extends EventEmitter<{
	test: Machin;
	test1: string;
	test2: number;
}> {
	constructor() {
		super();
	}
}
