# Backend-Assessment

Before to try endpoints is needed authenticate with the name and email of user as shown below:
{
	"name":"Whitley",
	"email":"whitleyblankenship@quotezart.com"
}

using the next url
POST: http://localhost:3000/login

I was use the next 3d party libraries:

Express-Session:
https://github.com/expressjs/session
That allow save the current session of user after it is logged, and save the role to give permission 

Axios:
https://github.com/axios/axios
That allow use promise when use the http request
