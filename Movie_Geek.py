import sys
import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv('API_KEY')
if not API_KEY:
    raise ValueError("API_KEY environment variable not set.")


def get_movie_name():
    return input("\nEnter Movie Name: ")


def display_menu(movie_name):
    print(f"\nWhat would you like to know about {movie_name} ?")
    print("1. Release Date")
    print("2. Cast")
    print("3. Rating")
    print("4. Back")


def get_movie_details(moviename):
    url = f"https://www.omdbapi.com/?t={moviename}&apikey={API_KEY}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error fetching movie details: {e}")
        return {"Error": "Unable to fetch data"}


def get_release_date(data):
    date = data.get("Released", "N/A")
    return f"\nRelease Date: {date}"


def get_cast(data):
    Director = data.get("Director", "N/A")
    Writer = data.get("Writer", "N/A")
    Actors = data.get("Actors", "N/A")
    return f"\nCast:\nDirector: {Director}\nWriter: {Writer}\nActors: {Actors}"


def get_rating(data):
    print("\nRatings:")
    ratings = data.get("Ratings", [])
    rating_output = []
    if len(ratings) > 1:
        rating_output.append(f"{ratings[1]['Source']}: {ratings[1]['Value']}")
    if len(ratings) > 2:
        rating_output.append(f"{ratings[2]['Source']}: {ratings[2]['Value']}")
    rating_output.append(f"IMDb Rating: {data.get('imdbRating', 'N/A')}")
    return "\n".join(rating_output)


def main():
    print("*" * 50)
    print(" " * 15 , "Welcome to MovieGeek" ," " * 15)
    print("*" * 50)
    print("Enter q to exit")


    while True:
        movie_name = get_movie_name()
        if movie_name == "q":
            print("Quitting the Program... ")
            sys.exit()
        data = get_movie_details(movie_name)


        if "Error" not in data:
            while True:
                try:
                    display_menu(movie_name)

                    task = int(input("Enter index of task: "))
                    match task:
                        case 1 :
                            print(get_release_date(data))
                        case 2 :
                            print(get_cast(data))
                        case 3 :
                            print(get_rating(data))
                        case 4 :
                            break
                        case _ :
                            print("\nInvalid Input")


                except ValueError:
                    print("\nInvalid Input")
                    pass

        else:
            print("\nMovie Unavailable")



if __name__ == "__main__":
    main()
