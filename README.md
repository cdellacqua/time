# Time

A Time class for JavaScript

## Full documentation:
* [Time](https://github.com/cdellacqua/time/blob/master/docs/classes/time.md)

## Highlights

###
Always serializes to HH:MM:SS (or -HH:MM:SS if the time is negative), toString accepts a config object to change this default

```
console.log(new Time().toString());
// -> 12:59:13
console.log(Time.fromString('12:59:48').toString({ seconds: false }));
// -> 12:59
console.log(Time.fromString('-12:59:48').toString({ seconds: false, round: true }));
// -> -13:00
console.log(new Time(-1, 8, 59, 1).toJSON());
// -> "-08:59:01"
```

Convenience methods for Date <-> Time interoperability

```
console.log(Time.fromDate(new Date(2020, 0, 1, 12, 1, 59)).toString());
// -> 12:01:59
console.log(new Time(-1, 12, 1, 59).toDate(2020, 0, 1).toString()); // negative Time => subtracts to given date (ignoring hours, minutes and seconds of the given Date object)
// -> Tue Dec 31 2019 11:58:01 ...
console.log(new Time(1, 12, 1, 59).toDate(new Date(2020, 0, 1, 3)).toString()); // positive Time => set to given date (ignoring hours, minutes and seconds of the given Date object)
// -> Wed Jan 01 2020 12:01:59 ...
```
