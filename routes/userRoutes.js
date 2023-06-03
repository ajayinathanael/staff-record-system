
const User = require('../model/userModel');
const slug = require('slugify');
const express = require('express');
const multer = require('multer');
const router = express.Router();


const storage = multer.diskStorage({
    // to locate destination of a file which is being uploaded
    destination: function(res, file, callback){
        callback(null,'./public/uploads');
    },

    // add back the extension to the file name
    filename: function(res, file, callback){
        callback(null, file.originalname);
    },

})

// upload parameters for multer for uploading images
const upload = multer({
    // multer will only accept files with these extensions
    storage: storage,
    limits:{
        fileSize: 1024* 1024* 3,
    },
})

 
router.get('/', async(req,res,next)=>{

    doc = await User.find();
    
    if(!doc){
        return next(err);
    }

    res.render("myIndex", {staff:doc});

});


router.get('/viewStaff/:id', async(req,res)=>{ // /viewStaff/:lastname

    const requestedStaff = req.params.id;

    let staff = await User.findOne({_id: requestedStaff});
    res.render("staffDetail", {staff:staff});
});


router.get('/addStaff',(req,res)=>{ // /addStaff/
    res.render("myNew");
    
});


router.get('/editStaff/:id', async(req,res)=>{ // /editStaff/:id
    const requestedStaff = req.params.id;
    let staff = await User.findOne({_id: requestedStaff});
    res.render("myEdit", {staff:staff});
    
});

router.put('/edit_staff/:id', upload.single('photo'), async(req,res,next)=>{

    // console.log(req.body);
    // console.log(req.params.id);
    // console.log(req.file.filename);

    let StaffEdit = ({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        address: req.body.address,
        department: req.body.department,
        faculty: req.body.faculty,
        dob: req.body.dob,
        courses: req.body.courses,
        photo: req.file.filename,
        comment: req.body.comment,
        facebook: req.body.facebook
    });
    // console.log(StaffEdit);

    try{
        const doc = await User.findByIdAndUpdate(req.params.id, StaffEdit);
        res.redirect('/');
    }
    catch(err){
        res.send(err);
    } 
});


router.delete('/:id', async(req,res)=>{
    await User.findByIdAndDelete(req.params.id);

    res.redirect('/');

});


router.post('/add_staff',  upload.single('photo'), async(req,res)=>{
    
    let StaffDetails = ({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        address: req.body.address,
        department: req.body.department,
        faculty: req.body.faculty,
        dob: req.body.dob,
        courses: req.body.courses,
        photo: req.file.filename,
        comment: req.body.comment,
        whatsapp: req.body.whatsapp,

    });
    // console.log(StaffDetails);

    try{
        const newUser = await User.create(StaffDetails); 
        res.redirect('/');
    }catch(err){
        console.log(err);
    }

});


router.delete('/:id', async(req,res)=>{
    await User.findByIdAndDelete(req.params.id)
    
    res.status(204).json({
        status: 'success',
        data: null
    });
});


module.exports = router;