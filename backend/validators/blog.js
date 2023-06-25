export const blogCreateValidator = (title = false, body = false, categories = false, tags = false) => {


    let result = Array();
    let checkValidation = [];

    if (!title || !title[0].length) {
        result[0] = {
            title: 'title',
            success: false,
            message: 'Title is required'
        }
    }
    if (!body || body[0].length < 200) {

        result[1] = {
            title: 'body',
            success: false,
            message: 'Content is too short'
        }
    }

    if (!categories || !categories.length === 0) {
        result[2] = {
            title: 'categories',
            success: false,
            message: 'At least one categry is required'
        }
    }

    if (!tags || !tags.length === 0) {
        result[3] = {
            title: 'tags',
            success: false,
            message: 'At least one tag is required'
        }
    }

    result.forEach((item, i) => {
        if (item.success === false) {
            checkValidation.push({
                title: item.title,
                message: item.message
            });
        }
    })

    return checkValidation;
}
