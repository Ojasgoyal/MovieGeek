# MovieGeek - A Simple Movie Information Provider

## Overview

**MovieGeek** is a Python-based command-line application designed to provide users with detailed information about movies. By leveraging the OMDB (Open Movie Database) API, the application fetches and displays critical details such as the movie's release date, cast (including director, writer, and actors), and ratings from multiple sources, including IMDb. The project aims to offer a simple, user-friendly interface that allows users to retrieve movie information quickly and efficiently.

The project was developed as a part of my final project for CS50P, where the primary objective was to apply the core Python concepts and at least 2-3 libraries taught in the course. This application not only demonstrates an understanding of Python but also showcases skills in handling APIs, managing environment variables, and implementing error handling for network requests.

## Technologies Used

- Python 3
- [OMDB API](http://www.omdbapi.com/) (for fetching movie data)
- [Requests Library](https://pypi.org/project/requests/) (for making HTTP requests)
- [dotenv Library](https://pypi.org/project/python-dotenv/) (for managing environment variables)


The project consists of the following key files:

1. **`Movie_Geek.py`**:
   - The main script that contains the core logic of the application.
   - Functions include:
     - `get_movie_name()`: Prompts the user to enter a movie name.
     - `display_menu(movie_name)`: Displays options for retrieving movie information.
     - `get_movie_details(moviename)`: Fetches movie details from the OMDB API.
     - `get_release_date(data)`, `get_cast(data)`, `get_rating(data)`: Extracts and returns specific details from the movie data.
     - `main()`: Orchestrates the program flow.

2. **`.env`**:
   - Stores environment variables, specifically the OMDB API key. This improves security by keeping sensitive information out of the codebase.

3. **`requirements.txt`**:
   - Lists the Python packages required to run the project (`requests` and `python-dotenv`).
   - Install dependencies with `pip install -r requirements.txt`.

## Features

- **User-Friendly Interface**: The application features a straightforward command-line interface that guides users through the process of obtaining movie details.
- **Comprehensive Movie Details**: Users can fetch key information about movies, including:
  - Release Date
  - Cast (Director, Writer, Actors)
  - Ratings (IMDB and other sources)
- **Real-Time Data**: The application retrieves movie information in real-time from the OMDB (Open Movie Database) API, ensuring users get the most up-to-date details.
- **Error Handling**: The application gracefully handles errors, such as network issues or unavailable movie data, and informs the user accordingly.

## Design Choices

1. **Command-Line Interface**:
   - Chosen for simplicity and focus on core Python concepts.
2. **OMDB API**:
   - Selected for its extensive movie database and ease of access.
3. **Environment Variables**:
   - API key management through a `.env` file for better security.
4. **Error Handling**:
   - Ensures robustness by handling potential issues like network errors or invalid inputs.
5. **Returning Values vs. Printing**:
   - Functions return values instead of printing directly to facilitate unit testing and flexibility.

## Getting Started

How to Use

1. **Start the Application**: Run the script. The welcome screen will be displayed.

2. **Enter a Movie Name**: When prompted, enter the name of the movie you want to search for. For example, enter "Inception" to get details about the movie "Inception".

3. **Choose an Option**: After entering the movie name, you'll be presented with a menu:
    1. **Release Date:** Displays the release date of the movie.
    2. **Cast:** Provides details about the director, writer, and main actors.
    3. **Rating:** Shows the movie's ratings from various sources, including IMDB.
    4. **Back:** Returns to the previous step, allowing you to search for another movie.
    
4. **Quit the Application:** Type q at the movie name prompt to exit the application.
