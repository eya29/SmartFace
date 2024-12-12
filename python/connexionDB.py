from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["mydatabase"]
collection = db["mycollection"]

# Example: Insert a document
doc = {"name": "Alice", "age": 25}
collection.insert_one(doc)

# Example: Find a document
result = collection.find_one({"name": "Alice"})
print(result)
