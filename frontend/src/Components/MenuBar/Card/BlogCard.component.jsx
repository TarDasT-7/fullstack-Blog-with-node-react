import moment from "moment/moment";
import { Link } from "react-router-dom"
import { API } from "../../../config";

import classes from './BlogCard.module.scss'


const BlogCardComponent = (blog) => (


    <article className={classes.item}>

        <div className={classes.item_box}>

            <Link to="#" className={classes.item_link}>
                <div className={classes.item_header}>
                    {/* <div className={classes.img} style={{ backgroundImage: `url(${API}/blog/photo/${blog.slug})` }} /> */}
                    <img src={`${API}/blog/photo/${blog.slug}`} alt={blog.slug} />
                </div>
            </Link>

            <Link to="#" className={classes.item_link}>
                <div className={classes.item_body}>
                    <div className={classes.item_title}>
                        <span>{blog.title}</span>
                    </div>
                </div>
            </Link>

            <div className={classes.item_footer}>

                <div className={classes.item_time}>
                    <span>  By <Link>{blog.postedBy.name}</Link> on {moment(blog.updatedAt).fromNow()}</span>
                </div>

            </div>


        </div>

    </article>

)
export default BlogCardComponent;