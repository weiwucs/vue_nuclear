
const server = {
    host: 'http://192.168.1.113', port: '8080', endpointUrl: '/nuclear3', endpointApiUrl: '/nuclear3',
    url(uri){
        return this.host + ':' + this.port + this.endpointApiUrl + uri;
    }
}

const config = {
    baseIP: server.url(''),
    imagesIP: server.url('/images'),
    classRouteMapper: [
        { class: 'user', url: server.url('/user')},
        { class: 'optical_satellite', url: server.url('/optical_satellite')},
        { class: 'radar_satellite', url: server.url('/radar_satellite')},
        { class: 'login', url: server.url('/user/login')},
    ]
};

export default config;
