
# Markov Chain Word Predictor
I implemented a simple markov chain model to predict the next word given a phrase.

## Design
The design is fairly simple. The Schema contains the context, which links to the next word and its frequency. Given an input, the model matches it to the data’s context within the database and returns results based on their frequency. 

## How to run 
* Set up your Mongodb
* npm install
* Startup both the frontend and backend


##  Why
I did it for fun.

## Tech
Essentially just mern stack.
* React
* CSS
* Express JS
* Mongodb
* Node JS
* Some miscellaneous Python scripts that I used to parse the data

## Credit
I got the data here: 
https://huggingface.co/datasets/argilla/FinePersonas-Synthetic-Email-Conversations



