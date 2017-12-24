class FileApi {
    static uploadFile(file) {
        const formData = new FormData();
        formData.append('file',file);
        const request = new Request(`${process.env.API_HOST}/api/upload`, {
            method: 'POST',
            body: formData
        });
        console.log(request);
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}

export default FileApi;