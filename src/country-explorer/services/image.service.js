const API_KEY = "46708042-26f60325ad4b0fb84d4a1e889";
import http from "../../shared/services/http-common.js"

export class ImageService {
    apiKey = `${API_KEY}`;

    getImageByName(name) {
        return http.get(`?key=${this.apiKey}&q=${name}&image_type=photo`)
    }
}