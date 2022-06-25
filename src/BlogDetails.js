import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
    //to pass any parameter to the router
    const { id } = useParams();
    //import data from useFetch comp 
    const { data: blog, isPending, error } = useFetch('http://localhost:8000/blogs/' + id);
    const history = useHistory();

    const handleClick = () => {
        fetch('http://localhost:8000/blogs/' + blog.id, {
            method: 'DELETE'
        }).then(() =>{
            history.push('/');
        });
    }

    return (
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                    <div>{blog.body}</div>
                </article>
            )}
            <button onClick={handleClick}>delete</button>
        </div>
    );
}

export default BlogDetails;