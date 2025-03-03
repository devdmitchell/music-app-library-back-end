
// Sign Up
app.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password)
    const newUser = new User({ 
        username: req.body.username, 
        password: hashedPassword 
    })

    await newUser.save()
    res.json({ message: 'Registered user successfully' })
})

// Login
app.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username })

    if (user && await bcrypt.compare(req.body.password, user.password)) {
        const jwtToken = jwt.sign({ userId: user._id }, 'secretkey');
        res.json({ jwtToken })
    } else {
        res.status(400).json({ message: 'Incorrect username or password' })
    }
});