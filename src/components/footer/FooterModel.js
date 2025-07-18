export const createFooterModel = (sections) => {
    if (!Array.isArray(sections) || sections.some(section => typeof section !== 'object' || !section.title || !Array.isArray(section.links))) {
        throw new Error('Sections must be an array of objects with title and links array.');
    }

    return {
        sections
    };
};
