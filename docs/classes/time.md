[@cdellacqua/time](../README.md) › [Time](time.md)

# Class: Time

Time class that supports the range 00:00:00 - 23:59:59

## Hierarchy

* **Time**

## Index

### Constructors

* [constructor](time.md#constructor)

### Properties

* [_h](time.md#_h)
* [_m](time.md#_m)
* [_s](time.md#_s)
* [regex](time.md#static-readonly-regex)

### Accessors

* [h](time.md#h)
* [m](time.md#m)
* [s](time.md#s)
* [totalSeconds](time.md#totalseconds)

### Methods

* [add](time.md#add)
* [clone](time.md#clone)
* [compare](time.md#compare)
* [equals](time.md#equals)
* [sub](time.md#sub)
* [toDate](time.md#todate)
* [toJSON](time.md#tojson)
* [toLocaleString](time.md#tolocalestring)
* [toString](time.md#tostring)
* [compare](time.md#static-compare)
* [equals](time.md#static-equals)
* [fromDate](time.md#static-fromdate)
* [fromString](time.md#static-fromstring)
* [now](time.md#static-now)
* [zero](time.md#static-zero)

## Constructors

###  constructor

\+ **new Time**(`h?`: undefined | number, `m?`: undefined | number, `s?`: undefined | number): *[Time](time.md)*

Constructs a Time object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`h?` | undefined &#124; number | hours |
`m?` | undefined &#124; number | minutes |
`s?` | undefined &#124; number | seconds  |

**Returns:** *[Time](time.md)*

\+ **new Time**(`s?`: undefined | number): *[Time](time.md)*

Constructs a Time object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`s?` | undefined &#124; number | seconds  |

**Returns:** *[Time](time.md)*

\+ **new Time**(`date`: Date): *[Time](time.md)*

Constructs a Time object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`date` | Date | the reference date the Time of day will be extracted from  |

**Returns:** *[Time](time.md)*

\+ **new Time**(`str`: string): *[Time](time.md)*

Constructs a Time object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`str` | string | a string representation of a Time HH:MM:SS or HH:MM  |

**Returns:** *[Time](time.md)*

## Properties

###  _h

• **_h**: *number*

___

###  _m

• **_m**: *number*

___

###  _s

• **_s**: *number*

___

### `Static` `Readonly` regex

▪ **regex**: *RegExp‹›* = /^(\d\d):(\d\d)(:(\d\d))?$/

regex for format HH:MM:SS or HH:MM

## Accessors

###  h

• **get h**(): *number*

Gets the hours (0-23) of the current Time instance

**Returns:** *number*

• **set h**(`v`: number): *void*

Sets the hour (0-23) of the current Time instance

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`v` | number | an integer, if it exceeds the valid representation, it will overflow (for example 25 becomes 1)  |

**Returns:** *void*

___

###  m

• **get m**(): *number*

Gets the minutes (0-59) of the current Time instance

**Returns:** *number*

• **set m**(`v`: number): *void*

Sets the minutes (0-59) of the current Time instance

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`v` | number | an integer, if it exceeds the valid representation, it will overflow (for example 60 becomes 0)  |

**Returns:** *void*

___

###  s

• **get s**(): *number*

Gets the seconds (0-59) of the current Time instance

**Returns:** *number*

• **set s**(`v`: number): *void*

Sets the seconds (0-59) of the current Time instance

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`v` | number | an integer, if it exceeds the valid representation, it will overflow (for example 60 becomes 0)  |

**Returns:** *void*

___

###  totalSeconds

• **get totalSeconds**(): *number*

Returns an integer representation of the current instance

**Returns:** *number*

## Methods

###  add

▸ **add**(`that`: [Time](time.md) | string): *[Time](time.md)*

Adds a Time to the current instance, returning a new Time

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`that` | [Time](time.md) &#124; string | the other Time or string  |

**Returns:** *[Time](time.md)*

___

###  clone

▸ **clone**(): *[Time](time.md)*

Creates a clone of the current instance

**Returns:** *[Time](time.md)*

___

###  compare

▸ **compare**(`that`: [Time](time.md) | string): *number*

Compares this instance to another time

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`that` | [Time](time.md) &#124; string | the other time instance or string  |

**Returns:** *number*

___

###  equals

▸ **equals**(`that`: [Time](time.md) | string): *boolean*

Checks whether this instance is equal to another time

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`that` | [Time](time.md) &#124; string | the other instance or string  |

**Returns:** *boolean*

___

###  sub

▸ **sub**(`that`: [Time](time.md) | string): *[Time](time.md)*

Subtracts a Time to the current instance, returning a new Time. If the difference yields a negative result, the absolute value is considered

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`that` | [Time](time.md) &#124; string | the other Time or string  |

**Returns:** *[Time](time.md)*

___

###  toDate

▸ **toDate**(`year`: number, `month`: number, `date`: number): *Date*

Returns a Date object with the time of day set according to this instance

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`year` | number | year |
`month` | number | month |
`date` | number | date  |

**Returns:** *Date*

▸ **toDate**(`date`: Date): *Date*

Returns a new Date object with the time of day set according to this instance

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`date` | Date | the reference Date the year, month and date will be extracted from  |

**Returns:** *Date*

▸ **toDate**(): *Date*

Returns a new Date object with the time of day set according to this instance

**Returns:** *Date*

___

###  toJSON

▸ **toJSON**(): *string*

Returns a string representation for the current instance

**Returns:** *string*

___

###  toLocaleString

▸ **toLocaleString**(`locales?`: string[] | string, `options?`: Intl.DateTimeFormatOptions): *string*

Returns a string representing the current time using the native toLocaleTimeString of the Date type.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`locales?` | string[] &#124; string | an array of locales or a specific locale |
`options?` | Intl.DateTimeFormatOptions | the Intl.DateFormatOptions object  |

**Returns:** *string*

___

###  toString

▸ **toString**(`__namedParameters`: object): *string*

Returns a string representation for the current instance

**Parameters:**

▪`Default value`  **__namedParameters**: *object*= { seconds: true }

Name | Type |
------ | ------ |
`round` | undefined &#124; false &#124; true |
`seconds` | boolean |

**Returns:** *string*

___

### `Static` compare

▸ **compare**(`t1`: [Time](time.md) | string, `t2`: [Time](time.md) | string): *number*

Compares two times

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`t1` | [Time](time.md) &#124; string | first operand |
`t2` | [Time](time.md) &#124; string | second operand  |

**Returns:** *number*

___

### `Static` equals

▸ **equals**(`t1`: [Time](time.md) | string, `t2`: [Time](time.md) | string): *boolean*

Checks whether two times are equal

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`t1` | [Time](time.md) &#124; string | first Time or string |
`t2` | [Time](time.md) &#124; string | second Time or string  |

**Returns:** *boolean*

___

### `Static` fromDate

▸ **fromDate**(`date`: Date): *[Time](time.md)*

Returns a Time object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`date` | Date | the reference date the Time of day will be extracted from  |

**Returns:** *[Time](time.md)*

___

### `Static` fromString

▸ **fromString**(`str`: string): *[Time](time.md)*

Returns a Time object from a string

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`str` | string | a string representation of a Time  |

**Returns:** *[Time](time.md)*

___

### `Static` now

▸ **now**(): *[Time](time.md)*

Returns a Time from the current time of day

**Returns:** *[Time](time.md)*

___

### `Static` zero

▸ **zero**(): *[Time](time.md)*

Creates a Time corresponding to 00:00:00

**Returns:** *[Time](time.md)*
