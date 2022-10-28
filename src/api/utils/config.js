
const server = {
    //host: 'http://localhost', port: '8080', endpointUrl: '/nuclear', endpointApiUrl: '/nuclear',
    host: 'http://192.168.1.134', port: '8080', endpointUrl: '/nuclear', endpointApiUrl: '/nuclear',
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
        { class: 'world_boundary', url: server.url('/world_boundary')},
    ]
};

export default config;
