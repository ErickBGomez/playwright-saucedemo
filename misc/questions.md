# Related with tests
1. When and how should I encrypt the test data from .env file?

<br>

I inserted the credentials of a valid user to the checkout tests and those credentials are being loaded from .env file. I mention this because before I was inserting the credentials directly to the test suite

Now, when i execute my tests, this message shows: 
> [dotenv@17.0.1] injecting env (0) from .env – [tip] encrypt with dotenvx: https://dotenvx.com

Should I use this package? And when could be the recommended moment to encrypt some data? Related with fake test data