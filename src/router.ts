import express, { Request, Response } from 'express'
export const router = express.Router()


export let bloggers = [
    {id: 1, name: 'Klava Koka', youtubeUrl: 'youtubeUrl'},
]

export let posts = [
    {id: 1, title: 'title', shortDescription: 'shortDescription', content: 'content', bloggerId: 1, bloggerName: 'Klava Koka'},
]

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

/** BLOGGERS **/

router.get('/bloggers', function(req, res) {
    res.send(bloggers);
});

router.post('/bloggers', (req: Request, res: Response) => {
    const {name, youtubeUrl} = req.body
    if (!name || !youtubeUrl) {
        res.status(400).send({message: 'Please provide all required parameters'})
    }

    const newVideo = {
        id: +(new Date()),
        name: name,
        youtubeUrl: youtubeUrl
    }

    bloggers.push(newVideo)
    res.status(201).send(bloggers)
})

router.get('/bloggers/:id', (req: Request, res: Response) => {
    const find = bloggers.find((e) => e.id === +req.params.id)
    if (!find) {
        res.status(404).send({message: `Blogger not found`})
    }

    res.status(200).send(find)
})

router.put('/bloggers/:id', (req: Request, res: Response) => {
    const id = +req.params.id

    const find = bloggers.find((e) => e.id === id)
    if (!find) {
        res.status(404).send({message: `Blogger not found`})
    }

    const { name, youtubeUrl }: any = req.body

    bloggers = bloggers.map((e: any) => {
        if (+id === e.id) {
            return {...e, youtubeUrl, name}
        }
        return e
    })
    res.status(201).send({ ...find, name, youtubeUrl })
})

router.delete('/bloggers/:id', (req: Request, res: Response) => {
    const id = +req.params.id

    const find = bloggers.find((e) => e.id === id)
    if (!find) {
        res.status(404).send({message: `Video not found`})
    }

    bloggers = [...bloggers.filter((e: any) => e.id !== +req.params.id)]
    res.status(200).send(find)
})

/** POSTS **/

router.get('/posts', function(req, res) {
    res.send(posts);
});

router.post('/posts', (req: Request, res: Response) => {
    const {title, shortDescription, content, bloggerId} = req.body

    if (!title || !shortDescription || !content || !bloggerId) {
        res.status(400).send({message: 'Please provide all required parameters'})
    }

    const find = bloggers.find((e) => e.id === bloggerId)
    if (!find) {
        res.status(400).send({message: `Blogger doesn't exist`})
    }

    const post = {
        id: +(new Date()),
        shortDescription,
        content,
        bloggerId,
        title,
        bloggerName: find?.name || 'no name'
    }

    posts.push(post)
    res.status(201).send(posts)
})

router.get('/posts/:id', (req: Request, res: Response) => {
    const id = +req.params.id

    const find = posts.find((e) => e.id === id)
    if (!find) {
        res.status(404).send({message: `Post not found`})
    }

    res.status(200).send(find)
})

router.put('/posts/:id', (req: Request, res: Response) => {
    const id = +req.params.id

    const {title, shortDescription, content, bloggerId} = req.body

    if (!title || !shortDescription || !content || !bloggerId) {
        res.status(400).send({message: 'Please provide all required parameters'})
    }

    const findPost = posts.find((e) => e.id === id)
    if (!findPost) {
        res.status(400).send({message: `Post doesn't exist`})
        return
    }

    const findBlogger = bloggers.find((e) => e.id === bloggerId)
    if (!findBlogger) {
        res.status(400).send({message: `Blogger with this id doesn't exist`})
    }

    posts = posts.map((e) => {
     if (e.id === id) {
         return  {
             ...findPost,
             shortDescription,
             content,
             bloggerId,
             title,
             bloggerName: findBlogger?.name || 'no name'
         }
     }
     return e
    })

    res.status(201).send(posts)
})

router.delete('/posts/:id', (req: Request, res: Response) => {
    const id = +req.params.id

    const find = posts.find((e) => e.id === id)
    if (!find) {
        res.status(404).send({message: `Post not found`})
    }

    posts = [...posts.filter((e: any) => e.id !== +req.params.id)]
    res.status(200).send(find)
})



