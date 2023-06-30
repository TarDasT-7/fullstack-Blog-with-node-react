import BlogCardComponent from "../Card/BlogCard.component";
import classes from './Blog.module.scss'


export const ShowBlog = (blogs) => {
    return blogs.map((blog, index) => {
        return (
            <BlogCardComponent key={index} {...blog} />
        )
    })
}

export const ShowCategories = (categories) => {
    return categories.map((cate, index) => {
        return (
            <h1> {cate.name} </h1>
        )
    })
}

export const ShowTags = (tags) => {
    return tags.map((tag, index) => {
        return (
            <h1> {tag.name} </h1>
        )
    })
}

