# Pokémon Legends
Welcome to Pokémon Legends! Here, you will get to experience a simple Pokemon game, with references to the official Pokémon game battles and some of their systems, with a tint of retro! All feedbacks regarding the game for improvements are welcome!

## Context
Pokémon Legends is a game project done during my education with Trent Global College, where I will utilize what I learnt during my bootcamp about Vue, Express and MongoDB to develop a reactive frontend frameworks and RESTful API.

# Demo
The demo of the site is available [here](https://yuhengen.github.io/TGC9-Proj2-PokeLegends-vue)!

# Note
This repository only contains the frontend codes for the Pokémon Legends project.
Backend codes can be found at [TGC9-Proj2-PokéLegends-api](https://github.com/yuhengen/tgc9-proj2-PokeLegends-api).

# UI/UX
# Identifying the Users (STRATEGY)
The primary purpose of this website is to allow players to play the Pokémon Legends game on both PC and mobile. This is a simple simulation of the official Pokémon game series on Nintendo consoles. This game mainly targets Pokémon fans and gamers in general.

## Owner Stories
```
- As the developer of the game, I want to create a user-friendly and fun game so that my players will enjoy their time in the game.
- As the developer of the game, I want to ensure that the game remains as close to a Pokémon game as possible, so that fans of the Pokémon games have a sense of familiarity and reminiscence with us.
```

## User Stories (Players & Visitors)
```
- As a player, I want to find a good Pokémon game so that I can spend some of my free time on the game as a source of entertainment.
- As a player, I want a website where I can preview the game and its contents so that I will know whether to try the game out or not.
```

# The Requirements (SCOPE)
## Current Features
```
- Sign up for an account
- Login to the account
- Play the game on browser with a PC or Android/Apple phones, designed with Vue
- Conduct random and gym battles in the game
- Theme music playing in the game, switching when necessary
- Access to a Pokédex to view the entire list of Pokémon
- Auto save and load the game to and from MongoDB database
- Ease of navigation with Bootstrap Navbar
- Mobile responsiveness
```
## Features to Implement in Future
```
- Add function to prompt user confirmation on whether they want to navigate away from the game window
- Adding loading screen to pages that require load time
- Add function to allow users to update profile
- Privacy Policy page (When necessary)
```

# Developing the Site Structure (STRUCTURE)
### Website
The Pokémon Legends website has a navigation bar and footer on every page, allowing users to access most available page with ease.

### Game
The Pokémon Legends game has navigation buttons at the main menu screen of the game, allowing players to access most of the game functions with ease. All the personal game data that the players need to access can be seen in the game

## Sitemap

---

The sitemap of the project will be available soon...

---

# Developing Page Structure and Organize Interactions (SKELETON)
Most important features of Pokémon Legends are featured first. We want our players to play our game and at the same time know more about Pokémon Legends, so the PLAY button is the first thing they see upon entering the site with more information regarding the game.

## Wireframes

---

The wireframes of the project will be available soon...

---

# Designing the Graphics User Interface (SURFACE)
## Colors
After some research and considerations, the main colors I decide to use for the website are those that are similar to a Pokéball, and the neutral colors that can blend in most situations.
```
- Black/Grey for background, buttons and windows due to it being able to blend in most situations
- Red + White combination to match colors for a Pokéball
- White for texts to contrast the dark colors
```

## Fonts
The fonts mainly used on the website is Sans Serif, the default font family, which is often used to convey modernity or minimalism.
Secondary fonts used are [Pokémon Font](https://www.dafont.com/pokemon.font) for the navigation bar, and the [Nintendo Pixel Font](https://www.fontspace.com/press-start-2p-font-f11591) for the game to bring forth a retro look.

# Testing

# Technologies
- VueJS and CSS for structuring and styling the website
- Javascript to implement interactivty with website
- [BootstrapVue](https://bootstrap-vue.org/) for Navbar and other Bootstrap components
- GitHub for version control and repositories
- GitPod as coding platform
- Axios to read from JSON files and database
- Express, HBS for data rendering
- GIMP for image editing
- Responsive Web Design Checker to check how it looks like on other devices

# Credits
## Acknowledgement
This project would not have been possible without my main lecturer, Paul Chor, for the skills and knowledge imparted to me, and teaching assistant, Shun, for the guidance during the building of the project during the bootcamp in Trent Global College.
Big appreciation to the Pokémon series, w3schools, Stackoverflow forums, Bootstrap documentation, PokéAPI and its documentation.

- [POKÉMON](https://www.pokemon.com/sg/) for the series and the assets
- [Pokémon API](https://pokeapi.co/)
- [Pokémon Font](https://www.dafont.com/pokemon.font)
- [Nintendo Pixel Font](https://www.fontspace.com/press-start-2p-font-f11591)
- [Vue Fullscreen](http://mirari.cc/vue-fullscreen/) for granting fullscreen to the game window
- [Vuex-PersistedState](https://www.npmjs.com/package/vuex-persistedstate) for simple inter-component state control
- [Am I Responsive Checker](http://ami.responsivedesign.is/)

### Music
- theme-music.mp3 - [POKÉMON Omega Ruby/Alpha Sapphire Title Theme](https://www.youtube.com/watch?v=hkoXy3jRpww)
- town.mp3 - [POKÉMON Omega Ruby/Alpha Sapphire Littleroot Town Theme](https://www.youtube.com/watch?v=zRGCzCn5azI)
- random-battle.mp3 - [POKÉMON Omega Ruby/Alpha Sapphire Battle! Zinnia Theme](https://www.youtube.com/watch?v=GIn8_Q27WFY)