class ImageMedia {
  constructor(source) {
    this.source = source;
  }

  display() {
    return `<img src="${this.source}" class="card__media" alt="Image">`;
  }
}

class VideoMedia {
  constructor(source) {
    this.source = source;
  }

  display() {
    return `<video class="card__media" controlsList="nodownload nofullscreen noremoteplayback"><source src="${this.source}" type="video/mp4"></video>`;
  }
}

export default class MediaFactory {
  constructor(type, source) {
    this.type = type;
    this.source = source;
  }

  createMedia() {
    switch (this.type) {
      case 'image':
        return new ImageMedia(this.source);
      case 'video':
        return new VideoMedia(this.source);
      default:
        throw new Error(`Invalid media type: ${this.type}`);
    }
  }
}
