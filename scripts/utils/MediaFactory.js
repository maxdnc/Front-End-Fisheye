class ImageMedia {
  constructor(source, title) {
    this.source = source;
    this.title = title;
  }

  display() {
    return `<img src="${this.source}" class="card__media" alt="${this.title}" >`;
  }
}

class VideoMedia {
  constructor(source, title) {
    this.source = source;
    this.title = title;
  }

  display() {
    return `<video  class="card__media" aria-label="${this.title}" controlsList="nodownload nofullscreen noremoteplayback"><source src="${this.source}" type="video/mp4"></video>`;
  }
}

export default class MediaFactory {
  constructor(type, source, title) {
    this.type = type;
    this.source = source;
    this.title = title;
  }

  createMedia() {
    switch (this.type) {
      case 'image':
        return new ImageMedia(this.source, this.title);
      case 'video':
        return new VideoMedia(this.source, this.title);
      default:
        throw new Error(`Invalid media type: ${this.type}`);
    }
  }
}
