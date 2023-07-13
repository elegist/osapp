/**
 * Provides manual mapping of relative image paths
 */
class MediaMapper {
  static getOsaImage(mediaName) {
    const path = '../../assets/osa_images/';
    switch (mediaName) {
      case 'thm_haupteingang.jpg':
        return require(path + 'thm_haupteingang.jpg');
      case 'thm_campus.jpg':
        return require(path + 'thm_campus.jpg');
      case 'thm_gebaeude_b.jpg':
        return require(path + 'thm_gebaeude_b.jpg');
      case 'thm_hoersaal.jpg':
        return require(path + 'thm_hoersaal.jpg');
      case 'thm_info.jpg':
        return require(path + 'thm_info.jpg');
      case 'thm_medienlabor.jpg':
        return require(path + 'thm_medienlabor.jpg');
      case 'thm_studio.jpg':
        return require(path + 'thm_studio.jpg');
      case 'thm_mensa.jpg':
        return require(path + 'thm_mensa.jpg');
      case 'thm_bib.jpg':
        return require(path + 'thm_bib.jpg');
      case 'thm_bib2.jpg':
        return require(path + 'thm_bib2.jpg');
      case 'informatik.jpg':
        return require(path + 'informatik.jpg');
      case 'internet.jpg':
        return require(path + 'internet.jpg');
      case 'programming.jpg':
        return require(path + 'programming.jpg');
      case 'av_live.jpg':
        return require(path + 'av_live.jpg');
      case 'av_mixer.jpg':
        return require(path + 'av_mixer.jpg');
      case 'av_production.jpg':
        return require(path + 'av_production.jpg');
      case 'gd_lamp.jpg':
        return require(path + 'gd_lamp.jpg');
        case 'gd_math.jpg':
          return require(path + 'gd_math.jpg');
      // Add more cases for other image names
      default:
        return null; // Handle unknown image names
    }
  }

  static getExampleThumbnail(mediaName) {
    const path = '../../assets/project_examples/thumbnails/';

    switch (mediaName) {
      case 'av2_angels_thumbnail.png':
        return require(path + 'av2_angels_thumbnail.png');
      case 'av2_lazarus_thumbnail.png':
        return require(path + 'av2_lazarus_thumbnail.png');
      case 'fd_dijkstra_thumbnail.png':
        return require(path + 'fd_dijkstra_thumbnail.png');
      case 'fub_regeneration_thumbnail.png':
        return require(path + 'fub_regeneration_thumbnail.png');
      case 'gd1_car_thumbnail.png':
        return require(path + 'gd1_car_thumbnail.png');
      case 'gd2_lamp_thumbnail.png':
        return require(path + 'gd2_lamp_thumbnail.png');
      case 'gd2_ring_thumbnail.png':
        return require(path + 'gd2_ring_thumbnail.png');
      case 'gd3_mimic_thumbnail.png':
        return require(path + 'gd3_mimic_thumbnail.png');
      case 'gd3_rack_thumbnail.png':
        return require(path + 'gd3_rack_thumbnail.png');
      case 'md_iphone_thumbnail.png':
        return require(path + 'md_iphone_thumbnail.png');
      case 'md_squirrel_thumbnail.png':
        return require(path + 'md_squirrel_thumbnail.png');
      case 'mow2_bug_thumbnail.png':
        return require(path + 'mow2_bug_thumbnail.png');
      case 'mpm_reise_thumbnail.png':
        return require(path + 'mpm_reise_thumbnail.png');
      case 'wfr_tasse_thumbnail.png':
        return require(path + 'wfr_tasse_thumbnail.png');

      default:
        return null;
    }
  }

  static getExampleContentImage(mediaName) {
    const path = '../../assets/project_examples/content/imgs/';

    switch (mediaName) {
      case 'fd_dijkstra.png':
        return require(path + 'fd_dijkstra.png');
      case 'fub_regeneration.png':
        return require(path + 'fub_regeneration.png');
      case 'gd1_detail_1.png':
        return require(path + 'gd1_detail_1.png');
      case 'gd1_detail_2.png':
        return require(path + 'gd1_detail_2.png');
      case 'gd1_full.png':
        return require(path + 'gd1_full.png');
      case 'gd1_uv.png':
        return require(path + 'gd1_uv.png');
      case 'gd1_wireframe.png':
        return require(path + 'gd1_wireframe.png');
      case 'gd2_lamp.png':
        return require(path + 'gd2_lamp.png');
      case 'gd2_ring.png':
        return require(path + 'gd2_ring.png');
      case 'mow2_game.png':
        return require(path + 'mow2_game.png');
      case 'mow2_gameover.png':
        return require(path + 'mow2_gameover.png');
      case 'mow2_mainmenu.png':
        return require(path + 'mow2_mainmenu.png');
      case 'mow2_settings.png':
        return require(path + 'mow2_settings.png');
      case 'mpm_reise_1.png':
        return require(path + 'mpm_reise_1.png');
      case 'mpm_reise_2.png':
        return require(path + 'mpm_reise_2.png');
      case 'mpm_reise_3.png':
        return require(path + 'mpm_reise_3.png');
      case 'wfr_1.png':
        return require(path + 'wfr_1.png');
      case 'wfr_2.png':
        return require(path + 'wfr_2.png');
      case 'wfr_3.png':
        return require(path + 'wfr_3.png');
      case 'wfr_4.png':
        return require(path + 'wfr_4.png');
      case 'wfr_5.png':
        return require(path + 'wfr_5.png');

      default:
        return null;
    }
  }

  static getExampleContentVideo(mediaName) {
    const path = '../../assets/project_examples/content/videos/';

    switch (mediaName) {
      case 'av2_angels.mp4':
        return require(path + 'av2_angels.mp4');
      case 'av2_lazarus.mp4':
        return require(path + 'av2_lazarus.mp4');
      case 'fd_algorithm.mp4':
        return require(path + 'fd_algorithm.mp4');
      case 'fd_story.mp4':
        return require(path + 'fd_story.mp4');
      case 'gd3_mimic.mp4':
        return require(path + 'gd3_mimic.mp4');
      case 'gd3_rack.mp4':
        return require(path + 'gd3_rack.mp4');
      case 'md_iphone.mp4':
        return require(path + 'md_iphone.mp4');
      case 'md_squirrel.mp4':
        return require(path + 'md_squirrel.mp4');
      case 'mow2_highlevel.mp4':
        return require(path + 'mow2_highlevel.mp4');
      case 'mow2_start.mp4':
        return require(path + 'mow2_start.mp4');

      default:
        return null;
    }
  }
}

export default MediaMapper;
