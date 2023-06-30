import { useState, useEffect } from "react";
import { listBlogWithCategoriesAndTags } from "../../../Actions/Blog";
import classes from './Blog.module.scss'
import MenuContent from "../../../Pages/MenuContent";
import { LoadingComponent } from "../../Loading/Loading.component";
import { ShowBlog, ShowCategories, ShowTags } from "./Methods";
import { SetTitle } from "../../../Helpers/SetHeader";

const BlogComponent = () => {

    const [blogs, setBlogs] = useState();
    const [categories, setCategories] = useState();
    const [tags, setTags] = useState();
    const [size, setSize] = useState([]);
    const [loading, setLoading] = useState(true)

    const DataHandler = async () => {

        return listBlogWithCategoriesAndTags().then(data => {

            setLoading(false)

            if (data.error) {
                console.log(data.error);
            } else {
                setBlogs(ShowBlog(data.blogs))
                setCategories(ShowCategories(data.categories))
                setTags(ShowTags(data.tags))
                setSize(data.size)
                return;
            }
        })
    }

    useEffect(() => {
        DataHandler();
    }, [])
    
    return (
        <>
            {SetTitle('Blogs Page')}
            <MenuContent>
                {loading ? <LoadingComponent /> :
                    <main className={classes.main}>
                        <div>
                            <header className={classes.header}>
                                <div className={classes.title_header}>
                                    <h1>List of blogs</h1>
                                </div>
                            </header>
                        </div>
                        <div className={classes.content}>
                            {blogs}
                        </div>
                    </main>

                }
            </MenuContent>
        </>
    );

}

export default BlogComponent;