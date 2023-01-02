const { render } = require('ejs')
const express = require('express')
const book = require('../models/book')
const router = express.Router()
const Author = require('../models/author')
//get all authors
router.get('/', async (req, res) =>{
    let searchOption = {}
    if (req.query.name !== null && req.query.name !== ''){ 
        // The i makes it key insensitive
        searchOption.name = new RegExp(req.query.name, 'i')
    }
    try{
        const authors = await Author.find(searchOption)
        res.render('authors/index', { 
            authors: authors,
            searchOption: req.query
        })
    } catch{
        res.redirect('/')
    }
})

// new author
router.get('/new',(req, res) =>{
    res.render('authors/new', { author: new Author() })
})

// Create author
router.post('/', async (req, res) =>{
    const author = new Author({
        name: req.body.name
    })

    try{
        const newAuthor = await author.save()
        // res.redirect(`/authors/${newAuthor.id}`)
        res.redirect('/authors')
    } catch{
        res.render('authors/new', {
            author: author,
            errorMessage: 'Could not save author'
        })
    }
})


module.exports = router