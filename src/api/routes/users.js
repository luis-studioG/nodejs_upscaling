// const express = require('express');
// const router = express.Router();
// const Joi = require('joi');
// const { v4: uuidv4 } = require('uuid');
// const { formatZodErrors, capitalizeFirstLetter } = require('../utils/helpers');
// const { getDb } = require('../utils/database');

// router.use(express.json());

// const users = [
//     {
//         id: "absc-124-acgh",
//         name: "Luis", 
//         email: "lf@yopmail.com",
//         age: 38,
//         address: {
//             city: "Lisbon",
//             zipcode: 1500,
//         }
//     }
// ]

// router.get('/', async (req, res) => {
//     try {
//         const db = getDb();
//         const users = await db.collection('users').find().toArray();
//         res.send(users);
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         res.status(500).send('Error fetching users');
//     }
// });

// router.get('/:id', async (req, res) => {
//     try {
//         const db = getDb();
//         const user = await db.collection('users').findOne({ id: req.params.id });
//         if(!user) return res.status(404).send("The user with the given id was not found")
//         res.send({ message: `User with id "${user.id}" found!`, data: user});
//     } catch (error) {
//         console.error('Error fetching user:', error);
//         res.status(500).send('Error fetching user');
//     }
// });


// router.post('/', async (req, res) => {
//     try {
//         const { error } = validateUser(req.body);
//         if(error) {
//             console.log('Validation error:', error.details[0].message);
//             return res.status(400).send(error.details[0].message);
//         }

//         const newUser = {
//             id: uuidv4(),
//             name: req.body.name,
//             email: req.body.email,
//             age: req.body.age,
//             address: {
//                 city: req.body.address.city,
//                 zipcode: req.body.address.zipcode
//             },
//             createdAt: new Date()
//         }
        
//         console.log('Attempting to save user:', newUser);
//         const db = getDb();
//         const result = await db.collection('users').insertOne(newUser);
//         console.log('User saved successfully:', result.insertedId);
//         res.status(201).send({ message: "User created!", user: newUser, insertedId: result.insertedId });
//     } catch (error) {
//         console.error('Error creating user:', error);
//         console.error('Error stack:', error.stack);
//         res.status(500).send('Error creating user: ' + error.message);
//     }
// });

// router.put('/:id', async (req, res) => {
//     try {   
//         const db = getDb();
//         const user = await db.collection('users').findOne({ id: req.params.id });
//         if (!user) {
//             return res.status(404).send({ error: "User not found!", data: {} });
//     }

//     const { error } = validateUser(req.body);
//     if(error) {
//         console.log('Validation error:', error.details[0].message);
//         return res.status(400).send(error.details[0].message);
//     }

//     user.name = req.body.name;
//     user.email = req.body.email;
//     user.age = req.body.age;
//     user.address = { 
//         city: req.body.address.city, 
//         zipcode: req.body.address.zipcode 
//     }

//         const result = await db.collection('users').updateOne({ id: req.params.id }, { $set: user });
//         res.send({ message: "User updated!", data: user, updatedCount: result.modifiedCount });
//     } catch (error) {
//         console.error('Error updating user:', error);
//         res.status(500).send('Error updating user');
//     }
// })

// router.delete('/:id', async (req, res) => {
//     try {
//         const db = getDb();
//         const user = await db.collection('users').findOne({ id: req.params.id });
//         if (!user) {
//             return res.status(404).send({ error: "User not found!" });
//     }

//         const result = await db.collection('users').deleteOne({ id: req.params.id });
//         res.send({ message: "User deleted!", data: user, deletedCount: result.deletedCount });
//     } catch (error) {
//         console.error('Error deleting user:', error);
//         res.status(500).send('Error deleting user');
//     }
// });

// // Filter by age
// router.get('/filter/byAge', (req, res) => {
//     try {
//     const age = parseFloat(req.query.age);

//     if(isNaN(age) || age < 0) {
//         res.status(400).send({ message: "Invalid age. Must be a positive number"})
//     }

//     const filteredUsers = users.filter(u => u.age === age);
//      if (filteredUsers.length === 0) {
//         return res.status(404).json({ message: "No users found with this age!" });
//     }

//     res.json({ message: `There is ${filteredUsers.length} user${filteredUsers.length > 1 ? 's' : ''} with ${age} years old.`, data: filteredUsers });
//     } catch (error) {
//         console.error('Error filtering users by age:', error);
//         res.status(500).send('Error filtering users');
//     }
// })

// // Filter by city
// router.get('/filter/byCity', async (req, res) => {
//     try {
//         const db = getDb();
//         const city = req.query.city;
                
//         // Try case-insensitive search using regex
//         const filteredUsers = await db.collection('users').find({ 
//             "address.city": { $regex: new RegExp(city, "i") } 
//         }).toArray();
        
//         console.log('Filtered users:', filteredUsers);

//         if (filteredUsers.length === 0) {
//             return res.status(404).json({ message: "No users found in this city!" });
//         }

//         res.json({ message: `Users living in ${capitalizeFirstLetter(city)}.`, data: filteredUsers });
//     } catch (error) {
//         console.error('Error filtering users by city:', error);
//         res.status(500).send('Error filtering users');
//     }
//     })

// function validateUser(user) {
//     const schema = Joi.object({
//         name: Joi.string().min(3).required(),
//         email: Joi.string().email().required(),
//         age: Joi.number().positive().required(),
//         address: Joi.object({
//             city: Joi.string().min(3).required(),
//             zipcode: Joi.number().positive().required(),
//         }).required(),
//     });
//      return schema.validate(user);
// }

// module.exports = router;