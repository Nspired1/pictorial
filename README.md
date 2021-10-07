# Pictorial

## :zap: Instagram-like clone, but more of a tutorial of image uploads and images

- Simple full-stack app that shows a list of images from the React client and processed on the Express server. Image filename and filepath are saved in a hosted Mongo Atlas Database, while the images themselves are saved in Cloudinary, a cloud provider for hosting images and video. The two main things I learned from this app is how to use React for image upload and image preview.

## :page_facing_up: Table of Contents

- [:zap: Pictorial](#zap-Pictorial)
  - [:page_facing_up: Table of Contents](#page_facing_up-table-of-contents)
  - [:books: General Info](#books-general-info)
  - [:camera: Screenshots](#camera-screen-shots)
  - [:microscope: Deep Dive](#microscope-deep-dive)
  - [:computer: Technologies](#computer-technologies)
  - [:floppy_disk: Setup](#floppy_disk-setup)
  - [:sunglasses: Features](#cool-features)
  - [:clipboard: Pending Features](#clipboard-pending-features)
  - [:clap: Inspiration](#clap-inspiration)
  - [:envelope: Contact](#envelope-contact)

## :books: General Info

- A simple Instagram-like clone using React for the frontend client, Express node.js for the backend server, using MongoDB Atlas as the cloud hosted database, and Cloudinary for the cloud based image hosting. This was built to better understand image upload with React. I say Instagram-like because it's the most widely know image app, though Flickr or 500px would be similar image applications. This is more for getting practical application of image/file uploading using React and React hooks.

- React is a separate frontend server, which is different than a view engine like EJS, PUG, or JADE. Using a view engine with a backend server simplifies image uploading. However, I wanted to see how to pass the "app state" of images and an authenticated user across the application to different pages. The app was built by searching several tutorials, MDN Docs, and googling Stackoverflow answers.

- Working with images and associated data using React, Context, and Express was more difficult than I initially thought. Some of those issues are captured in the deep dive and pending features. The basic issue is working with React, synthetic events, and images is different than working with HTML forms and images. Many small issues arise due to the difference between a React uncontrolled component (image upload) and React controlled component (user input). Then sending the Form Data which includes the image and associated text through Context to the Express server, manipulating the data, and back to the React UI. Retrieving and manipulating that Form Data didn't work as working with JSON, but it is a learning experience. This is what I have learned so far and my intention is to learn more and update this app in the future.

## :camera: Screenshots

![Screenshot1](/screenshots/screenshot1.png)

![Screenshot2](/screenshots/screenshot2.png)

![Screenshot2](/screenshots/screenshot3.png)

## :microscope: Deep Dive

- Uploading images with React is different than with a HTML form. In HTML forms you need to add a property `enctype` and set it to `multi-part/form-data`. In a React form that is not needed (that would be done in a fetch or axios request header setting `Content-type` to `multii-part/form-data`). In the form, the input type is set to file. The onChange function (or whatever change handler function is used) needs to take in `e.target.files[0]` when uploading one file or image. The reason is `e.target.files[0]` is an array, so the target is the first element of the files array.
  `const changeHandler = (e) => {`
  ` setFile(e.target.files[0]);`
  ` };`
  Note that you cannot use the same onChange function for files AND user inputs. The reason is that user inputs are controlled inputs, meaing React controls them. File inputs are UNCONTROLLED COMPONENTS, meaning that the DOM controls the inputs. If the same onChange function is used, React will throw an error saying that both controlled and uncontrolled inputs cannot be in the same form.

  The file attached to a FormData object and is sent via an onSubmit function. Working with the files and the FormData object can be tricky, since you can't attach or call a property in the object. FormData requires methods to get and set data: get(), append(), set(), etc., to access key value pairs. This can cause confusion since the usual pattern is to call the desired property.

  NOTE: There were minor issues that were discovered in making this app.
  One example is even if the app is about creating images, don't call a post an image. Confusion arises between the different data fields like description and name of the post that is called image and the image (file) itself.
  Another issue was the flickering of the image preview while entering description.
  Another example is that if the axios req is structured as:
  `axios.post({ req })` instead of `axios({ method: "post", data...}) ` the file would be included in the http address as if it was sending JSON instead of a data object in form data. The documentation is not clear on the reason (neither in axios, MDN Form Data, Multer, etc), so it would appear to be a setting in a version of one of the libraries. As updates occur to the libraries and npm packages, I will update the app.

  - Multer. The Multer middleware attaches a file object to the request object. Working in conjunction with Multer Cloudinary Storage, the request object is the filename and file path to the image in Cloudinary.
    Also note that Multer is synchronous and doesn't support Promises or asynchronous actions. So, that needs to kept in mind when writing the middleware in the routes.

## :computer: Technologies

- [Node.js ](https://nodejs.org/en/)
- [Express server](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for cloud hosted database
- [Cloudinary](https://cloudinary.com/) for cloud based image storage
- [Multer](https://www.npmjs.com/package/multer) middleware used for uploading files
- [Multer Storage Cloudinary](https://www.npmjs.com/package/multer-storage-cloudinary) library that assists  
   multer in uploading to Cloudinary.
- [React UI](https://reactjs.org/) for frontend user interface
- [JSON Web Tokens](https://www.npmjs.com/package/jsonwebtoken) for authentication
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs) for hashing
- [Express Validator](https://www.npmjs.com/package/express-validator) additional layer of validation

## Additional References:

- [Uncontrolled Components](https://reactjs.org/docs/uncontrolled-components.html) For React file inputs
- [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)

## :floppy_disk: Setup

- Normally, the setup would be to clone this repo, change directory into it, then type `npm install` and `npm client-install`. Because of the services and environment variables for JWT secret, Cloudinary, Mongo Atlas, etc. you would need to open your own account, set up those services, and set your own secrets and environment variables. The environment variables that need to be set are MONGO_ATLAS_SECRET, JWT_SECRET, CLOUDINARY_CLOUD_NAME, CLOUDINARY_KEY, and CLOUDINARY_SECRET.

- After the addition of new features and resolving some Update issues, this will be deployed on Heroku. When that happens, links to the app will be made available.

## :sunglasses: Features

- Image upload
- Image storage, retrieval, and deletion.
- User login and logout
- Alerts for invalid user register and login
- User authorization: only the creator of an image can delete their image.
- Images are displayed by time in ascending order (most recent first).

## :clipboard: Pending Features

- Eliminate image flicker when writing the description on image upload form
- Image upload for user profile image
- Include profile page
- UI refactor
- Enable Reply, repost/retweet, and Likes
- Threading for replies

## :clap: Inspiration

- The inspiration for this app trying to add image upload to another app (Barker), getting practice with React hooks to manage state instead of redux, using context to manage app state, specifically with image uploading and image rendering. Also, drew inspiration from the various image applications like Instagram, 500px, Flickr, and Unsplash.

* [Instagram](https://www.instagram.com/)
* [500px](https://500px.com/)
* [Unsplash](https://unsplash.com/)
* [Flickr](https://www.flickr.com/)
* [Frontend Masters: Complete Intro to React V6: hooks, effects, contexts, etc](https://frontendmasters.com/courses/complete-react-v6/)
* [Dan Abramov: Fundamentals of Redux](https://egghead.io/courses/fundamentals-of-redux-course-from-dan-abramov-bd5cc867)

## :envelope: Contact

- repo created by Don Spire [Nspired1](https://github.com/Nspired1), email: don.spire1@gmail.com
