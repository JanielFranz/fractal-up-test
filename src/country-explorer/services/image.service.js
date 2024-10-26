const API_KEY = "46708042-26f60325ad4b0fb84d4a1e889";
import http from "../../shared/services/http-common.js"

/**
 * Service Pixabay API
 * @class ImageService
 * @description
 * Service to get images from Pixabay API
 */
export class ImageService {
    apiKey = `${API_KEY}`;

    /**
     * Get image by name
     * @param name - name of the image
     * @returns {Promise<axios.AxiosResponse<any>>} - response from the API, it contains the image url
     */
    getImageByName(name) {
        return http.get(`?key=${this.apiKey}&q=${name}&image_type=photo`)
    }
}