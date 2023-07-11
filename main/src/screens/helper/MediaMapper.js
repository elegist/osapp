/**
 * Provides manual mapping of relative image paths
 */
class MediaMapper {
  static getOsaImage(mediaName) {
    const path = '../../assets/osa_images/';
    switch (mediaName) {
      case 'thm-haupteingang.jpg':
        return require(path + 'thm-haupteingang.jpg');
      case 'thm-campus.jpg':
        return require(path + 'thm-campus.jpg');
      case 'thm-gebaeude-b.jpg':
        return require(path + 'thm-gebaeude-b.jpg');
      case 'thm-hoersaal.jpg':
        return require(path + 'thm-hoersaal.jpg');
      case 'thm-info.jpg':
        return require(path + 'thm-info.jpg');
      case 'thm-medienlabor.jpg':
        return require(path + 'thm-medienlabor.jpg');
      case 'thm-studio.jpg':
        return require(path + 'thm-studio.jpg');
      case 'thm-mensa.jpg':
        return require(path + 'thm-mensa.jpg');
      case 'thm-bib.jpg':
        return require(path + 'thm-bib.jpg');
      case 'thm-bib2.jpg':
        return require(path + 'thm-bib2.jpg');
      case 'informatik.jpg':
        return require(path + 'informatik.jpg');
      case 'internet.jpg':
        return require(path + 'internet.jpg');
      case 'programming.jpg':
        return require(path + 'programming.jpg');
      case 'av-live.jpg':
        return require(path + 'av-live.jpg');
      case 'av-mixer.jpg':
        return require(path + 'av-mixer.jpg');
      case 'av-production.jpg':
        return require(path + 'av-production.jpg');
      case 'gd-lamp.jpg':
        return require(path + 'gd-lamp.jpg');
        case 'gd-math.jpg':
          return require(path + 'gd-math.jpg');
      // Add more cases for other image names
      default:
        return null; // Handle unknown image names
    }
  }

  static getExampleThumbnail(mediaName) {
    const path = '../../assets/project_examples/thumbnails/';

    switch (mediaName) {
      case 'av2-angels-thumbnail.png':
        return require(path + 'av2-angels-thumbnail.png');
      case 'av2-lazarus-thumbnail.png':
        return require(path + 'av2-lazarus-thumbnail.png');
      case 'fd-dijkstra-thumbnail.png':
        return require(path + 'fd-dijkstra-thumbnail.png');
      case 'fub-regeneration-thumbnail.png':
        return require(path + 'fub-regeneration-thumbnail.png');
      case 'gd1-car-thumbnail.png':
        return require(path + 'gd1-car-thumbnail.png');
      case 'gd2-lamp-thumbnail.png':
        return require(path + 'gd2-lamp-thumbnail.png');
      case 'gd2-ring-thumbnail.png':
        return require(path + 'gd2-ring-thumbnail.png');
      case 'gd3-mimic-thumbnail.png':
        return require(path + 'gd3-mimic-thumbnail.png');
      case 'gd3-rack-thumbnail.png':
        return require(path + 'gd3-rack-thumbnail.png');
      case 'md-iphone-thumbnail.png':
        return require(path + 'md-iphone-thumbnail.png');
      case 'md-squirrel-thumbnail.png':
        return require(path + 'md-squirrel-thumbnail.png');
      case 'mow2-bug-thumbnail.png':
        return require(path + 'mow2-bug-thumbnail.png');
      case 'mpm-reise-thumbnail.png':
        return require(path + 'mpm-reise-thumbnail.png');
      case 'wfr-tasse-thumbnail.png':
        return require(path + 'wfr-tasse-thumbnail.png');

      default:
        return null;
    }
  }

  static getExampleContentImage(mediaName) {
    const path = '../../assets/project_examples/content/imgs/';

    switch (mediaName) {
      case 'fd-dijkstra.png':
        return require(path + 'fd-dijkstra.png');
      case 'fub-regeneration.png':
        return require(path + 'fub-regeneration.png');
      case 'gd1-detail-1.png':
        return require(path + 'gd1-detail-1.png');
      case 'gd1-detail-2.png':
        return require(path + 'gd1-detail-2.png');
      case 'gd1-full.png':
        return require(path + 'gd1-full.png');
      case 'gd1-uv.png':
        return require(path + 'gd1-uv.png');
      case 'gd1-wireframe.png':
        return require(path + 'gd1-wireframe.png');
      case 'gd2-lamp.png':
        return require(path + 'gd2-lamp.png');
      case 'gd2-ring.png':
        return require(path + 'gd2-ring.png');
      case 'mow2-game.png':
        return require(path + 'mow2-game.png');
      case 'mow2-gameover.png':
        return require(path + 'mow2-gameover.png');
      case 'mow2-mainmenu.png':
        return require(path + 'mow2-mainmenu.png');
      case 'mow2-settings.png':
        return require(path + 'mow2-settings.png');
      case 'mpm-reise-1.png':
        return require(path + 'mpm-reise-1.png');
      case 'mpm-reise-2.png':
        return require(path + 'mpm-reise-2.png');
      case 'mpm-reise-3.png':
        return require(path + 'mpm-reise-3.png');
      case 'wfr-1.png':
        return require(path + 'wfr-1.png');
      case 'wfr-2.png':
        return require(path + 'wfr-2.png');
      case 'wfr-3.png':
        return require(path + 'wfr-3.png');
      case 'wfr-4.png':
        return require(path + 'wfr-4.png');
      case 'wfr-5.png':
        return require(path + 'wfr-5.png');

      default:
        return null;
    }
  }

  static getExampleContentVideo(mediaName) {
    const path = '../../assets/project_examples/content/videos/';

    switch (mediaName) {
      case 'av2-angels.mp4':
        return require(path + 'av2-angels.mp4');
      case 'av2-lazarus.mp4':
        return require(path + 'av2-lazarus.mp4');
      case 'fd-algorithm.mp4':
        return require(path + 'fd-algorithm.mp4');
      case 'fd-story.mp4':
        return require(path + 'fd-story.mp4');
      case 'gd3-mimic.mp4':
        return require(path + 'gd3-mimic.mp4');
      case 'gd3-rack.mp4':
        return require(path + 'gd3-rack.mp4');
      case 'md-iphone.mp4':
        return require(path + 'md-iphone.mp4');
      case 'md-squirrel.mp4':
        return require(path + 'md-squirrel.mp4');
      case 'mow2-highlevel.mp4':
        return require(path + 'mow2-highlevel.mp4');
      case 'mow2-start.mp4':
        return require(path + 'mow2-start.mp4');

      default:
        return null;
    }
  }
}

export default MediaMapper;
