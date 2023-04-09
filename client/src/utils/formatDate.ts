const formatDate = (photo_date: string) => {
    const newDate = new Date(photo_date);
    return `${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()}`;
}

export default formatDate;