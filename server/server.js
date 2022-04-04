const express = require('express');
const app = express();
const { cloudinary } = require('./utils/cloudinary'); //This grabs the cloudinary object from the utils directory

app.use(express.json({ limit: '50mb' })); //This will allow me to parse json body data and sets a file size limit of 50mb
app.use(express.urlencoded({ limit: '50mb', extended: true })); //This will allow me to accept data from forms

//This will get a list of the public Ids within the folder and display is on http://localhost:3000/api/images
app.get('/api/images', async (req, res) => {
    const {resources} = await cloudinary.search.expression('folder:photo_app')
    .sort_by('public_id', 'desc')
    .max_results(30)
    .execute();
    const publicIds = resources.map( file => file.public_id);
    res.send(publicIds);
})

app.post('/api/upload', async (req, res) =>{
    try {
        //This gets the file string from the body of the body object in the Upload.js file 
        const fileStr = req.body.data;
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: "photo_app"
        })
        console.log(uploadedResponse)
        res.json({msg: 'YAY'})
    } catch (error) {
        console.error(error)
        res.status(500).json({err: 'Something'})
    }
})
//This is going to listen on either the env variable or port 3001.
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});