# Time

A Time class for JavaScript


[NPM Package](https://www.npmjs.com/package/@cdellacqua/time)

`npm install @cdellacqua/time`

## Full documentation:
* [Time](https://github.com/cdellacqua/time/blob/master/docs/classes/time.md)

## Highlights

###
Always serializes to HH:MM:SS, toString accepts a config object to change this default

```
console.log(new Time().toString());
// -> 12:59:13
console.log(Time.fromString('12:59:48').toString({ seconds: false }));
// -> 12:59
```

Convenience methods for Date <-> Time interoperability

```
console.log(Time.fromDate(new Date(2020, 0, 1, 12, 1, 59)).toString());
// -> 12:01:59
console.log(new Time(12, 1, 59).toDate(new Date(2020, 0, 1, 3)).toString()); // set to given date (ignoring hours, minutes and seconds of the given Date object)
// -> Wed Jan 01 2020 12:01:59 ...
```
