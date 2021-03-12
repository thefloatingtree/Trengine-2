export function convertToType(value, type) {
    switch (type) {
        case "number":
            return Number(value)
        case "boolean":
            return Boolean(value)
        case "object":
            return JSON.parse(value)
        case "string":
        default:
            return String(value)
    }
}