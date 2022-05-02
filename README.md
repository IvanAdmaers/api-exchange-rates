# Exchange rates

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
