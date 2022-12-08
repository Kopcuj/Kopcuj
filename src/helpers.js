export const tryImage = (path, name) => {
    try {
        return require(path + name + `.webp`);
    } catch (err) {
        return require(`./img/nohill.webp`);
    }
};