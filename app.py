from flask import Flask, request, jsonify , render_template
import sys
import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv('API_KEY')
if not API_KEY:
    raise ValueError("API_KEY environment variable not set.")


app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True

def get_movie_details(moviename):
    url = f"https://www.omdbapi.com/?t={moviename}&apikey={API_KEY}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error fetching movie details: {e}")
        return {"Error": "Unable to fetch data"}



@app.route('/' , methods=['GET', 'POST'])
def main():
    if request.method == "POST":
        try:
            movie_name = request.form.get("moviename")
            data = get_movie_details(movie_name)
            return render_template("index.html", data=data)
        except:
            return render_template("index.html", data={"Error": "Unable to fetch data"})
    else:
        return render_template("index.html", data={"Error" : "No data found"})

if __name__ == '__main__':
    app.run(debug=True)
    
