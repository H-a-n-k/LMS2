
const convertToYMD = (date) => {
    var datearray = date.split("/");
    var newdate = datearray[2] + '-' + datearray[1] + '-' + datearray[0];
    return newdate;
}

const convertToDMY = (date) => {
    var datearray = date.split("-");
    var newdate = datearray[2].substring(0,2) + '/' + datearray[1] + '/' + datearray[0];
    return newdate;
}

export { convertToDMY, convertToYMD };