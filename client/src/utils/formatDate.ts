const formatDate = (photo_date: string) => {
    const newDate = new Date(photo_date);
    return `${newDate.getMonth()+1}/${newDate.getDate()}/${newDate.getFullYear()}`;
}

export default formatDate;