import { Helmet } from "react-helmet";
import { APP_NAME } from "../config";

export const SetTitle = (title) => {

    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{APP_NAME} | {title} </title>
            <meta name="description" content="Blog about all title" />
        </Helmet>
    )
}

