# KadambariPatangrao_Nodejstask

## Framework used:
1. Expressjs and nodejs

## Libraries used:
1. Bodyparser
2. express-fileupload
3. ejs
4. mysql
5. nodemon
6. express-validator

## Api end points:
1. Get all psychiatrists: http://localhost:3000/
2. Get details of all patients under single psychiatrist: http://localhost:3000/viewPatients/1 (1=id)
3. Add patient under psychiatrist: http://localhost:3000/addPatient/1 (1=id)
4. Get count of all patients under single psychiatrist: http://localhost:3000/countPatient/1
5. Register psychiatrist: http://localhost:3000/save
6. Get psychiatrist hospitalName, name: http://localhost:3000/getPsy/1

## how to run test and deploy project?

1. Clone git repository
2. npm install
3. npm run server
4. open mysql workbench/phpmyadmin or any mysql GUI
5. copy the script under database folder database/schema.sql to create tables and data 
6. open localhost:3000 on web browser
7. Add new psychiatrist


## Some Screenshots:
1. All psychiatrists:
  ![image](https://user-images.githubusercontent.com/53164503/170361946-672e8a80-fb9b-48fc-8fd0-a108735cf36e.png)
2. Add new psychiatrist:
 ![image](https://user-images.githubusercontent.com/53164503/170361993-2efbe241-9a77-48cf-b459-ac4b7cf314fd.png)
3. Add patient
  ![image](https://user-images.githubusercontent.com/53164503/170362073-1b15bea5-7566-4589-a571-1d020dc93b0a.png)
4. Get all patients under single psychiatrist:
  ![image](https://user-images.githubusercontent.com/53164503/170362130-80378e41-dfb3-482d-ab0c-a65f34b7d99b.png)
5. Get count of patients under single psychiatrist:
  ![image](https://user-images.githubusercontent.com/53164503/170362196-c1b82740-0572-4470-b362-e8ebdb4c3343.png)
6. psychiatrist details:
  ![image](https://user-images.githubusercontent.com/53164503/170362252-d35cc8d8-d700-4a48-b992-5f5f4dec0e65.png)


