class FileApi {
    static requestHeaders() {
      return {'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`}
    }

    static uploadFile(file) {
        //const headers = Object.assign({'Content-Type': 'multipart/form-data'}, this.requestHeaders());
        const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
        const formData = new FormData();
        formData.append('file',file);
        const request = new Request(`${process.env.API_HOST}/api/upload`, {
            method: 'POST',
            mode: "no-cors",
            headers: headers,
            body: formData,
        });
        console.log(request);
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static getTest() {
        const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
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