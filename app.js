const express  = require("express");
const app = express();
const roleRoutes = require("./src/routes/roleRoutes");
const userRoutes = require("./src/routes/userRoutes");
const port = 8088;

app.use(express.json());

app.use('/user/roles',roleRoutes);
app.use("/user",userRoutes);

app.listen(port,()=>{
    console.log(`App listening on Port ${port}`);
})
