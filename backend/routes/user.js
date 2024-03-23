const express = require("express");
const router = express.Router();
const zod = require('zod');
const{ User, Account } = require('../db');
const { authMiddleware } = require("../middleware");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
    
// const app = express();

const signupSchema = zod.object({
    username: zod.string().email(),
	firstName: zod.string().min(3).max(50),
	lastName: zod.string(),
	password: zod.string().min(6)

})

// app.use("/api/v1/user", userRouter);

router.get("/me", authMiddleware, async (req, res) => {
    const userId = req.userId;
    if(!userId)
        return res.status(403).json({
            message: "User not found"
        })

    const userDetails = await User.findById(userId);
    const accountDetails = await Account.findOne({
        userId: userId,
    });
    res.json({
        id: userDetails._id,
        user: {
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            username: userDetails.username
        },
        account: {
            balance: accountDetails.balance
        }
    })
})

router.post("/signup", async (req,res) => {
    const { success } = signupSchema.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
});

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string().min(6)
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }
  
    res.status(411).json({
        message: "Error while logging in"
    })
});


const updateBody = zod.object({
	password: zod.string().min(6).optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
});

router.put('/', authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating profile"
        })
    }

    await User.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "Updated Successfully"
    })
});


router.get("/bulk", async (req,res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        // Refernce:
        // https://stackoverflow.com/questions/7382207/mongooses-find-method-with-or-condition-does-not-work-properly
        // https://stackoverflow.com/questions/3305561/how-to-query-mongodb-with-like

        $or: [{
            firstName: {
                "$regex": filter,
                "$options": "i" // For case insensitive search/filter
            }
        }, {
            lastName: {
                "$regex": filter,
                "$options": "i"
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
});

module.exports = router;