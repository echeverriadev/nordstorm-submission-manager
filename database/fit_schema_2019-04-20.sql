# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.5.51)
# Database: test5
# Generation Time: 2019-04-18 23:39:07 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table campaign
# ------------------------------------------------------------

DROP TABLE IF EXISTS `campaign`;

CREATE TABLE `campaign` (
  `__pk_campaign` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `_fk_factsheet` int(11) unsigned DEFAULT NULL,
  `campaign_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `business_contact` varchar(255) DEFAULT NULL,
  `feature_date` date DEFAULT NULL,
  `feature_week` smallint(1) DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `created_timestamp` datetime DEFAULT NULL,
  `update_timestamp` datetime DEFAULT NULL,
  `project_description` varchar(256) DEFAULT NULL,
  `funds_committed` decimal(10,2) DEFAULT NULL,
  `account_num` varchar(256) DEFAULT NULL,
  `cost_center` varchar(256) DEFAULT NULL,
  `biz_unit` varchar(256) DEFAULT NULL,
  `store` varchar(256) DEFAULT NULL,
  `_fk_turn_in` int(11) unsigned DEFAULT NULL,
  `is_default_turn_in` tinyint(1) unsigned DEFAULT '1',
  `_fk_creative_story` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`__pk_campaign`),
  KEY `factsheet_fk` (`_fk_factsheet`),
  KEY `campaign_cc` (`_fk_creative_story`),
  CONSTRAINT `factsheet_fk` FOREIGN KEY (`_fk_factsheet`) REFERENCES `factsheet` (`__pk_factsheet`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table campaign_division
# ------------------------------------------------------------

DROP TABLE IF EXISTS `campaign_division`;

CREATE TABLE `campaign_division` (
  `__pk_campaign_division` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `_fk_cycle_t` varchar(255) DEFAULT NULL,
  `_fk_campaign` int(11) unsigned DEFAULT NULL,
  `_fk_division_t` varchar(255) DEFAULT NULL,
  `_fk_tier` int(11) unsigned DEFAULT NULL,
  `_fk_cycle` int(11) unsigned DEFAULT NULL,
  `created_timestamp` datetime DEFAULT NULL,
  `update_timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`__pk_campaign_division`),
  KEY `campaign_fk` (`_fk_campaign`),
  CONSTRAINT `campaign` FOREIGN KEY (`_fk_campaign`) REFERENCES `campaign` (`__pk_campaign`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table campaign_division_temp
# ------------------------------------------------------------

DROP TABLE IF EXISTS `campaign_division_temp`;

CREATE TABLE `campaign_division_temp` (
  `__pk_campaign_division` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `created_timestamp` datetime DEFAULT NULL,
  `update_timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`__pk_campaign_division`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table ci_sessions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ci_sessions`;

CREATE TABLE `ci_sessions` (
  `session_id` varchar(40) NOT NULL DEFAULT '0',
  `ip_address` varchar(45) NOT NULL DEFAULT '0',
  `user_agent` varchar(120) NOT NULL,
  `last_activity` int(10) unsigned NOT NULL DEFAULT '0',
  `user_data` mediumtext NOT NULL,
  PRIMARY KEY (`session_id`),
  KEY `last_activity_idx` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table creative_story
# ------------------------------------------------------------

DROP TABLE IF EXISTS `creative_story`;

CREATE TABLE `creative_story` (
  `__pk_creative_story` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`__pk_creative_story`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table creative_story_list
# ------------------------------------------------------------

DROP TABLE IF EXISTS `creative_story_list`;

CREATE TABLE `creative_story_list` (
  `__pk_creative_story_list` int(32) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  `filter_options` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`__pk_creative_story_list`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table creative_story_list_story
# ------------------------------------------------------------

DROP TABLE IF EXISTS `creative_story_list_story`;

CREATE TABLE `creative_story_list_story` (
  `__pk_creative_story_list_story` int(32) unsigned NOT NULL AUTO_INCREMENT,
  `_fk_creative_story_list` int(32) unsigned NOT NULL,
  `_fk_creative_story` int(32) unsigned NOT NULL,
  `id_user` bigint(20) unsigned NOT NULL,
  `sort_order` int(32) unsigned NOT NULL,
  `style` varchar(256) NOT NULL,
  PRIMARY KEY (`__pk_creative_story_list_story`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table cycle
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cycle`;

CREATE TABLE `cycle` (
  `__pk_cycle` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  `turn_in_date` date DEFAULT NULL,
  `factsheet_type` varchar(256) DEFAULT NULL,
  `project_manager` varchar(256) DEFAULT NULL,
  `copy_writer` varchar(256) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '0',
  `cycle_year` smallint(4) DEFAULT NULL,
  `cycle_month` smallint(2) DEFAULT NULL,
  `created_timestamp` datetime DEFAULT NULL,
  `update_timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`__pk_cycle`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table cycle_creative_story
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cycle_creative_story`;

CREATE TABLE `cycle_creative_story` (
  `__pk_cycle_creative_story` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `_fk_cycle` int(10) unsigned DEFAULT NULL,
  `_fk_creative_story` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`__pk_cycle_creative_story`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table cycle_tier
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cycle_tier`;

CREATE TABLE `cycle_tier` (
  `__pk_cycle_tier` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `_fk_cycle` int(10) unsigned DEFAULT NULL,
  `_fk_tier` int(10) unsigned DEFAULT NULL,
  `turn_in_date` date DEFAULT NULL,
  `created_timestamp` datetime DEFAULT NULL,
  `update_timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`__pk_cycle_tier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table department
# ------------------------------------------------------------

DROP TABLE IF EXISTS `department`;

CREATE TABLE `department` (
  `active_fs` tinyint(1) DEFAULT NULL COMMENT 'since we have multiple apps, we have to ''activate'' each div for each department''',
  `active_vft` tinyint(1) DEFAULT NULL COMMENT 'VFT: Active',
  `department_number` varchar(256) DEFAULT NULL COMMENT 'VFT: kp_Department',
  `id` varchar(256) DEFAULT NULL COMMENT 'VFT: kp_Department. Prev name: __pk_department_t',
  `id_division` varchar(256) DEFAULT NULL COMMENT 'VFT: kf_DivisionID. Prev Name:_fk_division_t',
  `id_division_sub` varchar(256) DEFAULT NULL COMMENT 'VFT: kf_SubdivisionID',
  `name` varchar(256) DEFAULT NULL COMMENT 'VFT: Name. Prev name: Name',
  `name_display` varchar(256) DEFAULT NULL COMMENT 'if empty, use ''name'' column',
  `source` varchar(256) DEFAULT NULL COMMENT 'value = ''vft'' or ''local''',
  `source_vft` varchar(256) DEFAULT NULL COMMENT 'FMVFTP: Source',
  `tag_color` varchar(256) DEFAULT NULL COMMENT 'html color name, such as ''yellow'' or ''green''. Prev Name: tag_color',
  `__pk_department_t` varchar(256) DEFAULT NULL COMMENT 'added pk_department to populate manually',
  `is_fs_taggable` tinyint(1) DEFAULT NULL COMMENT 'Prev Name: isFSTaggable',
  `_fk_division_t` varchar(256) DEFAULT NULL,
  `department_identifier` varchar(256) DEFAULT NULL,
  `division_identifier` varchar(256) DEFAULT NULL,
  `created_timestamp` datetime DEFAULT NULL,
  `update_timestamp` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table division
# ------------------------------------------------------------

DROP TABLE IF EXISTS `division`;

CREATE TABLE `division` (
  `active_fs` tinyint(1) DEFAULT NULL COMMENT 'since we have multiple apps, we have to ''activate'' each div for each department''. Prev Name: Inactive, EFS_Only',
  `active_vft` tinyint(1) DEFAULT NULL COMMENT 'VFT: Active',
  `division_number` varchar(256) DEFAULT NULL COMMENT 'VFT: kp_DivisionID',
  `id` varchar(256) DEFAULT NULL COMMENT 'VFT: kp_DivisionID. Prev name:__pk_division_t',
  `name` varchar(256) DEFAULT NULL COMMENT 'VFT: Name. Prev name: NAme',
  `name_display` varchar(256) DEFAULT NULL COMMENT 'if empty, use ''name'' column',
  `source` varchar(256) DEFAULT NULL COMMENT 'value = ''vft'' or ''local''',
  `source_vft` varchar(256) DEFAULT NULL COMMENT 'VFT: Source',
  `user_managed_fs` tinyint(1) DEFAULT NULL COMMENT 'VFT: Active',
  `__pk_division_t` varchar(256) DEFAULT NULL COMMENT 'added pk_division to populate manually',
  `sort_order` smallint(2) DEFAULT NULL,
  `created_timestamp` datetime DEFAULT NULL,
  `update_timestamp` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table factsheet
# ------------------------------------------------------------

DROP TABLE IF EXISTS `factsheet`;

CREATE TABLE `factsheet` (
  `__pk_factsheet` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `_fk_division_t` varchar(255) DEFAULT NULL,
  `_fk_cycle_t` varchar(255) DEFAULT NULL,
  `_fk_tier` int(11) unsigned DEFAULT NULL,
  `is_locked` tinyint(4) DEFAULT NULL,
  `is_auto_locked` tinyint(4) DEFAULT NULL,
  `created_timestamp` datetime DEFAULT NULL,
  `update_timestamp` datetime DEFAULT NULL,
  `lock_sm_user_updated` tinyint(4) DEFAULT '0',
  `lock_pc_user_updated` tinyint(4) DEFAULT '0',
  `_fk_cycle` int(11) DEFAULT NULL,
  `_fk_turn_in` int(11) unsigned DEFAULT NULL,
  `is_default_turn_in` tinyint(1) unsigned DEFAULT '1',
  PRIMARY KEY (`__pk_factsheet`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table fs_migrations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `fs_migrations`;

CREATE TABLE `fs_migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `filename` varchar(240) NOT NULL,
  `date_executed` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table import_mapping
# ------------------------------------------------------------

DROP TABLE IF EXISTS `import_mapping`;

CREATE TABLE `import_mapping` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_import_template` int(11) unsigned NOT NULL,
  `db_column` varchar(255) DEFAULT NULL,
  `excel_column` varchar(255) DEFAULT NULL,
  `created_timestamp` datetime DEFAULT NULL,
  `update_timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `import_template` (`id_import_template`),
  CONSTRAINT `import_template` FOREIGN KEY (`id_import_template`) REFERENCES `import_template` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table import_template
# ------------------------------------------------------------

DROP TABLE IF EXISTS `import_template`;

CREATE TABLE `import_template` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `target_table` varchar(255) DEFAULT NULL,
  `header_row_number` int(11) unsigned DEFAULT '0',
  `name` varchar(255) DEFAULT NULL,
  `created_timestamp` datetime DEFAULT NULL,
  `update_timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table item
# ------------------------------------------------------------

DROP TABLE IF EXISTS `item`;

CREATE TABLE `item` (
  `__pk_item_t` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `_fk_catalog_division_t` varchar(255) DEFAULT NULL,
  `_fk_catalog_t` varchar(255) DEFAULT NULL,
  `_fk_country_of_origin_t` varchar(255) DEFAULT NULL,
  `_fk_department_t` varchar(255) DEFAULT NULL,
  `_fk_division_share_t` varchar(255) DEFAULT NULL,
  `_fk_division_t` varchar(255) DEFAULT NULL,
  `_fk_look_t` varchar(255) DEFAULT NULL,
  `_fk_page_t` varchar(255) DEFAULT NULL,
  `_ka_replicas_t` varchar(512) DEFAULT NULL,
  `_rec_created_account` varchar(255) DEFAULT NULL,
  `_rec_created_timestamp` datetime DEFAULT NULL,
  `page_label` varchar(255) DEFAULT NULL,
  `_rec_id` int(11) DEFAULT NULL,
  `_rec_mod_count` int(11) DEFAULT NULL,
  `_rec_modified_account` varchar(255) DEFAULT NULL,
  `_rec_modified_date` date DEFAULT NULL,
  `_rec_modified_timestamp` datetime DEFAULT NULL,
  `acc_account` varchar(255) DEFAULT NULL,
  `acc_business_unit` varchar(255) DEFAULT NULL,
  `acc_cost_center` varchar(255) DEFAULT NULL,
  `acc_store` varchar(255) DEFAULT NULL,
  `availability` varchar(255) DEFAULT '',
  `available_in_canada` int(11) DEFAULT NULL,
  `coop_money_committed` varchar(255) DEFAULT '',
  `cost_actual` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT '',
  `cost_retail` varchar(512) DEFAULT NULL,
  `country_of_origin` varchar(255) DEFAULT NULL,
  `customer_segment` varchar(255) DEFAULT NULL,
  `date_turn_in` date DEFAULT NULL,
  `fabric_content` varchar(512) DEFAULT NULL,
  `featured_colors` varchar(255) DEFAULT NULL,
  `hero_colors` varchar(255) DEFAULT NULL,
  `image_request` mediumtext,
  `is_complete` int(11) DEFAULT NULL,
  `is_incomplete` int(11) DEFAULT NULL,
  `list_view_tags` varchar(255) DEFAULT NULL,
  `look` int(11) DEFAULT NULL,
  `description` varchar(512) DEFAULT NULL,
  `other_colors` mediumtext,
  `page` int(11) DEFAULT NULL,
  `page_space_allocation` varchar(255) DEFAULT NULL,
  `photo_code` varchar(255) DEFAULT NULL,
  `project_code` varchar(255) DEFAULT NULL,
  `sale_price` varchar(255) DEFAULT NULL,
  `sample_size_turn_in` varchar(255) DEFAULT NULL,
  `selling_benefits` mediumtext,
  `size_range` varchar(255) DEFAULT NULL,
  `sort_order` decimal(16,6) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `style_group_number` varchar(255) DEFAULT NULL,
  `styling_request` mediumtext,
  `type` varchar(255) DEFAULT NULL,
  `vendor_name` varchar(255) DEFAULT NULL,
  `vendor_suggested_copy` mediumtext,
  `vpn` varchar(2048) DEFAULT NULL,
  PRIMARY KEY (`__pk_item_t`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table item_editorial
# ------------------------------------------------------------

DROP TABLE IF EXISTS `item_editorial`;

CREATE TABLE `item_editorial` (
  `__pk_item` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `_fk_shot` int(11) unsigned DEFAULT NULL,
  `_fk_department_t` varchar(255) DEFAULT NULL,
  `_fk_division_share_t` varchar(255) DEFAULT NULL,
  `_fk_cycle` int(11) DEFAULT NULL,
  `_fk_division` varchar(255) DEFAULT NULL,
  `type` varchar(32) DEFAULT 'featured',
  `brand` varchar(255) DEFAULT NULL,
  `mc_cat_current_location` text,
  `mc_cat_last_scan_date` text,
  `color_code` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `created_timestamp` datetime DEFAULT NULL,
  `department_number` varchar(255) DEFAULT NULL,
  `description` text,
  `is_canceled` tinyint(4) DEFAULT '0',
  `is_canceled_final` tinyint(4) DEFAULT '0',
  `is_complete` tinyint(4) DEFAULT NULL,
  `live_date` date DEFAULT NULL,
  `mc_sample_status_notes` text,
  `modified_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `size` varchar(255) DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `styling_notes` text,
  `style_group_number` varchar(255) DEFAULT NULL,
  `pc_sample_status` varchar(255) DEFAULT NULL,
  `pc_notes` text,
  `pc_contact` varchar(255) DEFAULT NULL,
  `pof_type` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `vpn` varchar(255) DEFAULT NULL,
  `has_image` int(11) NOT NULL DEFAULT '0',
  `image` varchar(255) DEFAULT NULL,
  `id` int(11) DEFAULT NULL,
  `featured_color` varchar(255) DEFAULT NULL,
  `hero_color` varchar(255) DEFAULT NULL,
  `live_date_for_samples` date DEFAULT NULL,
  `retail_price` decimal(10,2) DEFAULT NULL,
  `page_space_allocation` varchar(255) DEFAULT NULL,
  `customer_segment` varchar(255) DEFAULT NULL,
  `other_colors` varchar(255) DEFAULT NULL,
  `size_range` varchar(255) DEFAULT NULL,
  `fabric_content` varchar(255) DEFAULT NULL,
  `country_of_origin` varchar(255) DEFAULT NULL,
  `country_of_origin_other` varchar(255) DEFAULT NULL,
  `availability` varchar(255) DEFAULT NULL,
  `sale_price` decimal(10,2) DEFAULT NULL,
  `available_in_canada` tinyint(2) DEFAULT NULL,
  `project_code` varchar(255) DEFAULT NULL,
  `coop_committed` decimal(10,2) DEFAULT NULL,
  `selling_benefits` mediumtext,
  `vendor_suggested_copy` mediumtext,
  `acc_account` varchar(255) DEFAULT NULL,
  `acc_business_unit` varchar(255) DEFAULT NULL,
  `acc_cost_center` varchar(255) DEFAULT NULL,
  `acc_store` varchar(255) DEFAULT NULL,
  `store_id` int(11) DEFAULT NULL,
  `is_available_other_colors` tinyint(1) DEFAULT '0',
  `canadian_vpn` varchar(255) DEFAULT NULL,
  `price_cad` decimal(10,2) DEFAULT NULL,
  `sampleAtPhotoStudio` tinyint(1) DEFAULT NULL,
  `is_priority` tinyint(1) DEFAULT '0',
  `nmg_priority` int(11) DEFAULT NULL,
  `product_type_2` varchar(255) DEFAULT NULL,
  `product_type_2_id` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `age` varchar(255) DEFAULT NULL,
  `brand_id` varchar(255) DEFAULT NULL,
  `_fk_item_parent` int(11) DEFAULT NULL,
  `dts_date` date DEFAULT NULL,
  `book` tinyint(1) DEFAULT '0',
  `in_stock_week` smallint(1) DEFAULT '0',
  `mdad_pushed` tinyint(1) DEFAULT '0',
  `mdad_id` int(11) DEFAULT '0',
  `image_ops_notes` text,
  `request_extension` tinyint(1) DEFAULT '0',
  `request_extension_note` tinytext,
  `extension_approval` tinyint(1) DEFAULT NULL,
  `extension_approval_note` tinytext,
  `fashion_office_priority` tinyint(4) DEFAULT '0',
  `item_parent` int(11) DEFAULT NULL,
  `request_cancellation` tinyint(4) DEFAULT NULL,
  `request_cancellation_notes` varchar(255) NOT NULL DEFAULT '',
  `cancellation_approval` tinyint(4) DEFAULT NULL,
  `request_dts` tinyint(4) DEFAULT NULL,
  `request_dts_notes` varchar(255) NOT NULL DEFAULT '',
  `dts_approval` tinyint(4) DEFAULT NULL,
  `dts_approval_notes` varchar(255) NOT NULL DEFAULT '',
  `request_rtv` tinyint(4) DEFAULT NULL,
  `request_rtv_notes` varchar(255) NOT NULL DEFAULT '',
  `request_rtv_date` date DEFAULT NULL,
  `rtv_approval` tinyint(4) DEFAULT NULL,
  `rtv_approval_notes` varchar(255) NOT NULL DEFAULT '',
  `tagged_encore` tinyint(1) DEFAULT NULL,
  `tagged_extended` tinyint(1) DEFAULT NULL,
  `tagged_missy` tinyint(1) DEFAULT NULL,
  `tagged_petite` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`__pk_item`),
  KEY `shot_fk` (`_fk_shot`),
  KEY `item_parent` (`item_parent`),
  CONSTRAINT `shot_fk` FOREIGN KEY (`_fk_shot`) REFERENCES `shot` (`__pk_shot`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table item_editorial_join_stores
# ------------------------------------------------------------

DROP TABLE IF EXISTS `item_editorial_join_stores`;

CREATE TABLE `item_editorial_join_stores` (
  `__pk_item` int(11) unsigned NOT NULL,
  `__pk_store` int(11) unsigned NOT NULL,
  `updated_timestamp` datetime DEFAULT NULL,
  `created_timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`__pk_item`,`__pk_store`),
  KEY `FK__stores` (`__pk_store`),
  CONSTRAINT `FK__item_editorial` FOREIGN KEY (`__pk_item`) REFERENCES `item_editorial` (`__pk_item`) ON DELETE CASCADE,
  CONSTRAINT `FK__stores` FOREIGN KEY (`__pk_store`) REFERENCES `stores` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table item_notifications
# ------------------------------------------------------------

DROP TABLE IF EXISTS `item_notifications`;

CREATE TABLE `item_notifications` (
  `__pk_item_notification` bigint(32) NOT NULL AUTO_INCREMENT,
  `_fk_user_requestor` bigint(32) DEFAULT NULL,
  `_fk_item` int(11) DEFAULT NULL,
  `email_requestor` varchar(256) DEFAULT NULL,
  `style_group_number` varchar(255) DEFAULT NULL,
  `cycle_name` varchar(145) DEFAULT NULL,
  `division_name` varchar(145) DEFAULT NULL,
  `story_name` varchar(145) DEFAULT NULL,
  `shot_name` varchar(145) DEFAULT NULL,
  `pc_note` tinytext,
  `real_time_sent` tinyint(1) DEFAULT '0',
  `digest_sent` tinyint(1) DEFAULT '0',
  `email_approver` varchar(255) NOT NULL,
  `date_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `request_type` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`__pk_item_notification`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table job
# ------------------------------------------------------------

DROP TABLE IF EXISTS `job`;

CREATE TABLE `job` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `complete` tinyint(4) DEFAULT '0',
  `data` mediumtext,
  `interface` varchar(32) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `metadata` text,
  `created_timestamp` datetime DEFAULT NULL,
  `modtimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `process_id` varchar(255) DEFAULT '0',
  `type` varchar(32) DEFAULT NULL,
  `output_type` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `process_id` (`process_id`),
  KEY `complete` (`complete`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table log
# ------------------------------------------------------------

DROP TABLE IF EXISTS `log`;

CREATE TABLE `log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `_fk_item_editorial` int(11) DEFAULT NULL,
  `lan_id` varchar(32) DEFAULT NULL,
  `time_stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `event` varchar(255) DEFAULT NULL,
  `details` text,
  `user_name` varchar(255) DEFAULT NULL,
  `_fk_factsheet` int(11) DEFAULT NULL,
  `_fk_campaign` int(11) DEFAULT NULL,
  `_fk_shot` int(11) DEFAULT NULL,
  `story_name` varchar(45) DEFAULT NULL,
  `shot_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table meta
# ------------------------------------------------------------

DROP TABLE IF EXISTS `meta`;

CREATE TABLE `meta` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table meta_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `meta_user`;

CREATE TABLE `meta_user` (
  `lan_id` varchar(32) NOT NULL,
  `meta_id` smallint(6) NOT NULL,
  `value` longtext,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `lan_meta_id` (`lan_id`,`meta_id`),
  KEY `meta_id_idx` (`meta_id`),
  CONSTRAINT `meta_id` FOREIGN KEY (`meta_id`) REFERENCES `meta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table notification
# ------------------------------------------------------------

DROP TABLE IF EXISTS `notification`;

CREATE TABLE `notification` (
  `__pk_notification` bigint(32) unsigned NOT NULL AUTO_INCREMENT,
  `_fk_user_creator` bigint(32) DEFAULT NULL,
  `creator_lanid` varchar(256) DEFAULT NULL,
  `body` text,
  `date_created` datetime DEFAULT NULL,
  `date_modified` datetime DEFAULT NULL,
  `subject` text,
  `recipients` varchar(256) DEFAULT NULL,
  `send_method` varchar(256) DEFAULT NULL,
  `status` varchar(256) DEFAULT NULL,
  `send_date_time` datetime DEFAULT NULL,
  `expiration` smallint(2) DEFAULT '0',
  PRIMARY KEY (`__pk_notification`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table option
# ------------------------------------------------------------

DROP TABLE IF EXISTS `option`;

CREATE TABLE `option` (
  `__pk_option` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `input_name` varchar(32) DEFAULT NULL,
  `display` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `help_text` varchar(255) DEFAULT NULL,
  `sort_order` smallint(4) DEFAULT NULL,
  `output_type` varchar(32) DEFAULT NULL,
  `exclude_canceled` smallint(4) DEFAULT NULL,
  `created_timestamp` datetime DEFAULT NULL,
  `update_timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`__pk_option`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table page
# ------------------------------------------------------------

DROP TABLE IF EXISTS `page`;

CREATE TABLE `page` (
  `__pk_page_t` varchar(255) NOT NULL DEFAULT '',
  `label` varchar(1024) DEFAULT NULL,
  `_fk_catdiv_t` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`__pk_page_t`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table patch_timestamp
# ------------------------------------------------------------

DROP TABLE IF EXISTS `patch_timestamp`;

CREATE TABLE `patch_timestamp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `update_shot_timestamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table phinxlog
# ------------------------------------------------------------

DROP TABLE IF EXISTS `phinxlog`;

CREATE TABLE `phinxlog` (
  `version` bigint(20) NOT NULL,
  `migration_name` varchar(100) DEFAULT NULL,
  `start_time` timestamp NULL DEFAULT NULL,
  `end_time` timestamp NULL DEFAULT NULL,
  `breakpoint` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table photocode_update
# ------------------------------------------------------------

DROP TABLE IF EXISTS `photocode_update`;

CREATE TABLE `photocode_update` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `photocode` varchar(256) DEFAULT NULL,
  `cycle` bigint(20) DEFAULT NULL,
  `mdad_pushed` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table photocode_update_item
# ------------------------------------------------------------

DROP TABLE IF EXISTS `photocode_update_item`;

CREATE TABLE `photocode_update_item` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_photocode_update` bigint(20) unsigned NOT NULL,
  `sgn` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table shoot_staff
# ------------------------------------------------------------

DROP TABLE IF EXISTS `shoot_staff`;

CREATE TABLE `shoot_staff` (
  `__pk_shoot_staff` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `_fk_shot` int(11) DEFAULT NULL,
  `source_id` varchar(256) DEFAULT NULL COMMENT 'UUID from photon',
  `lan_id` varchar(256) DEFAULT NULL,
  `name_first` varchar(256) DEFAULT NULL,
  `name_last` varchar(256) DEFAULT NULL,
  `primary` tinyint(1) DEFAULT NULL,
  `role` varchar(256) DEFAULT NULL COMMENT 'art_director model producer',
  PRIMARY KEY (`__pk_shoot_staff`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table shot
# ------------------------------------------------------------

DROP TABLE IF EXISTS `shot`;

CREATE TABLE `shot` (
  `__pk_shot` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `_fk_campaign` int(11) unsigned DEFAULT NULL,
  `placement` varchar(255) DEFAULT NULL,
  `num_multi_shots` varchar(32) DEFAULT NULL,
  `created_timestamp` datetime DEFAULT NULL,
  `update_timestamp` datetime DEFAULT NULL,
  `has_image` tinyint(4) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_pickup` tinyint(4) DEFAULT NULL,
  `shot_id` int(11) DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `styling_notes` text,
  `type` varchar(255) DEFAULT NULL,
  `feature_week` smallint(1) DEFAULT NULL,
  `customer_segment` varchar(256) DEFAULT NULL,
  `occasion` varchar(256) DEFAULT NULL,
  `photo_code` varchar(256) DEFAULT NULL,
  `project_description` varchar(256) DEFAULT NULL,
  `funds_committed` decimal(10,2) DEFAULT NULL,
  `account_num` varchar(256) DEFAULT NULL,
  `cost_center` varchar(256) DEFAULT NULL,
  `biz_unit` varchar(256) DEFAULT '200',
  `store` varchar(256) DEFAULT '0100',
  `vendor_branded` tinyint(4) DEFAULT '0',
  `_fk_shoot_location` int(11) DEFAULT NULL,
  `photographer` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `project_number` varchar(255) DEFAULT NULL,
  `amp_guid` varchar(255) DEFAULT NULL,
  `id_sam_project` bigint(20) DEFAULT NULL COMMENT 'Specifies sam project id.',
  `_fk_shot_parent` int(11) DEFAULT NULL,
  `is_shot_parent` smallint(1) DEFAULT NULL,
  `shoot_id` varchar(256) DEFAULT NULL COMMENT 'UUID from the photon system',
  `shoot_location` varchar(256) DEFAULT NULL COMMENT 'from photon system',
  `shoot_location_sub` varchar(256) DEFAULT NULL COMMENT 'from photon system',
  `shoot_location_type` varchar(256) DEFAULT NULL COMMENT 'location, studion, etc.',
  `shoot_name` varchar(256) DEFAULT NULL COMMENT 'from photon system',
  `shoot_number` varchar(256) DEFAULT NULL COMMENT 'from photon system',
  `shoot_usage` text COMMENT 'from photon system',
  `shoot_usage_id` varchar(256) DEFAULT NULL COMMENT 'UUID from photon system',
  `book` tinyint(1) DEFAULT '0',
  `mdad_pushed` tinyint(1) DEFAULT '0',
  `mdad_id` int(11) DEFAULT '0',
  PRIMARY KEY (`__pk_shot`),
  KEY `campaign_fk` (`_fk_campaign`),
  CONSTRAINT `campaign_fk` FOREIGN KEY (`_fk_campaign`) REFERENCES `campaign` (`__pk_campaign`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table shot_subdivisions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `shot_subdivisions`;

CREATE TABLE `shot_subdivisions` (
  `__pk_sub_division` int(11) NOT NULL AUTO_INCREMENT,
  `_fk_shot` int(11) DEFAULT NULL,
  `sub_division_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`__pk_sub_division`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table stores
# ------------------------------------------------------------

DROP TABLE IF EXISTS `stores`;

CREATE TABLE `stores` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `store_number` varchar(255) DEFAULT NULL,
  `geo` varchar(32) DEFAULT NULL,
  `created_timestamp` datetime DEFAULT NULL,
  `update_timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table subdivisions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `subdivisions`;

CREATE TABLE `subdivisions` (
  `__pk_subdivision` int(11) NOT NULL AUTO_INCREMENT,
  `kf_DivisionID` int(11) NOT NULL,
  `kp_SubDivisionID` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `active` smallint(2) DEFAULT '1',
  PRIMARY KEY (`__pk_subdivision`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table tag
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tag`;

CREATE TABLE `tag` (
  `__pk_tag_t` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `_fk_department_t` varchar(255) DEFAULT NULL,
  `_fk_item_t` varchar(255) DEFAULT NULL,
  `_rec_created_account` varchar(255) DEFAULT NULL,
  `_rec_created_timestamp` datetime DEFAULT NULL,
  `_rec_id` int(11) DEFAULT NULL,
  `_rec_mod_count` int(11) DEFAULT NULL,
  `_rec_modified_account` varchar(255) DEFAULT NULL,
  `_rec_modified_date` varchar(255) DEFAULT NULL,
  `_rec_modified_timestamp` datetime DEFAULT NULL,
  `cost_retail` varchar(255) DEFAULT NULL,
  `html_color` varchar(255) DEFAULT NULL,
  `is_incomplete` int(11) DEFAULT NULL,
  `other_colors` varchar(255) DEFAULT NULL,
  `size_range` varchar(255) DEFAULT NULL,
  `style_group_number` varchar(255) DEFAULT NULL,
  `vpn` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`__pk_tag_t`),
  UNIQUE KEY `_fk_department_t` (`_fk_department_t`,`_fk_item_t`),
  KEY `_fk_item_t` (`_fk_item_t`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table tag_editorial
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tag_editorial`;

CREATE TABLE `tag_editorial` (
  `__pk_tag` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `_fk_department` varchar(255) DEFAULT NULL,
  `_fk_item` varchar(255) DEFAULT NULL,
  `_rec_created_account` varchar(255) DEFAULT NULL,
  `_rec_created_timestamp` datetime DEFAULT NULL,
  `_rec_id` int(11) DEFAULT NULL,
  `_rec_mod_count` int(11) DEFAULT NULL,
  `_rec_modified_account` varchar(255) DEFAULT NULL,
  `_rec_modified_date` varchar(255) DEFAULT NULL,
  `_rec_modified_timestamp` datetime DEFAULT NULL,
  `cost_retail` varchar(255) DEFAULT NULL,
  `html_color` varchar(255) DEFAULT NULL,
  `is_incomplete` int(11) DEFAULT NULL,
  `other_colors` varchar(255) DEFAULT NULL,
  `size_range` varchar(255) DEFAULT NULL,
  `style_group_number` varchar(255) DEFAULT NULL,
  `vpn` varchar(255) DEFAULT NULL,
  `is_available_other_colors` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`__pk_tag`),
  UNIQUE KEY `_fk_department` (`_fk_department`,`_fk_item`),
  KEY `_fk_item` (`_fk_item`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table theSQL
# ------------------------------------------------------------

DROP TABLE IF EXISTS `theSQL`;

CREATE TABLE `theSQL` (
  `cycle name` varchar(256) DEFAULT NULL,
  `_fk_cycle` int(11) DEFAULT NULL,
  `_fk_tier` int(11) unsigned DEFAULT NULL,
  `_fk_division_t` varchar(255) DEFAULT NULL,
  `__pk_factsheet` int(11) unsigned NOT NULL DEFAULT '0',
  `tier` int(11) unsigned DEFAULT NULL,
  `SQL` varchar(68) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table tier
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tier`;

CREATE TABLE `tier` (
  `__pk_tier` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `sort_order` int(11) DEFAULT NULL,
  `name` varchar(256) DEFAULT NULL,
  `created_timestamp` datetime DEFAULT NULL,
  `update_timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`__pk_tier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table turn_in
# ------------------------------------------------------------

DROP TABLE IF EXISTS `turn_in`;

CREATE TABLE `turn_in` (
  `__pk_turn_in` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `_fk_cycle_tier` int(11) unsigned DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `turn_in_date` date DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `mode` tinyint(1) DEFAULT '0',
  `soft_lock` tinyint(1) DEFAULT '0',
  `lock_sm_timestamp` datetime DEFAULT NULL,
  `lock_pc_timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`__pk_turn_in`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table turnin_division
# ------------------------------------------------------------

DROP TABLE IF EXISTS `turnin_division`;

CREATE TABLE `turnin_division` (
  `__pk_turnin_division` int(11) NOT NULL AUTO_INCREMENT,
  `_fk_turn_in` int(11) DEFAULT NULL,
  `_fk_division_id` varchar(45) DEFAULT NULL,
  `soft_lock` tinyint(4) DEFAULT '0',
  `_fk_division_t` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`__pk_turnin_division`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` bigint(32) unsigned NOT NULL AUTO_INCREMENT,
  `_fk_department_catalog_t` varchar(256) DEFAULT NULL,
  `_fk_department_t` varchar(256) DEFAULT NULL,
  `_fk_division_catalog_t` varchar(256) DEFAULT NULL,
  `_fk_division_t` varchar(256) DEFAULT NULL,
  `email` varchar(256) DEFAULT NULL,
  `fs_catalog_profile_complete` tinyint(1) DEFAULT NULL,
  `fs_catalog_role` varchar(256) DEFAULT NULL,
  `fs_cycle_menu_type` varchar(256) DEFAULT NULL,
  `fs_profile_complete` tinyint(1) DEFAULT NULL,
  `fs_role` varchar(256) DEFAULT NULL,
  `lan_id` varchar(256) DEFAULT NULL,
  `name_first` varchar(256) DEFAULT NULL,
  `name_last` varchar(256) DEFAULT NULL,
  `phone_direct` varchar(256) DEFAULT NULL,
  `phone_extension` varchar(256) DEFAULT NULL,
  `is_active_fs_user` tinyint(1) DEFAULT NULL,
  `is_fs_admin` tinyint(1) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `created_timestamp` datetime DEFAULT NULL,
  `update_timestamp` datetime DEFAULT NULL,
  `default_tab` varchar(45) DEFAULT 'Cycles',
  `is_notifier` smallint(2) DEFAULT '0',
  `notification_delivery` varchar(10) DEFAULT NULL,
  `notification_real_time` tinyint(1) DEFAULT '0',
  `notification_digest` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user_division
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_division`;

CREATE TABLE `user_division` (
  `__pk_user_division` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `_fk_user` bigint(32) unsigned DEFAULT NULL,
  `_fk_division` varchar(255) DEFAULT NULL,
  `created_timestamp` datetime DEFAULT NULL,
  `update_timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`__pk_user_division`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user_join_division_managed
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_join_division_managed`;

CREATE TABLE `user_join_division_managed` (
  `id` bigint(32) unsigned NOT NULL AUTO_INCREMENT,
  `_fk_division_t` varchar(256) DEFAULT NULL,
  `_fk_user_t` varchar(256) DEFAULT NULL,
  `created_timestamp` datetime DEFAULT NULL,
  `update_timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user_join_factsheet_mode
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_join_factsheet_mode`;

CREATE TABLE `user_join_factsheet_mode` (
  `id` bigint(32) unsigned NOT NULL AUTO_INCREMENT,
  `_fk_factsheet` int(11) DEFAULT NULL,
  `_fk_user_t` int(11) DEFAULT NULL,
  `mode` varchar(255) DEFAULT NULL,
  `created_timestamp` datetime DEFAULT NULL,
  `update_timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user_notification
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_notification`;

CREATE TABLE `user_notification` (
  `__pk_user_notification` bigint(32) unsigned NOT NULL AUTO_INCREMENT,
  `_fk_notification` bigint(32) DEFAULT NULL,
  `_fk_user_recipient` bigint(32) DEFAULT NULL,
  `send_method` varchar(256) DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT NULL,
  `send_response` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`__pk_user_notification`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table xl_cell
# ------------------------------------------------------------

DROP TABLE IF EXISTS `xl_cell`;

CREATE TABLE `xl_cell` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_row` int(11) unsigned DEFAULT NULL,
  `column` varchar(32) DEFAULT NULL,
  `data` text,
  `is_valid` tinyint(4) DEFAULT '0',
  `validation_error` varchar(32) DEFAULT NULL,
  `image_path` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_row` (`id_row`),
  CONSTRAINT `xl_row` FOREIGN KEY (`id_row`) REFERENCES `xl_row` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table xl_document
# ------------------------------------------------------------

DROP TABLE IF EXISTS `xl_document`;

CREATE TABLE `xl_document` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `file_location` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table xl_row
# ------------------------------------------------------------

DROP TABLE IF EXISTS `xl_row`;

CREATE TABLE `xl_row` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_worksheet` int(11) unsigned DEFAULT NULL,
  `num` int(11) DEFAULT NULL,
  `is_valid` tinyint(4) DEFAULT '0',
  `import` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `id_worksheet` (`id_worksheet`),
  CONSTRAINT `xl_worksheet` FOREIGN KEY (`id_worksheet`) REFERENCES `xl_worksheet` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table xl_worksheet
# ------------------------------------------------------------

DROP TABLE IF EXISTS `xl_worksheet`;

CREATE TABLE `xl_worksheet` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_document` int(11) unsigned DEFAULT NULL,
  `code_name` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_document` (`id_document`),
  CONSTRAINT `xl_document` FOREIGN KEY (`id_document`) REFERENCES `xl_document` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
