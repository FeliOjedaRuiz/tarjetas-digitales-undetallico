module.exports.generateUniqueSlug = (recipient) => {
    const name = recipient || 'alguien-especial';

    const cleanName = name
        .toString()
        .toLowerCase()
        .trim()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Quita tildes (á -> a)
        .replace(/[\s\W-]+/g, '-'); // Reemplaza espacios y símbolos por guiones

    const randomString = Math.random().toString(36).substring(2, 11);

    return `undetallico-para-ti-${cleanName}-${randomString}`;
};