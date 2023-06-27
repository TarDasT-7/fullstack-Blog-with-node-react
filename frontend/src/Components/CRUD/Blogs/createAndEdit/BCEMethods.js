export const blogFromLocalStorage = () => {
    if (typeof window === 'undefined') {
        return false
    }
    const getBlogFromLocalStorage = localStorage.getItem('blog');

    if (getBlogFromLocalStorage && getBlogFromLocalStorage !== null) {
        if (window.confirm('Do you want to continue your unfinished blog?')) {
            return JSON.parse(localStorage.getItem('blog'))
        } else {
            localStorage.removeItem('blog')
            document.getElementsByClassName("ql-editor")[0].innerHTML = null;
        }
    } else {
        return false
    }
}

export const cancleForm = () => {
    localStorage.removeItem('blog')
}