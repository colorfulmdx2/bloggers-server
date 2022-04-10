import express, { Request, Response } from 'express'
import {bloggersRepository, postRepository} from './repositories/repository'
import {body, check, validationResult} from 'express-validator'
import {validationMiddleware} from "./middlewares/error-handler.middleware";
import {isNumber, isNumberBody, isString, isUrl} from "./vlidators/valildators";

export const router = express.Router()




router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

/** BLOGGERS **/

router.get('/bloggers', function(req, res) {
    res.send(bloggersRepository.getBloggers());
});

router.post('/bloggers',[isString('name'), isUrl()], validationMiddleware, (req: Request, res: Response) => {
    try {
        bloggersRepository.createBlogger({...req.body})
        res.send(201)
    } catch (e) {
        res.status(400).send({message: e.message})
    }
})

router.get('/bloggers/:id', isNumber('id'), validationMiddleware, (req: Request, res: Response) => {
    try {
       const blogger = bloggersRepository.getBlogger(req.params.id as unknown as number)
        res.status(200).send(blogger)
    } catch (e) {
        res.status(404).send({message: e.message})
    }
})

router.put('/bloggers/:id', [isNumber('id'), isString('name'), isUrl()], validationMiddleware, (req: Request, res: Response) => {
    try {
        bloggersRepository.updateBlogger(
            {id: req.params.id as unknown as number, name: req.body.name, youtubeUrl: req.body.youtubeUrl})
        res.send(200)
    } catch (e) {
        res.status(404).send({message: e.message})
    }
})

router.delete('/bloggers/:id', isNumber('id'), validationMiddleware, (req: Request, res: Response) => {
    try {
        bloggersRepository.deleteBlogger(req.params.id as unknown as number)
        res.send(200)
    } catch (e) {
        res.status(404).send({message: e.message})
    }
})

router.get('/posts', function(req, res) {
    const posts = postRepository.getPosts()
    res.send(posts);
});

router.post('/posts',[
    isString("title"),
    isString("shortDescription"),
    isString("content"),
    isString("bloggerName"),
    isNumberBody('id'),
    isNumberBody('bloggerId')],
    validationMiddleware,
    (req: Request, res: Response) => {
    try {
        postRepository.createPost({...req.body})
        res.sendStatus(201)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.get('/posts/:id', isNumber('id'), validationMiddleware,  (req: Request, res: Response) => {
   try {
       const post = postRepository.getPost(req.params.id as unknown as number)
       res.status(200).send(post)
   } catch (e) {
       res.status(404)
   }
})

router.put('/posts/:id',
[
    isNumber('id'),
    isString("title"),
    isString("shortDescription"),
    isString("content"),
    isNumberBody('bloggerId')],
    validationMiddleware, (req: Request, res: Response) => {
   try {
       postRepository.updatePost({id: req.params.id, ...req.body})
       res.send(200)
   } catch (e) {
       res.send(404)
   }
})

router.delete('/posts/:id', isNumber('id'), (req: Request, res: Response) => {
   try {
       postRepository.deletePost(req.params.id as unknown as number)
       res.send(200)
   } catch (e) {
       res.status(404).send(e.message)
   }
})



