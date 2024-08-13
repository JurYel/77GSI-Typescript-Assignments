# Day 2 - Angular CLI Exercise
## Simple CRUD

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.14.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Site Screenshot
![output-exercise](output-exercise.png?raw=true)

## Commands Used Throughout Exercise

- Step 1: `ng new simple-crud` - create new project
- Step 2: 
	- `ng g m user` - create user module in app folder
	- `ng g m book` - create book module in app folder
	- `ng g m blog` - create blog module in app folder
- Step 3: 
	- User Module
		- `ng g c user/pages/profile` - create profile component inside app/user/pages/profile
		- `ng g i user/models/UserInterface interface` - create UserInterface inside app/user/models
		- `ng g c user/components/form` - create form inside app/user/components/form
	- Book Module
		- `ng g c book/pages/book-list` - create book-list component inside app/book/pages
		- `ng g i book/models/BookInterface interface` - create BookInterface inside app/book/models
		- `ng g c book/components/book-item` - create book-item inside app/book/components
	- Blog Module
		- `ng g c blog/pages/blog-list` - create component inside app/blog/pages
		- `ng g i blog/models/BlogInterface interface` - create BlogInterface in app/blog/models
		- `ng g c blog/components/blog-item` - create blog-item component in app/blog/components
- Step 4:
	- `ng g s core/services/auth` - create auth service in core/services
- Step 5:
	- `ng g guard core/guards/auth` - create auth guard in core/guards
	- chose `CanActivate` guard type
- Step 6:
	- `ng g interceptor core/interceptor/header` - create header interceptor in core/interceptor
- Step 7:
	- `ng serve` - run project locally