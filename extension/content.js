import { OpenVidu } from 'openvidu-browser';

const OV = new OpenVidu();
const session = OV.initSession();

session.on('streamCreated', (event) => {
  session.subscribe(event.stream, 'video-container');
});

session.connect('https://i11a707.p.ssafy.io/ov-server', 'YOUR_TOKEN')
  .then(() => {
    const publisher = OV.initPublisher('video-container');
    session.publish(publisher);
  })
  .catch((error) => {
    console.error('Error connecting to OpenVidu session:', error);
  });
