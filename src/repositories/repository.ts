import {ICreateBlogger, IUpdateBlogger} from "../dto/bloggers.dto";
import {ICreatePost, IUpdatePost} from "../dto/posts.dto";

export let bloggers = [
    {id: 1, name: 'Klava Koka', youtubeUrl: 'youtubeUrl'},
    {id: 2, name: 'Baba Dura', youtubeUrl: 'youtubeUrl'},
]

export let posts = [
    {id: 1, title: 'title', shortDescription: 'shortDescription', content: 'content', bloggerId: 1, bloggerName: 'Klava Koka'},
]

export const bloggersRepository = {
    getBloggers() {
        return bloggers
    },

    getBlogger(id: number) {
        const blogger = bloggers.find((e) => e.id === id)
        if (!blogger) {
            throw new Error('Blogger not found')
        }
        return blogger
    },

    createBlogger(dto: ICreateBlogger) {
        const id = +(new Date())
        const newBlogger = {
            id: id,
            name: dto.name,
            youtubeUrl: dto.youtubeUrl
        }
        bloggers.push(newBlogger)
        if (!bloggers.find((e) => e.id === id)) {
            throw new Error('Some error occurred')
        }
    },

    updateBlogger(dto: IUpdateBlogger) {
        const blogger = bloggersRepository.getBlogger(dto.id)
        if (!blogger) {
            throw new Error('Blogger not found')
        }

        bloggers = bloggers.map((e) => {
            if (dto.id === e.id) {
                return {...e, name: dto.name, youtubeUrl: dto.youtubeUrl}
            }
            return e
        })
        if (!bloggers.find((e) => e.id === dto.id)) {
            throw new Error('Some error occurred')
        }
    },

    deleteBlogger(id: number) {
        const blogger = bloggersRepository.getBlogger(id)
        if (!blogger) {
            throw new Error('Blogger not found')
        }

        bloggers = bloggers.filter((e) => e.id !== id)
        if (bloggers.find((e) => e.id === id)) {
            throw new Error('Some error occurred')
        }
    }
}

export const postRepository = {
    getPosts() {
        return posts
    },

    getPost(id: number) {
        const post = posts.find((e) => e.id === id)
        if (!post) {
            throw new Error('Post not found')
        }
        return post
    },

    createPost(dto: ICreatePost) {
        const blogger = bloggersRepository.getBlogger(dto.bloggerId)

        if (!blogger) {
            throw new Error('Blogger not found, cant add the post')
        }
        if (postRepository.getPost(dto.id)) {
            throw new Error('ID duplicated')
        }

        posts = [...posts, {...dto, bloggerName: blogger.name}]

        if (!posts.find((e) => e.id === dto.id)) {
            throw new Error('Some error occurred')
        }

    },

    updatePost(dto: ICreatePost) {
        const post = postRepository.getPost(dto.id)
        if  (!post) {
            throw new Error('Post not found')
        }

        const blogger = bloggersRepository.getBlogger(dto.bloggerId)
        if (!blogger) {
            throw new Error('Blogger not found')
        }

        posts = posts.map((e) => {
            if (dto.id === e.id) {
                if (blogger.id !== e.id) {
                    return {...e, ...dto, bloggerName: blogger.name}
                }
                return {...e, ...dto}
            }
            return e
        })

    },

    deletePost(id: number) {
        const post = postRepository.getPost(id)
        if (!post) {
            throw new Error('Post not found')
        }

        posts.filter((e) => e.id !== id)
        if (posts.find((e) => e.id === id)) {
            throw new Error('Some error occurred')
        }
    }
}