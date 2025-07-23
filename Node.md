
# Mongo DB
1. brew tap mongodb/brew
2. brew install mongodb-community@7.0
3. mongod --version
4. brew services start mongodb-community@7.0
5. brew services list
6. Download MongoDB Compass from: https://www.mongodb.com/try/download/compass
7. Open MongoDb Compass and enter connection, click connect.
8. mongosh

CRUD Operations within Mongo DB: https://www.youtube.com/watch?v=c2M-rlkkT5o
- insertOne();
- find(); 
- updateOne();
- deleteOne();

Logical operators:
- $eq: equal to
- $ne: not equal to
- $gt: greater than
- $gte: greater than or equal to
- $lt: less than
- $lte: less than or equal to
- $in: in
- $nin: not in
- $and: and
```
db.collection.find({
  $and: [
    { age: { $gt: 25 } },
    { city: "New York" }
  ]
})
```
- $or: or
```
db.collection.find({
  $or: [
    { age: { $gt: 25 } },
    { city: "New York" }
  ]
})
```
- $not: not
```
db.collection.find({
  $not: {
    age: { $gt: 25 }
  }
})
```
- $exists: exists
```
db.collection.find({
  $exists: {
    age: true
  }
})
```
- $nor: nor
```
db.collection.find({
  $nor: [
    { age: { $lt: 20 } },
    { city: "Los Angeles" }
  ]
})
```
- $regex: regex (case-insensitive)
```
db.collection.find({
  name: { $regex: "john" }
})

// Starts with "john"
db.collection.find({
  name: { $regex: "^john", $options: "i" }
})

// Ends with "doe"
db.collection.find({
  name: { $regex: "doe$", $options: "i" }
})
```
