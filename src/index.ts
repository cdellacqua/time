import { SerializableError } from '@cdellacqua/serializable-error';

/**
 * Time class, supports positive and negative times
 */
export class Time {
	/**
	 * regex for format (-)HH:MM:SS or (-)HH:MM
	 */
	static readonly regex = /^(-?)(\d\d):(\d\d)(:(\d\d))?$/;

	_sign: number = 1;
	
	_h: number;
	_m: number;
	_s: number;

	/** Gets the sign (1 or -1) of the current Time instance */
	get sign(): number { return this._sign; }
	/** Gets the hours (0-23) of the current Time instance */
	get h() { return this._h; }
	/** Gets the minutes (0-59) of the current Time instance */
	get m() { return this._m; }
	/** Gets the seconds (0-59) of the current Time instance */
	get s() { return this._s; }

	/**
	 * Sets the hour (0-23) of the current Time instance
	 * @param v an integer, if it exceeds the valid representation, it will overflow (for example 25 becomes 1)
	 */
	set h(v: number) {
		if (v < 0) {
			this._h = 24 + (v % 24);
		} else {
			this._h = v % 24;
		}
	}

	/**
	 * Sets the minutes (0-59) of the current Time instance
	 * @param v an integer, if it exceeds the valid representation, it will overflow (for example 60 becomes 0)
	 */
	set m(v: number) {
		if (v < 0) {
			this._m = 60 + (v % 60);
		} else {
			this._m = v % 60;
		}
		this.h += Math.floor(v / 60);
	}

	/**
	 * Sets the seconds (0-59) of the current Time instance
	 * @param v an integer, if it exceeds the valid representation, it will overflow (for example 60 becomes 0)
	 */
	set s(v: number) {
		if (v < 0) {
			this._s = 60 + (v % 60);
		} else {
			this._s = v % 60;
		}
		this.m += Math.floor(v / 60);
	}

	/**
	 * Sets the sign (1 or -1) of the current Time instance
	 * @param s +1 or -1
	 */
	set sign(s: number) {
		if (s === 1 || s === -1) {
			this._sign = s;
		} else {
			throw new SerializableError('sign must be 1 or -1');
		}
	}

	/** Returns an integer representation (including the sign) of the current instance */
	get totalSeconds(): number {
		return this._sign * (this._h * 60 * 60 + this._m * 60 + this._s);
	}

	/**
	 * Constructs a Time object
	 * @param sign +1 or -1
	 * @param h hours
	 * @param m minutes
	 * @param s seconds
	 */
	constructor(sign: number, h: number, m: number, s?: number);
	/**
	 * Constructs a Time object
	 * @param s integer representation of a Time (new Time(s).totalSeconds === s)
	 */
	constructor(s?: number);
	/**
	 * Constructs a Time object
	 * @param date the reference date the Time of day will be extracted from
	 */
	constructor(date: Date);
	/**
	 * Constructs a Time object
	 * @param str a string representation of a Time (-)HH:MM:SS or (-)HH:MM
	 */
	constructor(str: string);
	constructor(secondsOrSignOrDate?: number|Date|string, h?: number, m?: number, s?: number) {
		if (secondsOrSignOrDate === undefined || secondsOrSignOrDate === null) {
			const ref = new Date();
			this._h = ref.getHours();
			this._m = ref.getMinutes();
			this._s = ref.getSeconds();
		} else if (secondsOrSignOrDate instanceof Date) {
			const ref = secondsOrSignOrDate;
			this._h = ref.getHours();
			this._m = ref.getMinutes();
			this._s = ref.getSeconds();
		} else if (typeof secondsOrSignOrDate === 'string') {
			const matches = secondsOrSignOrDate.match(Time.regex);

			if (!matches) {
				throw new SerializableError(`invalid time format ${secondsOrSignOrDate}`);
			}

			this.sign = matches[1] === '-' ? -1 : 1,
			this._h = 0;
			this._m = 0;
			this._s = 0;
			this.s += Number(matches[5] ?? 0);
			this.m += Number(matches[3]);
			this.h += Number(matches[2]);
		} else if (m === undefined) {
			this._sign = secondsOrSignOrDate >= 0 ? 1 : -1;
			this._h = 0;
			this._m = 0;
			this._s = 0;
			this.s += this.sign * secondsOrSignOrDate;
		} else {
			this._sign = secondsOrSignOrDate >= 0 ? 1 : -1;
			this._h = 0;
			this._m = 0;
			this._s = 0;
			this.s += s ?? 0;
			this.m += m!;
			this.h += h!;
		}
	}

	/**
	 * Creates a clone of the current instance
	 */
	clone(): Time {
		return new Time(this._sign, this._h, this._m, this._s);
	}

	/**
	 * Creates a Time corresponding to 00:00:00
	 */
	static zero(): Time {
		return new Time(0);
	}

	/**
	 * Returns a Time from the current time of day
	 */
	static now(): Time {
		return new Time();
	}

	/**
	 * Returns a Time object from a string
	 * @param str a string representation of a Time
	 */
	static fromString(str: string): Time {
		return new Time(str);
	}

	/**
	 * Returns a Time object
	 * @param date the reference date the Time of day will be extracted from
	 */
	static fromDate(date: Date): Time {
		return new Time(date);
	}

	/**
	 * Returns a Date object with the time of day set according to this instance
	 * @param year year
	 * @param month month
	 * @param date date
	 */
	toDate(year: number, month: number, date: number): Date;
	/**
	 * Returns a new Date object with the time of day set according to this instance
	 * @param date the reference Date the year, month and date will be extracted from
	 */
	toDate(date: Date): Date;

	toDate(dateOrYear: number|Date, month?: number, date?: number): Date {
		const native = typeof dateOrYear === "number"
			? new Date(dateOrYear, month!, date!)
			: new Date(dateOrYear.getFullYear(), dateOrYear.getMonth(), dateOrYear.getDate());

		if (this._sign === 1) {
			native.setSeconds(this._s);
			native.setMinutes(this._m);
			native.setHours(this._h);
		} else {
			native.setSeconds(native.getSeconds() - this._s);
			native.setMinutes(native.getMinutes() - this._m);
			native.setHours(native.getHours() - this._h);
		}
		
		return native;
	}

	/**
	 * Returns true if the sign is 1, false otherwise
	 */
	get isPositive(): boolean {
		return this._sign === 1;
	}

	/**
	 * Returns true if the sign is -1, false otherwise
	 */
	get isNegative(): boolean {
		return !this.isPositive;
	}

	/**
	 * Returns a string representation for the current instance
	 * @param config configuration
	 * @param config.seconds boolean indicating whether to include or omit the seconds from the resulting string
	 * @param config.round boolean indicating whether to round or truncate the string representation without seconds
	 */
	toString({ seconds, round }: { seconds: boolean, round?: boolean} = { seconds: true }): string {
		let result;
		if (!seconds) {
			if (!round || this._s < 30) {
				result = `${(this.isNegative ? '-' : '')}${
					Math.abs(this._h).toString().padStart(2, '0')}:${
					this._m.toString().padStart(2, '0')}`;	
			} else if (this._m < 59) {
				result = `${(this.isNegative ? '-' : '')}${
					Math.abs(this._h).toString().padStart(2, '0')}:${
					(this._m + 1).toString().padStart(2, '0')}`;
			} else if (this._h < 23) {
				result = `${(this.isNegative ? '-' : '')}${
					(Math.abs(this._h) + 1).toString().padStart(2, '0')}:00`;
			} else {
				result = '00:00';
			}
		} else {
			result = `${(this.isNegative ? '-' : '')}${
				Math.abs(this._h).toString().padStart(2, '0')}:${
				this._m.toString().padStart(2, '0')}:${
				this._s.toString().padStart(2, '0')}`;
		}
		if (result === '-00:00:00' || result === '-00:00') {
			return result.substring(1);
		}
		return result;
	}

	/**
	 * Returns a string representation for the current instance
	 */
	toJSON(): string {
		return this.toString();
	}

	/**
	 * Checks whether two times are equal
	 * @param t1 first Time or string
	 * @param t2 second Time or string
	 */
	static equals(t1: Time|string, t2: Time|string) {
		if (typeof t1 === 'string') {
			t1 = Time.fromString(t1);
		}
		return t1.equals(t2);
	}
	/**
	 * Checks whether this instance is equal to another time
	 * @param that the other instance or string
	 */
	equals(that: Time|string): boolean {
		if (typeof that === 'string') {
			that = Time.fromString(that);
		}
		return this.toString() === that.toString();
	}

	/**
	 * Compares two times
	 * @param t1 first operand
	 * @param t2 second operand
	 */
	static compare(t1: Time|string, t2: Time|string) {
		if (typeof t1 === 'string') {
			t1 = Time.fromString(t1);
		}
		return t1.compare(t2);
	}
	/**
	 * Compares this instance to another time
	 * @param that the other time instance or string
	 */
	compare(that: Time|string): number {
		if (typeof that === 'string') {
			that = Time.fromString(that);
		}

		return this.totalSeconds - that.totalSeconds;
	}

	/**
	 * Adds a Time to the current instance, returning a new Time
	 * @param that the other Time or string
	 */
	add(that: Time|string): Time {
		if (typeof that === 'string') {
			that = Time.fromString(that);
		}
		return new Time(this.totalSeconds + that.totalSeconds);
	}

	/**
	 * Subtracts a Time to the current instance, returning a new Time
	 * @param that the other Time or string
	 */
	sub(that: Time|string): Time {
		if (typeof that === 'string') {
			that = Time.fromString(that);
		}
		return new Time(this.totalSeconds - that.totalSeconds);
	}
}
