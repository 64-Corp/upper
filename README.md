upper
=====

[![wercker status](https://app.wercker.com/status/06e639df26a492af27037e8f953b9178/s "wercker status")](https://app.wercker.com/project/bykey/06e639df26a492af27037e8f953b9178) <img src="https://david-dm.org/iyadassaf/upper.png" />


[![Gitter chat](https://badges.gitter.im/IyadAssaf/upper.png)](https://gitter.im/IyadAssaf/upper)

File uploader with backend express support and frontend AMD support.

Transport should primaily be via websockets and utilize the browser FileReader api, which should be supported in the below browsers.
The `ws` library is used to listen to ws://.../upper to establish a file upload queue between the client and the server

**Needs to support:**
- IE10+
- Safari 6+
- Latest 4/5 versions of Chrome, Firefox

####Future features
- Upload from facebook, twitter, g+ etc
