class FileApi {
    static requestHeaders() {
      return {'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`}
    }

    static uploadFile(file) {
        const headers = Object.assign({'Content-Type': 'multipart/form-data'}, this.requestHeaders());
        const formData = new FormData();
        formData.append('file',file);
        const request = new Request(`${process.env.API_HOST}/api/upload`, {
            method: 'POST',
            headers: headers,
            body: formData
        });

        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}

export default FileApi;