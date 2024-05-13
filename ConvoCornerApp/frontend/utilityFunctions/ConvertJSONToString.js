export function convertedText(data) {
    if(data === null || data === undefined) {
        return ""
    }
    const convertedText = (JSON.parse(data)).reduce((acc, curr) => {
        if (curr.insert) {
            acc += curr.insert;
        }
        return acc;
    }, '');
    return convertedText;
};