import { ref } from 'vue';

export default function useLocalStorage(key) {
    const storedValue = process.client ? localStorage.getItem(key) : null;
    let value = ref(null);
    
    try {
        value = ref(storedValue ? JSON.parse(storedValue) : null);
    } catch (e) {
        value = ref(storedValue);
    }
    function set(newValue) {
        value.value = newValue;
        if (process.client) {
            localStorage.setItem(key, JSON.stringify(newValue));
        }
    }

    function remove() {
        value.value = null;
        if (process.client) {
            localStorage.removeItem(key);
        }
    }

    return [value, set, remove];
}