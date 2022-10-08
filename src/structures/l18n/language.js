export default ({str, opt, langFolder}) => {
    let string = langObject({ obj: str, translate: langFolder });
    
    if (typeof string === 'undefined') {
        string = langObject({ obj: `translate.missing`, translate: langFolder });
        opt = { str: str };
    }
    if (opt) for (const [key, value] of Object.entries(opt)) string = string?.replace(new RegExp(`{{${key}}}`, 'g'), value);
    // console.log(string)
    return string;
}

function langObject({ obj, translate }) {
    const split = obj.split('.');
    let result = split.reduce((prev, curr) => prev && prev[curr], translate);
    return result;
}