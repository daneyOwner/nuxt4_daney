function copyText(text: string) {
    if (import.meta.client && navigator?.clipboard) {
        return navigator.clipboard.writeText(text)
            .then(() => true)
            .catch(() => false);
    }

    return false;
}

export default copyText;