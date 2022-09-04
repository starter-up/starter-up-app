import axios from 'axios';

class Axios {
    static cancelTokenSources = axios.CancelToken.source();
    static request() {
        const baseURL = process.env.API_HOST;
        if (!baseURL) {
            throw new Error('API_HOST env not found');
        }
        return axios.create({
            baseURL,
            cancelToken: this.cancelTokenSources.token,
        });
    }

    static cancellAlRequests() {
        this.cancelTokenSources.cancel();
        this.cancelTokenSources = axios.CancelToken.source();
    }
}

export { Axios };
