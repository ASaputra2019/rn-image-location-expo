class Place {
  constructor(
    id,
    title,
    imageUri,
    description,
    address,
    lat,
    lng
  ) {
    this.id = id;
    this.title = title;
    this.imageUri = imageUri;
    this.description = description;
    this.address = address;
    this.lat = lat;
    this.lng = lng;
  }
};

export default Place;