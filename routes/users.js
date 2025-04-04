const express = require('express');
const router = express.Router();
const z = require('zod');
const { v4: uuidv4 } = require('uuid');
const { formatZodErrors, capitalizeFirstLetter } = require('../utils/helpers');

router.use(express.json());

const users = [
    {
        id: "absc-124-acgh",
        name: "Luis", 
        email: "lf@yopmail.com",
        age: 38,
        address: {
            city: "Lisbon",
            zipcode: 1500,
        }
    }
]

const usersSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
    email: z.string().email("This is not a valid email."),
    age: z.number().positive({ message: "Age must be a positive number" }),
    address: z.object({
        city: z.string().min(3),
        zipcode: z.number().positive().min(4, { message: "Zipcode must be at least 4 characters long" }),
    }),
});

router.get('/', (req, res) => {
    res.send(users);
});

router.get('/:id', (req, res) => {
    const user = users.find(c => c.id === req.params.id);
    if(!user) return res.status(404).send("The user with the given id was not found")
    res.send({ message: `User with id "${user.id}" found!`, data: user});
});


router.post('/', (req, res) => {
    const validation = usersSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({ error: formatZodErrors(validation.error) });
    }

     const newUser = {
        id: uuidv4(),
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        address: {
            city: req.body.address.city,
            zipcode: req.body.address.zipcode
        }
    }
    users.push(newUser);

    res.status(201).send({ message: "User created!", user: newUser });
});

router.put('/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
        return res.status(404).send({ error: "User not found!", data: {} });
    }

    const validation = usersSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ error: formatZodErrors(validation.error) });
    }
    user.name = req.body.name;
    user.email = req.body.email;
    user.age = req.body.age;
    user.address = { 
        city: req.body.address.city, 
        zipcode: req.body.address.zipcode 
    }

    res.send({ message: "User updated!", data: user });
})

router.delete('/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
        return res.status(404).send({ error: "User not found!" });
    }

    const index = users.indexOf(user);
    users.splice(index, 1);

    res.send({ message: "User deleted!", data: user });
});

// Filter by age
router.get('/filter/byAge', (req, res) => {
    const age = parseFloat(req.query.age);

    if(isNaN(age) || age < 0) {
        res.status(400).send({ message: "Invalid age. Must be a positive number"})
    }

    const filteredUsers = users.filter(u => u.age === age);
     if (filteredUsers.length === 0) {
        return res.status(404).json({ message: "No users found with this age!" });
    }

    res.json({ message: `There is ${filteredUsers.length} user${filteredUsers.length > 1 ? 's' : ''} with ${age} years old.`, data: filteredUsers });
})

// Filter by city
router.get('/filter/byCity', (req, res) => {
    const city = req.query.city.toLowerCase();

    const filteredUsers = users.filter(u => u.address.city.toLowerCase() === city);
     if (filteredUsers.length === 0) {
        return res.status(404).json({ message: "No users found in this city!" });
    }

    res.json({ message: `Users living in ${capitalizeFirstLetter(city)}.`, data: filteredUsers });
})


module.exports = router;