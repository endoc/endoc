[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6b9e1d0369304849a1489323bb10e2c2)](https://app.codacy.com/manual/agonxgashi/endoc/dashboard)
[![GitHub repo size](https://img.shields.io/github/repo-size/endoc/endoc)](https://github.com/endoc/endoc/)
[![GitHub](https://img.shields.io/github/license/endoc/endoc)](https://github.com/endoc/endoc/blob/master/LICENSE)
[![Website](https://img.shields.io/website?down_color=lightgrey&down_message=Down&label=Website&up_color=green&up_message=Up&url=http%3A%2F%2Fendoc.herokuapp.com%2F)](http://endoc.herokuapp.com/)


# endoc
**A free and open-source Endpoint Documentation tool**

**Built by Developers for Developers.**

---

*Note: This project is under heavy construction. As such, the API may change dramatically between major releases and documentation is lacking.*

[![](./assets/images/endoc_mockup.png "Homepage")](http://endoc.herokuapp.com/)



## Instructions to run the application: 

1) Create a file on `/env` folder and name it `config.json`. Paste on this file the code below:

```JSON
{
  "Port": 3000,
  "DB": {
    "Mongo_ConStr": "<<YOUR_MONGODB_CON_STRING>>"
  },
  "JWT_SECRET": "<<YOUR_JWT_SECRET_KEY>>",
  "JWT_TIMEOUT": 86400
}
```

2) Navigate to `/client` folder to build Angular project. Run below command on your terminal: 
```Bash
ng build 
```

3) Navigate back to root folder and start node server using below command:

 ```Bash
node index.js
```

## Contact the developer: 
[![Telegram](https://img.shields.io/badge/-Telegram-blue?logo=Telegram)](https://t.me/agonxgashi)
[![Twitter](https://img.shields.io/badge/-Twitter-9cf?logo=Twitter)](https://twitter.com/agonxgashi)
