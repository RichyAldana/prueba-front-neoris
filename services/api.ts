import axios from "axios";

const api = axios.create({
    baseURL: "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros",
});

export default api;