[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6b9e1d0369304849a1489323bb10e2c2)](https://app.codacy.com/manual/agonxgashi/endoc/dashboard)
[![GitHub repo size](https://img.shields.io/github/repo-size/endoc/endoc)](https://github.com/endoc/endoc/)
[![GitHub](https://img.shields.io/github/license/endoc/endoc)](https://github.com/endoc/endoc/blob/master/LICENSE)
[![Website](https://img.shields.io/website?down_color=lightgrey&down_message=Down&label=Website&up_color=green&up_message=Up&url=http%3A%2F%2Fendoc.herokuapp.com%2F)](http://endoc.herokuapp.com/)


# endoc
**A free and open-source Endpoint Documentation tool**

**Built by Developers for Developers.**

---

[![](./assets/images/endoc_mockup.png "Homepage")](http://endoc.herokuapp.com/)



## Instructions to run the application locally: 

1) Create a `.env` file on the root folder. Put on this file the necessary variables to run this application:

```TXT
JWT_SECRET=YOUR_SUPERSECRET_KEY
JWT_TIMEOUT=864000
MONGO_CON_STR=YOUR_MONGODB_CONNECTION_STRING
```

2) Build front-end part of the application: 
```Bash
# To build angular app
ng build 

# --------------------
# Or to serve the app
ng serve
```


3) Start node server using below command:

 ```Bash
node index.js
```

## Contact the developer: 
[![Telegram](https://img.shields.io/badge/-Telegram-blue?logo=Telegram)](https://t.me/agonxgashi)
[![Twitter](https://img.shields.io/badge/-Twitter-9cf?logo=Twitter)](https://twitter.com/agonxgashi)
