/**
 * Provides manual mapping of relative image paths
 */
class ImageMapper {
  static getImagePath(imageName) {
    const path = '../../assets/osa_images/';
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
      // Add more cases for other image names
      default:
        return null; // Handle unknown image names
    }
  }
}

export default ImageMapper;
