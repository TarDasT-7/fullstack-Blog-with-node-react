export const blogFromLocalStorage = () => {
    if (typeof window === 'undefined') {
        return false
    }
    const getBlogFromLocalStorage = localStorage.getItem('blog');

    if (getBlogFromLocalStorage && getBlogFromLocalStorage !== null) {
        return JSON.parse(localStorage.getItem('blog'))

    } else {
        return false
    }
}

export const cancleForm = () => {
    localStorage.removeItem('blog')
}
