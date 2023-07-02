/**
 * Provides manual mapping of relative image paths
 */
class MediaMapper {
  static getMediaPath(mediaName) {
    const path = '../../assets/osa_images/';
    const thumbnailPath = '../../assets/project_examples/thumbnails/';
    const contentImagesPath = '../../assets/project_examples/content/imgs/';
    const contentVideosPath = '../../assets/project_examples/content/videos/';
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
      case 'av2-angels-thumbnail.png':
        return require(thumbnailPath + 'av2-angels-thumbnail.png');
      case 'av2-lazarus-thumbnail.png':
        return require(thumbnailPath + 'av2-lazarus-thumbnail.png');
      case 'fd-dijkstra-thumbnail.png':
        return require(thumbnailPath + 'fd-dijkstra-thumbnail.png');
      case 'fub-regeneration-thumbnail.png':
        return require(thumbnailPath + 'fub-regeneration-thumbnail.png');
      case 'gd1-car-thumbnail.png':
        return require(thumbnailPath + 'gd1-car-thumbnail.png');
      case 'gd2-lamp-thumbnail.png':
        return require(thumbnailPath + 'gd2-lamp-thumbnail.png');
      case 'gd2-ring-thumbnail.png':
        return require(thumbnailPath + 'gd2-ring-thumbnail.png');
      case 'gd3-mimic-thumbnail.png':
        return require(thumbnailPath + 'gd3-mimic-thumbnail.png');
      case 'gd3-rack-thumbnail.png':
        return require(thumbnailPath + 'gd3-rack-thumbnail.png');
      case 'md-iphone-thumbnail.png':
        return require(thumbnailPath + 'md-iphone-thumbnail.png');
      case 'md-squirrel-thumbnail.png':
        return require(thumbnailPath + 'md-squirrel-thumbnail.png');
      case 'mow2-bug-thumbnail.png':
        return require(thumbnailPath + 'mow2-bug-thumbnail.png');
      case 'mpm-reise-thumbnail.png':
        return require(thumbnailPath + 'mpm-reise-thumbnail.png');
      case 'wfr-tasse-thumbnail.png':
        return require(thumbnailPath + 'wfr-tasse-thumbnail.png');
      case 'fd-dijkstra.png':
        return require(contentImagesPath + 'fd-dijkstra.png');
      case 'fub-regeneration.png':
        return require(contentImagesPath + 'fub-regeneration.png');
      case 'gd1-detail-1.png':
        return require(contentImagesPath + 'gd1-detail-1.png');
      case 'gd1-detail-2.png':
        return require(contentImagesPath + 'gd1-detail-2.png');
      case 'gd1-full.png':
        return require(contentImagesPath + 'gd1-full.png');
      case 'gd1-uv.png':
        return require(contentImagesPath + 'gd1-uv.png');
      case 'gd1-wireframe.png':
        return require(contentImagesPath + 'gd1-wireframe.png');
      case 'gd2-lamp.png':
        return require(contentImagesPath + 'gd2-lamp.png');
      case 'gd2-ring.png':
        return require(contentImagesPath + 'gd2-ring.png');
      case 'mow2-game.png':
        return require(contentImagesPath + 'mow2-game.png');
      case 'mow2-gameover.png':
        return require(contentImagesPath + 'mow2-gameover.png');
      case 'mow2-mainmenu.png':
        return require(contentImagesPath + 'mow2-mainmenu.png');
      case 'mow2-settings.png':
        return require(contentImagesPath + 'mow2-settings.png');
      case 'mpm-reise-1.png':
        return require(contentImagesPath + 'mpm-reise-1.png');
      case 'mpm-reise-2.png':
        return require(contentImagesPath + 'mpm-reise-2.png');
      case 'mpm-reise-3.png':
        return require(contentImagesPath + 'mpm-reise-3.png');
      case 'wfr-1.png':
        return require(contentImagesPath + 'wfr-1.png');
      case 'wfr-2.png':
        return require(contentImagesPath + 'wfr-2.png');
      case 'wfr-3.png':
        return require(contentImagesPath + 'wfr-3.png');
      case 'wfr-4.png':
        return require(contentImagesPath + 'wfr-4.png');
      case 'wfr-5.png':
        return require(contentImagesPath + 'wfr-5.png');
      case 'av2-angels.mp4':
        return require(contentVideosPath + 'av2-angels.mp4');
      case 'av2-lazarus.mp4':
        return require(contentVideosPath + 'av2-lazarus.mp4');
      case 'fd-algorithm.mp4':
        return require(contentVideosPath + 'fd-algorithm.mp4');
      case 'fd-story.mp4':
        return require(contentVideosPath + 'fd-story.mp4');
      case 'gd3-mimic.mp4':
        return require(contentVideosPath + 'gd3-mimic.mp4');
      case 'gd3-rack.mp4':
        return require(contentVideosPath + 'gd3-rack.mp4');
      case 'md-iphone.mp4':
        return require(contentVideosPath + 'md-iphone.mp4');
      case 'md-squirrel.mp4':
        return require(contentVideosPath + 'md-squirrel.mp4');
      case 'mow2-highlevel.mp4':
        return require(contentVideosPath + 'mow2-highlevel.mp4');
      case 'mow2-start.mp4':
        return require(contentVideosPath + 'mow2-start.mp4');
      // Add more cases for other image names
      default:
        return null; // Handle unknown image names
    }
  }
}

export default MediaMapper;
