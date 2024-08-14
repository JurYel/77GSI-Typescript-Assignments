# Day 3 - Angular Basic Features Exercise 1

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.14.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Screenshots

**`/book` route**
![output1](output1.png?raw=true)

**`/blog` route**
![output2](output2.png?raw=true)

**`/profile` route**<br>
![output3](output3.png?raw=true)

## Commands Used
Book List Page:
- `ng g m modules/book`
- `ng g m modules/book/book-routing --flat`
- `ng g c modules/book/pages/book-list`
- `ng g s modules/book/services/book`
- `ng g i modules/models/book interface`
- `ng g c modules/book/components/book-item`
<br>

Blog List Page:
- `ng g m modules/blog`
- `ng g m modules/blog/blog-routing --flat`
- `ng g c modules/blog/pages/blog-list`
- `ng g s modules/blog/services/blog`
- `ng g i modules/models/blog interface`
- `ng g c modules/blog/components/blog-item`
<br>

Profile Page:
- `ng g m modules/user`
- `ng g m modules/user/user-routing --flat`
<br>

Header and Command bar:
- `ng g c shared/compnents/header`
- `ng g c shared/components/command-bar`