export const calculateStartAndEndIndex = (page, itemsPerPage) => {
    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    return [startIdx, endIdx];
}

export const calculateTotalPages = (list, itemsPerPage) => {
    return Math.ceil(list.length / itemsPerPage);
}

export const calculateFilteredTags = (tags, searchKeyword) => {
    if (!searchKeyword) return tags;
    const keywordLower = searchKeyword.toLowerCase();
    return tags.filter(tag => tag.name.toLowerCase().includes(keywordLower));
}
