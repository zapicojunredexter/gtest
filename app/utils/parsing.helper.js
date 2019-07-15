export const responseToJson = async (response) => {
    try {
        const text = await response.text();
        console.log('response:', text);
        const object = JSON.parse(text);
        if(object.error) {
            throw new Error(object.error);
        }
        return JSON.parse(text);
    } catch(error) {
        throw error;
    }
}