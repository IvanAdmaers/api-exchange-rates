# Exchange rates

## API

**European Central Bank**

*Latest*

Get the latest exchange rates

/ecb/latest

*Historical*

Get the historical exchange rates for a specific day

/ecb/:date

Where :date is a date from 4 January, 1999 in YYYY-MM-DD format.
Example: /ecb/1999-01-04

*Timeseries*

Get historical rates between two dates

/ecb/timeseries

Required GET parameters:

* start_date - the start date
* end_date - the end date

**Available parameters**

* base - a three-letter code of the base currency you need. Default is USD. Example: `base=EUR`

* symbols - comma-separated list of currency codes to filter output currencies.
Example: `symbols=AUD,CAD,EUR,GBP,USD`

* amount - amount to convert. Default is 1.
Example: `amount=100`

## Development

**Make sure .env file is fill**

1. npm run dev

## Production

**Make sure .env file is fill**

1. npm run webpack:build

2. npm run start

## Error codes
Error Code | Description
--- | ---
404 | Not found 
201 | An invalid base currency has been entered
202 | An invalid amount has been entered
203 | An invalid date has been specified [historical]
204 | No or an invalid 'start_date' has been specified [timeseries]
205 | No or an invalid 'end_date' has been specified [timeseries]
206 | The period specified is too long, expected up to and including 366 days
207 | The current request did not return any results
