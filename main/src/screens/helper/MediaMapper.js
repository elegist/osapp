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
      case 'av2_angels_thumbnail.jpg':
        return require(path + 'av2_angels_thumbnail.jpg');
      case 'av2_lazarus_thumbnail.jpg':
        return require(path + 'av2_lazarus_thumbnail.jpg');
      case 'fd_dijkstra_thumbnail.png':
        return require(path + 'fd_dijkstra_thumbnail.png');
      case 'fub_regeneration_thumbnail.jpg':
        return require(path + 'fub_regeneration_thumbnail.jpg');
      case 'gd1_car_thumbnail.jpg':
        return require(path + 'gd1_car_thumbnail.jpg');
      case 'gd2_lamp_thumbnail.jpg':
        return require(path + 'gd2_lamp_thumbnail.jpg');
      case 'gd2_ring_thumbnail.jpg':
        return require(path + 'gd2_ring_thumbnail.jpg');
      case 'gd3_mimic_thumbnail.jpg':
        return require(path + 'gd3_mimic_thumbnail.jpg');
      case 'gd3_rack_thumbnail.jpg':
        return require(path + 'gd3_rack_thumbnail.jpg');
      case 'md_iphone_thumbnail.jpg':
        return require(path + 'md_iphone_thumbnail.jpg');
      case 'md_squirrel_thumbnail.jpg':
        return require(path + 'md_squirrel_thumbnail.jpg');
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
      case 'fd_dijkstra.jpg':
        return require(path + 'fd_dijkstra.jpg');
      case 'fub_regeneration.jpg':
        return require(path + 'fub_regeneration.jpg');
      case 'gd1_detail_1.jpg':
        return require(path + 'gd1_detail_1.jpg');
      case 'gd1_detail_2.jpg':
        return require(path + 'gd1_detail_2.jpg');
      case 'gd1_full.jpg':
        return require(path + 'gd1_full.jpg');
      case 'gd1_uv.jpg':
        return require(path + 'gd1_uv.jpg');
      case 'gd1_wireframe.jpg':
        return require(path + 'gd1_wireframe.jpg');
      case 'gd2_lamp.jpg':
        return require(path + 'gd2_lamp.jpg');
      case 'gd2_ring.jpg':
        return require(path + 'gd2_ring.jpg');
      case 'mow2_game.jpg':
        return require(path + 'mow2_game.jpg');
      case 'mow2_gameover.jpg':
        return require(path + 'mow2_gameover.jpg');
      case 'mow2_mainmenu.jpg':
        return require(path + 'mow2_mainmenu.jpg');
      case 'mow2_settings.jpg':
        return require(path + 'mow2_settings.jpg');
      case 'mpm_reise_1.jpg':
        return require(path + 'mpm_reise_1.jpg');
      case 'mpm_reise_2.jpg':
        return require(path + 'mpm_reise_2.jpg');
      case 'mpm_reise_3.jpg':
        return require(path + 'mpm_reise_3.jpg');
      case 'wfr_1.jpg':
        return require(path + 'wfr_1.jpg');
      case 'wfr_2.jpg':
        return require(path + 'wfr_2.jpg');
      case 'wfr_3.jpg':
        return require(path + 'wfr_3.jpg');
      case 'wfr_4.jpg':
        return require(path + 'wfr_4.jpg');
      case 'wfr_5.jpg':
        return require(path + 'wfr_5.jpg');

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
