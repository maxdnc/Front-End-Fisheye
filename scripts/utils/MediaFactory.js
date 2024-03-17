class ImageMedia {
  constructor(source, title, className) {
    this.source = source;
    this.title = title;
    this.className = className;
  }

  display() {
    return `<img src="${this.source}" class="${this.className}" alt="${this.title}" >`;
  }
}

class VideoMedia {
  constructor(source, title, className) {
    this.source = source;
    this.title = title;
    this.className = className;
  }

  display() {
    return `<video class="${this.className}" aria-label="${this.title}" ><source src="${this.source}" type="video/mp4"></video>`;
  }
}

export default class MediaFactory {
  constructor(type, source, title, className) {
    this.type = type;
    this.source = source;
    this.title = title;
    this.className = className;
  }

  createMedia() {
    switch (this.type) {
      case 'image':
        return new ImageMedia(this.source, this.title, this.className);
      case 'video':
        return new VideoMedia(this.source, this.title, this.className);
      default:
        throw new Error(`Invalid media type: ${this.type}`);
    }
  }
}
