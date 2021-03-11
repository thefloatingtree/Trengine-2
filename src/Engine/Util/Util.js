// from https://jslib.k6.io/
// Wanted to use the uuid npm package but it wouldn't run in my node environment. This should suffice
export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16);
    })
}
