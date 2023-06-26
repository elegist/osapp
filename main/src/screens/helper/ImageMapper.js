/**
 * Provides manual mapping of relative image paths
 */
class ImageMapper {
  static getImagePath(imageName) {
    const path = '../../assets/osa_images/';
    const thumbnailPath = '../../assets/project_examples/thumbnails/';
    switch (imageName) {
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
      case 'thumb1.jpg':
        return require(thumbnailPath + 'thumb1.jpg');
      case 'thumb2.jpg':
        return require(thumbnailPath + 'thumb2.jpg');
      case 'thumb3.jpg':
        return require(thumbnailPath + 'thumb3.jpg');
      case 'medienproduktion.jpg':
        return require(thumbnailPath + 'medienproduktion.jpg');
      case 'webframeworks.jpg':
        return require(thumbnailPath + 'webframeworks.jpg');
      case 'frontend.jpg':
        return require(thumbnailPath + 'frontend.jpg');
      case 'mow2.jpg':
        return require(thumbnailPath + 'mow2.jpg');
      case 'av2-1.jpg':
        return require(thumbnailPath + 'av2-1.jpg');
      case 'av2-2.jpg':
        return require(thumbnailPath + 'av2-2.jpg');
      case 'foto.jpg':
        return require(thumbnailPath + 'foto.jpg');
      // Add more cases for other image names
      default:
        return null; // Handle unknown image names
    }
  }
}

export default ImageMapper;
