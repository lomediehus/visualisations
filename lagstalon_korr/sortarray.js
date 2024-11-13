const data = {
    "Barnskötare med utbildning": 24200,
    "Barnskötare utan utbildning": 20400,
    "Fastighetsskötare": "",
    "Kock": "",
    "Kommun": "Alvesta",
    "Måltidspersonal": 20400,
    "Skötare": "",
    "Städare/ Lokalvårdare": 20400,
    "Stödassistent": "",
    "Undersköterska i äldreomsorg": 24200,
    "Vaktmästare": 20400,
    "Vårdbiträde med utbildning": 23000,
    "Vårdbiträde utan utbildning": 20400
};

// Convert the object to an array of key-value pairs
const dataArray = Object.entries(data);

// Sort the array by the values
dataArray.sort((a, b) => {
    const valueA = a[1];
    const valueB = b[1];

    if (typeof valueA === "number" && typeof valueB === "number") {
        // Compare numeric values
        return valueA - valueB;
    } else if (typeof valueA === "number" || typeof valueB === "number") {
        // Non-numeric values come after numeric values
        return typeof valueA === "number" ? -1 : 1;
    } else {
        // Both are non-numeric, so maintain their order
        return 0;
    }
});

// Convert the sorted array back to an object
const sortedObject = Object.fromEntries(dataArray);

console.log(sortedObject);