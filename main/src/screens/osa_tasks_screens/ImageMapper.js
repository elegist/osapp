// Used to resolve relative paths for images and binds them to the view in a require statement
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
      case 'thm-gebauede-b.jpg':
        return require('../../assets/osa_images/thm-gebaeude-b.jpg');
      case 'thm-hoersaal.jpg':
        return require('../../assets/osa_images/thm-hoersaal.jpg');
      case 'thm-info.jpg':
        return require('../../assets/osa_images/thm-info.jpg');
      case 'thm-medienlabor.jpg':
        return require('../../assets/osa_images/thm-medienlabor.jpg');
      case 'thm-studio.jpg':
        return require('../../assets/osa_images/thm-studio.jpg');
      // Add more cases for other image names
      default:
        return null; // Handle unknown image names
    }
  }
}

export default ImageMapper;
