

README

R1 Home page:
Home page can be found in routes/index.html
And also, in routes/main.js line 17 o


R2 About page:
About page can be found in routes/about.html
And also, in routes/main.js line 25


R3 Register page:
Register page can be found in routes/register.html
And also, in routes/main.js line 114

If there is a problem with the form validation rules the web will display an unsuccessful message and remind the user, the validation rules. Routes/mian.js line 123

Else if there is no problem with data validation the web will display a successful message. Routes/main.js line 156


R4 Login page:
Login page can be found in routes/login.html
And also, in routes/main.js line 306
If username does not exist, the web will display an error message and will also specify that the username does not exist. Routes/main.js line 324

If the username is correct but the password does not match its password the web will display an error message and will also specify that the password is incorrect. Routes/main.js line 341

If username exists and the password matches, then the user will see a successful message and will be provided a link to go back home. Routes/main.js line 339


R5 Logout route:
Logout can be found in routes/main.js line 394


R6 Add food page:
Add food page can be found in routes/addfood.html
And also, in routes/main.js line 191

If the new food name is already taken the web will display an error message to let the user know what the problem was. It will also provide 2 links one to go back home and the other one to try to add food again. Routes/main.js line 222

Else if name is not taken, the new food will be added and the web will display a successful message including the new food’s properties. Routes/main.js line 241


R7 Search food page:
Search food page can be found in routes/search.html
And also, in routes/main.js line 33

If none of the food in the database contains your keyword, the app will display an unsuccessful message and give the user 2 options: one to go back home and the other to try to search again with a different keyword. Routes/main.js line 51

If the keyword matches any food in the database, the web will render routes/list2.ejs file with the available results. Routes/main.js line 59



R8 Update food page:
Update food page can be found in routes/updatefood.html
And also, in routes/main.js line 72

If the food name provided does not exit the web will display an unsuccessful message specifying that the name does not exit.

If the food name exists, the food will be updated, and the web will display a successful message and will ask the user if it wants to keep updating or go home. 



R9 List food page:
List food page can be found in routes/list.html
And also, in routes/main.js line 170

The web will render routes/list.ejs file. Routes/main.js line 180


R10 API:
API can be found in routes/main.js line 408

The web will res.json the all the food stored in the database. Routes/main.js line 420



R11 Form validation:
A set of form validation rules can be found in the code.

First form validation rules { .isEmail(), .isLenght({min: x}), .notEmpty()} can be found in register route in routes/main.js line 119
In these lines I make sure that in order to register a new user the user enters:
a valid email, a password of a minimum length of 8, a username of a minimum length of 5 and the other fields (first name, last name) are not left empty.

If one of these rules is not met the user web will display an error message which reminds the user to fill all fields, provide a valid email and follow the minimum length rules.
The web will also display 2 links for the user one to go back home and the other to try to register again.

 
More validation rules { .notEmpty(), .isDecimal() } can be found in add food route in routes/main.js line 195
In these lines I make sure that in order to add a new food the user enters:
A decimal value in fields (calories, carbs, fat, protein, salt and sugar) and the other fields (name, value, typValue) are not left empty.

If one of these rules is not met the user web will display an error message which reminds the user to fill all fields and only provide decimal values for carbs, calories, fat, protein, salt and sugar.
The web will also display 2 links for the user one to go back home and the other to try to add food again.



R12: Mongo DB
The back-end of the web application is MongoDB and interactions with this can be found in routes/main.js line 42, line 83, line 143, line 174, line 213, line 266, line 289, line 315, line 365 and line 412


MongoDB data structure:
The name of the database used in this web is “mycaloriesapp”
This database has 2 collections: ‘food’ and ‘users’
‘food’ collection is used to store and manage all the food operations like add food, update food etc.
It has 9 fields: name, value, typValue, calories, carbs, fat, protein, salt and sugar.
Each food added must have a valid value for each field.
 
‘users’ collection is used to store the new users registered.
It has 5 fields: username, password, email, firstname and lastname.
Each user registered must have a valid value for each field.
