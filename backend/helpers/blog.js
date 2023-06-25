export const SmartTrim = (str, length, delimiter, appendix) => {

    if (str.length <= length)
        return str;

    let trimmedStr = str.substr(0, length + delimiter.length);

    let lastDelimIndex = trimmedStr.lastIndexOf(delimiter);

    if (lastDelimIndex >= 0)
        trimmedStr = trimmedStr.substr(0, lastDelimIndex)

    if (trimmedStr)
        trimmedStr += appendix;

    return trimmedStr;
}