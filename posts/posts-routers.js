const express = require("express");
const posts = require("../data/db.js");

const router = express.Router();

// Create Post
router.post("/" , (req,res) => {
    if(!req.body.title || !req.body.contents) {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post." 
        });
    } else {
        posts.insert(req.body)
        .then( (post) => {
            res.status(201).json(post)
        })
        .catch( (error) => {
            console.log(error);
            res.status(500).json({
                error: "There was an error while saving the post to the database"
            })
        })
    }
})

// Get Posts
router.get("/", (req,res) => {
    //console.log(posts.find());
    posts.find()
    .then((posts) => {
         res.status(200).json(posts) 
    })
    .catch((error) => {
         console.log(error);
         res.status(500).json({
            error: "The posts information could not be retrieved."
         })
    })
   
})

// Get Post BY ID
router.get("/:id", (req,res) => {
    
        posts.findById(req.params.id)
        .then((post) => {
            if(post.length === 0) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist." 
                })
            } else {
                   res.json(post)
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                    error: "The post information could not be retrieved."
            })
        })                      
  
})

// Delete Comment
router.delete("/:id", (req,res) => {

    posts.findById(req.params.id)
    .then((post) => {
        if(post.length === 0) {
            res.status(404).json({
                message: "The post with the specified ID does not exist." 
            })
        } else {
                posts.remove(req.params.id)
                .then( (posts) =>  {
                    res.json(posts)
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).json({error: "The post could not be removed" })
                })
        }
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({
                error: "The post information could not be retrieved."
        })
    })        

})

// Update Post BY ID
router.put("/:id", (req,res) =>{

    posts.findById(req.params.id)
    .then((post) => {
        if(post.length === 0) {
            res.status(404).json({
                message: "The post with the specified ID does not exist." 
            })
        } else {
            if(!req.body.title || !req.body.contents) {
                res.status(400).json({
                    errorMessage: "Please provide title and contents for the post." 
                });
            } else {
                posts.update(req.params.id,req.body)
                .then( (post) => {
                    res.status(200).json(post)
                })
                .catch( (error) => {
                    console.log(error);
                    res.status(500).json({
                        error: "The post information could not be modified."
                    })
                })
            }
        }
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({
                error: "The post information could not be retrieved."
        })
    })        


})


// Create Post Comment
router.post("/:id/comments", (req,res) => {
    if(!req.body.text) {
        res.status(400).json({
            errorMessage: "Please provide text for the comment." 
        })

    } else {
        posts.findById(req.params.id)
        .then((post) => {
            if(post.length === 0) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist." 
                })
            } else {

                posts.insertComment({text:req.body.text, post_id:req.params.id})
                .then((comment) => {
                    res.status(201).json(comment)
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).json({
                        error: "There was an error while saving the comment to the database"
                    })
                })
                   
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                    error: "The post information could not be retrieved."
            })
        })       
       
    }
})

// Get Comments BY Post ID
router.get("/:id/comments", (req,res)=> {
    posts.findById(req.params.id)
        .then((post) => {
            if(post.length === 0) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist." 
                })
            } else {

                posts.findPostComments(req.params.id)
                .then((comments) => {
                    res.json(comments)
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).json({
                        error: "The comments information could not be retrieved."
                    })
                })
                   
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                    error: "The post information could not be retrieved."
            })
        }) 
  
})

module.exports = router;

