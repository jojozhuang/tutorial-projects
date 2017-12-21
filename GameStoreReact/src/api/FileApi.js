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

    static getTest() {
        const headers = Object.assign({'Content-Type': 'application/json'});
        const request = new Request(`${process.env.API_HOST}/api/upload`, {
            method: 'GET',
            headers: headers
        });

        return fetch(request).then(response => {
            //var res = response.json();
            //console.log(res);
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}

export default FileApi;