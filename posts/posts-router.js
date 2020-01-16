const express = require('express')
const router = express.Router()
const db = require('../data/db')

router.get('/', (req, res) => {
    db.find()
        .then(posts => {
            if(posts.length === 0) {
              res.status(204).json({
                message: 'No posts available'
              })
            } else {
              res.status(200).json(posts)
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Error retrieving posts'
            })
        })
})

router.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const getPost = await db.findById(id)
        if (getPost.length > 0) { 
          res.status(200).json(getPost)
        } else {
          res.status(404).json({ message: `Post with id ${id} is not defined`})
        }
      } catch (error) {
        res.status(500).json(error.message)
      }
})

router.post("/", (req, res) => {
    const newPost = req.body
    if (!newPost.title || !newPost.content) {
      res
        .status(400)
        .json({ errorMessage: "Please provide title and content for the post." });
    }

      db.insert(newPost)
        .then(post => {
          if (post) {
            res.status(201).json(post)
          }
        })
        .catch(error => {
          res.status(500).json({
            errorMessage:
              "There was an error while saving the post to the database"
          })
        })
    
  })

  router.put('/:id', async (req, res) => {

    const { id } = req.params
    const replacementPost = req.body
    
    if(replacementPost.title && replacementPost.contents) {
    try {
      const updatedPost = await db.update(id, replacementPost)
      if (updatedPost) {
        res.status(200).json(updatedPost)
      } else {
        res.status(404).json({ message: `user with id ${id} is not here`})
      }
    } catch (error) {
      res.status(500).json(error.message)
    }
    } else {
        res.status(400).json({
        Error: 'Bad request, make sure you post has title and content'
    })
    }
  });

  router.delete('/:id', (req, res) => {
    const { id } = req.params

    db.remove(id)
      .then(post => {
          res.status(202).json(post)
      })
      .catch(error => {
          res.status(500).json({
              error: 'Something went wrong'
          })
      })
})

router.get('/postcomments/:id', (req, res) => {
    const { id } = req.params
    db.findPostComments(id)
    .then(comments => {
        res.status(200).json(comments)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.get('/comments/:id', (req, res) => {
    const { id } = req.params

    db.findCommentById(id)
    .then(comment => {
        res.status(200).json(comment)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.post('/comments', (req, res) => {

    const newComment = req.body

    if(newComment.text && newComment.post_id) {
    db.insertComment(newComment)
        .then(comment => {
            res.status(201).json({
                success: 'Successfully created comment',
                comment
            })
        })
        .catch(error => {
            res.status(500).json({
                error: "There was an error while saving the comment to the database"
            })
        })
    } else {
        res.status(400).json({
            Error: 'Bad request, make sure you comment has text and post_id'
        })
    }
})


module.exports = router
