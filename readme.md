## Setup and launch:

```bash
# install dependencies across all projects
npm install

# start all processes
npm start

# stop all process
npm stop
```

Then open your browser to [http://localhost:5000](http://localhost:5000)

## Usage and notes:

In order to execise the service configuration in a couple of different ways the following should be noted:
 - `Multiply` and `Division` operations call the `calculator.batch` service which in tern makes client calls to `calculator.multiply` and `calculator.division`
 - `Addition` and `Subtraction` operations calls to `calculator.addition` and `calculator.subtraction` directly from the client

Looking at the requests in the request list of Glimpse will show you each of the different requests a play and the Services tabs will show you the fetch/client calls being made.
