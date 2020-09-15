import * as FileSystem from 'expo-file-system';

export const ADD_PLACE = 'ADD_PLACE';

export const addPlace = (title, image) => {
    return async dispatch => {
        const fileName = image.split('/').pop(); // get last item
        const newPath = FileSystem.documentDirectory + fileName;

        try {
            // move file
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            });
        } catch (err) {
            console.log(err);
            throw err;
        }

        // store permanent file directory in memory but not store data itself in a permanent storage
        dispatch({ type: ADD_PLACE, placeData: { title, image: newPath } });
    };
};