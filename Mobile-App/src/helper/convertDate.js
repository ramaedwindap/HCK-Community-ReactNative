
export default function convertDate(date) {
    const event = new Date(date);
    const options = {
        month: "short",
        day: "numeric",
    };

    return event.toLocaleString('en-US', options)
}
