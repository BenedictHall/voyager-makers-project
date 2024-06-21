const iso8601ToReadableTime = (isoDuration) => {
    const matches = isoDuration.match(/PT(\d+)H(\d+)M/);
    if (!matches) return "Invalid duration";

    const hours = parseInt(matches[1]);
    const minutes = parseInt(matches[2]);

    let timeString = "";
    if (hours > 0) {
        timeString += `${hours} hour${hours > 1 ? 's' : ''}`;
    }
    if (minutes > 0) {
        timeString += ` ${minutes} minute${minutes > 1 ? 's' : ''}`;
    }

    return timeString.trim();
}

module.exports = iso8601ToReadableTime