import { Time } from "../src/index";

beforeAll(() => {
	console.error = jest.fn();
});

describe('constructors', function () {
	it('constructs using the default constructor', () => {
		const now = new Date();
		expect(new Time().totalSeconds).toEqual(Math.floor((now.getTime() - new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()) / 1000));
	});
	it('constructs with a specific ms', () => {
		expect(new Time(1).totalSeconds).toEqual(1);
	});	
	it('constructs h, m, s', () => {
		expect(new Time(12, 0, 59).totalSeconds).toEqual(12 * 60 * 60 + 59);
		expect(new Time(12, 2).totalSeconds).toEqual(12 * 60 * 60 + 2 * 60);
	});	
	it('static constructors', () => {
		expect(Time.now()).toEqual(new Time());
		expect(Time.zero()).toEqual(new Time(0));
	});	
});

describe('converts to Time', function () {
	it('string to Time', () => {
		expect(Time.fromString('12:00:00').toString()).toEqual('12:00:00');
		expect(Time.fromString('12:00:59').toString({ seconds: false })).toEqual('12:00');
	});
	it('invalid string to DateOnly', () => {
		expect(() => Time.fromString('12-00:11')).toThrow();
	});
	it('Date to Time', () => {
		expect(Time.fromDate(new Date(2020, 1, 10, 12, 0, 15)).toDate(2020, 1, 10)).toEqual(new Date(2020, 1, 10, 12, 0, 15));
		expect(Time.fromDate(new Date(2020, 1, 10, 12, 0, 15)).toDate(new Date(2020, 1, 10))).toEqual(new Date(2020, 1, 10, 12, 0, 15));
		expect(Time.fromDate(new Date(2020, 1, 10, 12, 0, 15)).toDate(new Date(2020, 1, 10, 15))).toEqual(new Date(2020, 1, 10, 12, 0, 15));
		expect(new Time(1, 0, 23).toDate(new Date(2020, 1, 9))).toEqual(new Date(2020, 1, 9, 1, 0, 23));
	});
	it('tests all possible roundings', () => {
		for (let h = 0; h < 24; h++) {
			for (let m = 0; m < 60; m++) {
				for (let s = 0; s < 60; s++) {
					let mFix = s >= 30 ? m + 1 : m;
					let hFix = h;
					if (mFix === 60) {
						hFix++;
						mFix = 0;
					}
					if (hFix === 24) {
						hFix = 0;
					}

					expect(new Time(h, m, s).toString({seconds: false, round: true})).toEqual(`${hFix.toString().padStart(2, '0')}:${mFix.toString().padStart(2, '0')}`);
				}
			}
		}
	});
});

describe('converts to string', function () {
	it('Time to JSON', () => {
		expect(Time.fromString('12:00:00').toJSON()).toEqual('12:00:00');
	});
});


describe('accessors methods', function () {
	it('access h, m, s', () => {
		let t = new Time(12, 10, 11)
		expect(t.h).toEqual(12);
		expect(t.m).toEqual(10);
		expect(t.s).toEqual(11);
	});

	it('adds without overflows', () => {
		const t = new Time(12, 10, 11);
		t.s += 3;
		expect(t.s).toEqual(14);
		t.m += 10;
		expect(t.m).toEqual(20);
		t.h += 11;
		expect(t.h).toEqual(23);
	});

	it('adds with overflows', () => {
		const t = new Time(12, 10, 11);
		t.s += 123;
		expect(t.s).toEqual(14);
		expect(t.m).toEqual(12);
		t.m += 50 + 60;
		expect(t.m).toEqual(2);
		expect(t.h).toEqual(14);
		t.h += 12 + 24;
		expect(t.h).toEqual(2);
	});

	it('subs without overflows', () => {
		const t = new Time(12, 10, 11);
		t.s += -3;
		expect(t.s).toEqual(8);
		t.m -= 10;
		expect(t.m).toEqual(0);
		t.h -= 11;
		expect(t.h).toEqual(1);
	});

	it('subs with overflows', () => {
		const t = new Time(12, 10, 11);
		t.s -= 123;
		expect(t.s).toEqual(8);
		expect(t.m).toEqual(8);
		t.m -= 50 + 60;
		expect(t.m).toEqual(18);
		expect(t.h).toEqual(10);
		t.h -= 12 + 24;
		expect(t.h).toEqual(22);
	});
});

describe('clone', function () {
	it('clones Time', () => {
		expect(Time.fromString('12:00:00').clone().toJSON()).toEqual('12:00:00');
	});
});

describe('sum and subtraction of times', () => {
	it('adds 2 times without overflow', () => {
		expect(Time.fromString('12:00:00').add('01:00:59').toString()).toEqual('13:00:59');
	});
	it('adds 2 times with overflow', () => {
		expect(Time.fromString('12:00:00').add(Time.fromString('23:00:59')).toString()).toEqual('11:00:59');
	});
	it('subs 2 times without overflow', () => {
		expect(Time.fromString('12:00:00').sub(Time.fromString('01:00:59')).toString()).toEqual('10:59:01');
	});
	it('subs 2 times with overflow', () => {
		expect(Time.fromString('12:00:00').sub(Time.fromString('12:00:59')).toString()).toBe('00:00:59');
	});
});

describe('comparison operators', () => {
	it('compares Time objects', () => {
		expect(new Time('20:00:00').compare('21:00:00')).toBeLessThan(0);
		expect(new Time('21:00:00').compare(new Time('23:59:59'))).toBeLessThan(0);
		expect(new Time('21:00:00').compare('00:00:00')).toBeGreaterThan(0);
		expect(new Time('23:59:59').compare('00:00:00')).toBeGreaterThan(0);
	});

	it('compares Time objects using static methods', () => {
		expect(Time.compare(new Time('20:00:00'), '21:00:00')).toBeLessThan(0);
		expect(Time.compare('21:00:00', new Time('23:59:59'))).toBeLessThan(0);
		expect(Time.compare(new Time('21:00:00'), new Time('00:00:00'))).toBeGreaterThan(0);
		expect(Time.compare('23:59:59', '00:00:00')).toBeGreaterThan(0);
	});
});
