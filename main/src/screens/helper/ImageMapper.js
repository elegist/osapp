/**
 * Provides manual mapping of relative image paths
 */
class ImageMapper {
  static getImagePath(imageName) {
    switch (imageName) {
      case 'thm-haupteingang.jpg':
        return require('../../assets/osa_images/thm-haupteingang.jpg');
      case 'thm-campus.jpg':
        return require('../../assets/osa_images/thm-campus.jpg');
      case 'thm-gebaeude-b.jpg':
        return require('../../assets/osa_images/thm-gebaeude-b.jpg');
      case 'thm-hoersaal.jpg':
        return require('../../assets/osa_images/thm-hoersaal.jpg');
      case 'thm-info.jpg':
        return require('../../assets/osa_images/thm-info.jpg');
      case 'thm-medienlabor.jpg':
        return require('../../assets/osa_images/thm-medienlabor.jpg');
      case 'thm-studio.jpg':
        return require('../../assets/osa_images/thm-studio.jpg');
      case 'thm-mensa.jpg':
        return require('../../assets/osa_images/thm-mensa.jpg');
      case 'thm-bib.jpg':
        return require('../../assets/osa_images/thm-bib.jpg');
      case 'thm-bib2.jpg':
        return require('../../assets/osa_images/thm-bib2.jpg');
      // Add more cases for other image names
      default:
        return null; // Handle unknown image names
    }
  }
}

export default ImageMapper;
