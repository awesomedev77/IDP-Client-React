export const extractFileName = (path: string): string => {
    // Split the path by the '\' to isolate the file part
    const parts = path.split("\\");
    const fullFileName = parts.pop(); // Get the last element which is the file name with timestamp

    if (!fullFileName) {
        return "Invalid path"; // Return an error message or handle it as needed
    }

    // Remove the timestamp by splitting on the first dash and taking the rest parts
    const nameParts = fullFileName.split("-");
    nameParts.shift(); // Remove the timestamp part (first element)

    // Rejoin the remaining parts that were split, to handle cases where filename might contain dashes
    return nameParts.join("-");
};