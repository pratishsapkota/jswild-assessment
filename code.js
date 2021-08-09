// To run this assignment, right click on index.html in the Visual Studio file explorer to the left
// and select "Open with Live Server"

// Your Code Here.
const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const message = "Geolocation is not supported by your browser";
        console.log(message);
        const defaultCoordinates = {
          latitude: "31.230416",
          longitude: "121.473701",
        };
  
        resolve(defaultCoordinates);
      } else {
        navigator.geolocation.watchPosition(
          (position) => {
            const location = {
              latitude: position.coords.latitude.toString(),
              longitude: position.coords.longitude.toString(),
            };
            console.log(position);
            resolve(location);
          },
          (error) => reject(error)
        );
      }
    });
  };
  getLocation();


  const constructUrl = (coordinates) => {
    return new Promise((resolve, reject) => {
      if (
        coordinates === undefined ||
        coordinates.latitude === undefined ||
        coordinates.longitude === undefined
      ) {
        reject("Could not construct the URL for invalid location.");
      }
      const url =
        "https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/" +
        "?api_key=85c448d5f7b80a16791104fc74e0965c&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5" +
        "&lat=" +
        encodeURIComponent(coordinates.latitude) +
        "&lon=" +
        encodeURIComponent(coordinates.longitude) +
        "&text=nature";
      resolve(url);
    });
  };
  
  const constructImageUrl = (photos) => {
    return photos.map((photo) => {
      return (
        "https://farm" +
        photo.farm +
        ".staticflickr.com/" +
        photo.server +
        "/" +
        photo.id +
        "_" +
        photo.secret +
        ".jpg"
      );
    });
  };
  
  const displayImage = (photos) => {
    const imageSource = constructImageUrl(photos);
  
    const rootElement = document.getElementById("main");
    const imgElement = document.createElement("img");
    imgElement.src = imageSource[0];
    imgElement.height = 300;
    imgElement.width = 500;
    rootElement.appendChild(imgElement);
    let index = 1;
    const setAttribute = () => {
      imgElement.src = imageSource[index];
      index++;
      if (index > 4) {
        index = 0;
      }
    };
    setInterval(setAttribute, 5000);
  };
  
//   const main = () => {
    getLocation()
      .then((loc) => constructUrl(loc))
      .then((path) => fetch(path))
      .then((response) => response.json())
      .then((jsonResponse) => displayImage(jsonResponse.photos.photo))
      .catch((error) => console.log(error));
//   };
  
//   main();
//Adding a comment