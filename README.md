# Acme Surveys
## Description
---

It's an application to create and answer surveys. Surveys can have an unlimited number of fields and answers.
## About
### tecnologies
1. Nodejs
2. Express
3. Microsoft SQL Server

---
## Mount app
1. Clone this repository
```bash
git clone https://github.com/juampam/acme-surveys.git acme-surveys
```
2. You need [Node js](https://nodejs.org/es/download/) and [Microsoft SQL Server.](https://www.microsoft.com/es-es/sql-server/sql-server-downloads)
(Follow the links and install them)
3. If you are using GNU/Linux
#### Install Node and NPM
- Arch Linux
```bash
pacman -S nodejs npm
```
- Debian
```bash
sudo apt install nodejs
sudo apt install npm
```
(The official Node.js binary distributions also can be found [here](https://github.com/nodesource/distributions/blob/master/README.md))
#### Install Microsoft SQL Server
- You can use Docker
```bash
sudo docker pull mcr.microsoft.com/mssql/server:2019-latest 
```
and run
```bash
sudo docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Database-2022" \
   -p 1433:1433 --name sql1 --hostname sql1 \
   -d mcr.microsoft.com/mssql/server:2019-latest
```

**Note.** The default username is 'sa' and the password is 'Database-2022', make sure to change these values in the 
[connection]() file.
- then install [Azure Data Studio](https://docs.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio?view=sql-server-ver15o), copy and paste the /database/query.sql content and execute it.
### Microsoft SQL Server configuration (Windows)
- login with Windows Authentication.
- Run the [Database query](https://github.com/juampam/acme-surveys/blob/master/database/create.sql) using Microsoft SQL Management Studio.
### create a new login:
- Go to **Object Explorer** > **Server** > **Security**    
- Right click in **Logins** and select **New Login**
- Enable the **SQL Server authentication** option
- Type the username: *user* and the password: *1234*

**Note.** These parameters are in the **connection** file, if you change them be sure to change the values ​​of the parameters in this file..

Open SQL Server Configuration manager, and turn on **SQL Server Broswer** and **SQL Server Agent**.

---

## Using the App
**Note.** Functions are intended to work in conjunction with Frontend components. Nevertheless these functionalities will be available in the next commit. For now you can find the routes in the **Postman collection**.

### Generate token function
This function is to add authentication to perform other functions that need permissions. At the time of linking to the frontend, when we call a function with user restriction, it will only ask us for the password. It is worth mentioning that the user is managed in a JSON type variable and not in the database, since it is only a kind of demonstration.

To use authentication in postman, run the **generate token** route and copy the token, then paste it in **Headers** in a *Autorization* key.

### Functions that need authorization
- Create Survey
- Crate Field
- Read Surveys
### How create a survey
- First, you need generate a token, then create a void survey.
- Then add fields (**Note.** the fields don't ask type or if it is required, because that data was thought to be handled at the frontend level)

 - #### Using Postman
      - Launch the postman collection.
      - In the Create Survey Route, fill the fields.

**Note.** The survey fields will be added after.
### How add survey fields
- add the survey identificator (*survey_id*) in the URL

**Example:**
```
localhost:5000/api/newfield/1
```
- then write the question in the value of *question* key

### How answer the questions
- to answer a question you need a user, you can se how [here](#how-create-users)
- add the field identificator (*field_id*) in the URL
- add the user identificator (*user_id*) in this order.

**Example:**

field_id: 1

user_id: 5
```
localhost:5000/api/answer/1/5
```
- then type the asnwer in the *answer* field

**Note.** each time the following question is answered, the value of field_id must be changed to the corresponding one. otherwise the changes will be applied in the field with the value of the identifier.

It's advisable to answer all the fields of a survey with the same user, before moving on to the next.


### How create users
Create users is easy, you only need type the usernam in the *name* key of the *register* route.

**Note.** ( Usersnames can be repeated and can have two or more words )

-----

*Created by Juampa Muralles*

